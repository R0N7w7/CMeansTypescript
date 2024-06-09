/**
 * Calculates the distance matrix between each point and each centroid.
 * 
 * @param points - Array of points.
 * @param centroids - Array of centroids.
 * @returns A matrix of distances where each element [i][j] is the distance between the i-th centroid and the j-th point.
 */
export const getDistanceMatrix = (points: Point[], centroids: Point[]) => {
    if (points.length === 0 || centroids.length === 0) {
        return [];
    }

    const distanceMatrix = [];
    for (let i = 0; i < centroids.length; i++) {
        const distancesRow = [];
        for (let j = 0; j < points.length; j++) {
            const newDistance = euclidianDistance(centroids[i], points[j]);
            distancesRow.push(newDistance);
        }
        distanceMatrix.push(distancesRow);
    }
    return distanceMatrix;
}

/**
 * Calculates the Euclidean distance between two points.
 * 
 * @param pointA - First point.
 * @param pointB - Second point.
 * @returns The Euclidean distance between the two points.
 */
export const euclidianDistance = (pointA: Point, pointB: Point) => {
    const distance = Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2));
    return distance;
}

/**
 * Generates the membership matrix from the distance matrix.
 * 
 * @param distanceMatrix - Matrix of distances between points and centroids.
 * @returns A membership matrix where each element [i][j] is 1 if the j-th point belongs to the i-th centroid, otherwise 0.
 */
export const getMembershipMatrix = (distanceMatrix: number[][]) => {
    if (distanceMatrix.length === 0) {
        return [];
    }

    const membershipMatrix = [...zeroMatrix(distanceMatrix)];

    for (let j = 0; j < distanceMatrix[0].length; j++) {
        let min = distanceMatrix[0][j];
        let minPosition = 0;

        for (let i = 0; i < distanceMatrix.length; i++) {
            if (distanceMatrix[i][j] < min) {
                min = distanceMatrix[i][j];
                minPosition = i;
            }
        }
        membershipMatrix[minPosition][j] = 1;
    }
    return membershipMatrix;
}

/**
 * Creates a zero matrix with the same dimensions as the input matrix.
 * 
 * @param matrix - Input matrix.
 * @returns A matrix of the same dimensions with all elements set to 0.
 */
export function zeroMatrix(matrix: number[][]) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const newMatrix = [];
    for (let i = 0; i < rows; i++) {
        const newMatrixRow = []
        for (let j = 0; j < columns; j++) {
            newMatrixRow.push(0);
        }
        newMatrix.push(newMatrixRow);
    }
    return newMatrix;
}

/**
 * Calculates new centroids based on the membership matrix.
 * 
 * @param points - Array of points.
 * @param membershipMatrix - Membership matrix.
 * @returns A new array of centroids calculated as the mean of all points belonging to each centroid.
 */
export const getNewCentroids = (points: Point[], membershipMatrix: number[][]) => {
    const newCentroids = [];
    for (let i = 0; i < membershipMatrix.length; i++) {
        let sumaX = 0;
        let sumaY = 0;
        let cardinalidad = 0;

        for (let j = 0; j < membershipMatrix[0].length; j++) {
            if (membershipMatrix[i][j] == 1) {
                sumaX += points[j].x;
                sumaY += points[j].y;
                cardinalidad++;
            }
        }
        const x = sumaX / cardinalidad;
        const y = sumaY / cardinalidad;

        if (cardinalidad !== 0) {
            newCentroids.push({ x, y });
        }
    }
    return newCentroids;
}

/**
 * Calculates the cost values for each centroid based on the membership and distance matrices.
 * 
 * @param membershipMatrix - Membership matrix.
 * @param distanceMatrix - Distance matrix.
 * @returns An array of cost values for each centroid.
 */
export const getCostValues = (membershipMatrix: number[][], distanceMatrix: number[][]) => {
    if (membershipMatrix.length == 0 || distanceMatrix.length == 0) {
        return [];
    }
    const costValues = [];

    for (let i = 0; i < membershipMatrix.length; i++) {
        let costValue = 0;
        for (let j = 0; j < membershipMatrix[0].length; j++) {
            if (membershipMatrix[i][j] == 1) {
                costValue += distanceMatrix[i][j];
            }
        }
        costValues.push(costValue);
    }
    return costValues;
}

/**
 * Calculates the total cost from an array of individual cost values.
 * 
 * @param costValues - Array of individual cost values.
 * @returns The total cost as the sum of all individual costs.
 */
export const getCostFunction = (costValues: number[]) => costValues.length != 0 ? costValues.reduce((sum, costValue) => (sum + costValue)) : 0;

/**
 * Executes one iteration of the C-means clustering algorithm.
 * 
 * @param points - Array of points.
 * @param centroids - Array of centroids.
 * @returns An object containing the distance matrix, membership matrix, new centroids, cost values, and total cost function.
 */
export const CMeans = (points: Point[], centroids: Point[]) => {
    const distanceMatrix = getDistanceMatrix(points, centroids);
    const membershipMatrix = getMembershipMatrix(distanceMatrix);
    const newCentroids = getNewCentroids(points, membershipMatrix);
    const costValues = getCostValues(membershipMatrix, distanceMatrix);
    const costFunction = getCostFunction(costValues);

    return {
        distanceMatrix,
        membershipMatrix,
        newCentroids,
        costValues,
        costFunction,
    }
}

/**
 * Generates an array of random points.
 * 
 * @param n - Number of points to generate.
 * @returns An array of n points with random coordinates.
 */
export function generateRandomPoints(n: number) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const point = {
            x: Math.floor(Math.random() * 201) - 100,
            y: Math.floor(Math.random() * 201) - 100,
        };
        points.push(point);
    }
    return points as Point[];
}
