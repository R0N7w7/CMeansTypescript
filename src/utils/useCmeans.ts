import { notification } from "antd";
import { useMemo, useState } from "react";
import { CMeans } from "./CMeans";
import { fuzzyCMeans } from './FuzzyCmeans';

type Point = {
    x: number,
    y: number
};

type AlgorithmType = 'fuzzy' | 'crisp';

const useCMeans = (initialAlgorithm: AlgorithmType) => {
    const [centroids, setCentroids] = useState<Point[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(initialAlgorithm);

    const cMeansFunction = useMemo(() => {
        return algorithm === 'fuzzy' ? fuzzyCMeans : CMeans;
    }, [algorithm]);

    const {
        distanceMatrix,
        membershipMatrix,
        newCentroids,
        costValues,
        costFunction,
    } = useMemo(() => cMeansFunction(points, centroids), [cMeansFunction, points, centroids]);

    const addPoint = (point: Point) => {
        setPoints(prevPoints => [...prevPoints, point]);
    };

    const addCentroid = (centroid: Point) => {
        setCentroids(prevCentroids => [...prevCentroids, centroid]);
    };

    const onIterate = () => {
        if (newCentroids.length > 0 && costFunction > 0.0001) {
            setCentroids(newCentroids);
        } else {
            notification.error({
                message: 'Error',
                description: 'There are not enough points or centroids to start an iteration of the algorithm!',
                duration: 3,
                placement: 'bottomLeft'
            });
        }
    };

    const onReset = () => {
        setCentroids([]);
        setPoints([]);
    };

    return {
        algorithm, setAlgorithm,
        centroids, setCentroids,
        points, setPoints,
        distanceMatrix,
        membershipMatrix,
        newCentroids,
        costValues,
        costFunction,
        addPoint,
        addCentroid,
        onIterate,
        onReset,
    };
}

export { useCMeans };
