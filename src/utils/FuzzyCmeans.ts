import { getCostFunction, getDistanceMatrix } from "./CMeans";

type Point = {
    x: number,
    y: number
};

/**
 * Calculates the fuzzy membership matrix given a distance matrix and a fuzzification parameter.
 * 
 * @param distanceMatrix - Matrix of distances between points and centroids.
 * @param fuzzyParameter - Fuzzification parameter.
 * @returns A fuzzy membership matrix.
 */
export const getFuzzyMembershipMatrix = (distanceMatrix: number[][], fuzzyParameter: number): number[][] => {
    if (distanceMatrix.length === 0) {
        return [];
    }

    const membershipMatrix: number[][] = [];

    for (let i = 0; i < distanceMatrix.length; i++) {
        const membershipRow: number[] = [];
        for (let j = 0; j < distanceMatrix[0].length; j++) {
            let clusterSum = 0;
            for (let k = 0; k < distanceMatrix.length; k++) {
                if (distanceMatrix[k][j] !== 0) {
                    clusterSum += Math.pow((distanceMatrix[i][j] / distanceMatrix[k][j]), 2 / (fuzzyParameter - 1));
                }
            }
            const membershipValue = clusterSum !== 0 ? 1 / clusterSum : 1;
            membershipRow.push(membershipValue);
        }
        membershipMatrix.push(membershipRow);
    }
    return membershipMatrix;
}

/**
 * Calculates new centroids based on the fuzzy membership matrix.
 * 
 * @param points - Array of points.
 * @param membershipMatrix - Fuzzy membership matrix.
 * @param fuzzyParameter - Fuzzification parameter.
 * @returns A new array of centroids.
 */
export const getNewFuzzyCentroids = (points: Point[], membershipMatrix: number[][], fuzzyParameter: number): Point[] => {
    if (membershipMatrix.length === 0 || points.length === 0) {
        return [];
    }

    const newCentroids: Point[] = [];
    for (let i = 0; i < membershipMatrix.length; i++) {
        let membershipx = 0;
        let membershipy = 0;
        let membership = 0;
        for (let j = 0; j < membershipMatrix[0].length; j++) {
            const squareMembership = Math.pow(membershipMatrix[i][j], fuzzyParameter);
            membership += squareMembership;
            membershipx += squareMembership * points[j].x;
            membershipy += squareMembership * points[j].y;
        }
        const x = membershipx / membership;
        const y = membershipy / membership;

        newCentroids.push({ x, y });
    }
    return newCentroids;
}

/**
 * Calculates the cost values for each centroid based on the fuzzy membership and distance matrices.
 * 
 * @param distanceMatrix - Matrix of distances between points and centroids.
 * @param membershipMatrix - Fuzzy membership matrix.
 * @param fuzzyParameter - Fuzzification parameter.
 * @returns An array of cost values for each centroid.
 */
export const getFuzzyCostValues = (distanceMatrix: number[][], membershipMatrix: number[][], fuzzyParameter: number): number[] => {
    if (distanceMatrix.length === 0 || membershipMatrix.length === 0) {
        return [];
    }
    const costValues: number[] = [];
    for (let i = 0; i < distanceMatrix.length; i++) {
        let costValue = 0;
        for (let j = 0; j < distanceMatrix[0].length; j++) {
            costValue += Math.pow(membershipMatrix[i][j], fuzzyParameter) * Math.pow(distanceMatrix[i][j], 2);
        }
        costValues.push(costValue);
    }
    return costValues;
}

/**
 * Executes one iteration of the fuzzy C-means clustering algorithm.
 * 
 * @param points - Array of points.
 * @param centroids - Array of centroids.
 * @returns An object containing the distance matrix, fuzzy membership matrix, new centroids, cost values, and total cost function.
 */
export const fuzzyCMeans = (points: Point[], centroids: Point[]) => {
    const distanceMatrix = getDistanceMatrix(points, centroids);
    const membershipMatrix = getFuzzyMembershipMatrix(distanceMatrix, 2);
    const newCentroids = getNewFuzzyCentroids(points, membershipMatrix, 2);
    const costValues = getFuzzyCostValues(distanceMatrix, membershipMatrix, 2);
    const costFunction = getCostFunction(costValues);

    return {
        distanceMatrix,
        membershipMatrix,
        newCentroids,
        costValues,
        costFunction,
    }
}
    