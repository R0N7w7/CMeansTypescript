import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
Chart.register(...registerables);

const centroidHues = [8, 205, 138, 44, 280, 328, 184, 112];

const getCentroidHue = (index: number) => centroidHues[index % centroidHues.length];

const getPointColor = (pointIndex: number, membershipMatrix: number[][]) => {
  if (membershipMatrix.length === 0) {
    return {
      background: 'rgba(107, 114, 128, 0.55)',
      border: 'rgba(75, 85, 99, 0.9)',
    };
  }

  let dominantCluster = 0;
  let highestMembership = membershipMatrix[0]?.[pointIndex] ?? 0;

  for (let clusterIndex = 1; clusterIndex < membershipMatrix.length; clusterIndex++) {
    const currentMembership = membershipMatrix[clusterIndex]?.[pointIndex] ?? 0;
    if (currentMembership > highestMembership) {
      highestMembership = currentMembership;
      dominantCluster = clusterIndex;
    }
  }

  const hue = getCentroidHue(dominantCluster);
  const normalizedMembership = Math.max(0, Math.min(highestMembership, 1));
  const saturation = 55 + normalizedMembership * 28;
  const lightness = 82 - normalizedMembership * 30;
  const borderLightness = Math.max(28, lightness - 18);
  const alpha = 0.45 + normalizedMembership * 0.45;

  return {
    background: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
    border: `hsl(${hue}, ${Math.min(100, saturation + 6)}%, ${borderLightness}%)`,
  };
};

type Props = {
  points: Point[];
  centroids: Point[];
  membershipMatrix: number[][];
};

const DataChart = ({ points, centroids, membershipMatrix }: Props) => {
  const pointColors = points.map((_, pointIndex) => getPointColor(pointIndex, membershipMatrix));
  const centroidColors = centroids.map((_, centroidIndex) => {
    const hue = getCentroidHue(centroidIndex);

    return {
      background: `hsla(${hue}, 75%, 48%, 0.9)`,
      area: `hsla(${hue}, 72%, 52%, 0.22)`,
      border: `hsl(${hue}, 78%, 30%)`,
    };
  });

  return (
    <Scatter
      className='max-h-96'
      data={{
        datasets: [
          {
            label: 'Points',
            data: points,
            backgroundColor: pointColors.map(({ background }) => background),
            borderColor: pointColors.map(({ border }) => border),
            borderWidth: 1,
            pointRadius: 4,
          },
          {
            label: 'Centroids',
            data: centroids,
            backgroundColor: centroidColors.map(({ background }) => background),
            borderColor: centroidColors.map(({ border }) => border),
            borderWidth: 2,
            pointRadius: 5,
          },
          {
            label: 'Centroids Area',
            data: centroids,
            backgroundColor: centroidColors.map(({ area }) => area),
            borderColor: centroidColors.map(({ border }) => border),
            borderWidth: 1,
            pointRadius: 20,
          },
        ]
      }}
      options={{
        scales: {
          x: {
            position: 'bottom',
          },
          y: {
            position: 'left',
          }
        }
      }}
    />
  );
};

export default DataChart;
