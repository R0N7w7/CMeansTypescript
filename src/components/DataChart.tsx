import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
Chart.register(...registerables);

type Props = {
  points: Point[],
  centroids: Point[]
}

const DataChart = ({ points, centroids }: Props) => {
  return (
    <Scatter
      className='max-h-96'
      data={{
        datasets: [
          {
            label: 'Points',
            data: points,
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color de los puntos
            borderColor: 'rgba(255, 99, 132, 1)', // Color del borde de los puntos
            borderWidth: 1,
            pointRadius: 3, // Tamaño de los puntos
          },
          {
            label: 'Centroids',
            data: centroids,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color de los puntos del conjunto 2
            borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de los puntos del conjunto 2
            borderWidth: 1,
            pointRadius: 3, // Tamaño de los puntos
          },
          {
            label: 'Centroids Area',
            data: centroids,
            backgroundColor: 'rgba(54, 162, 235, 0.3)', // Color de los puntos del conjunto 2
            borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de los puntos del conjunto 2
            borderWidth: 1,
            pointRadius: 20, // Tamaño de los puntos
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
