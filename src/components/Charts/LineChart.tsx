'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Title',
    },
  },
};

type DataSetProps = {
  label: string,
  data: number[],
  backgroundColor?: string
}

type LineChartProps = {
  title: string;
  labels: string[];
  datasets: DataSetProps[];
}

export const LineChart = (
  {title, labels, datasets}: LineChartProps
) => {
  options.plugins.title.text = title;
  const data = {
    labels: labels,
    datasets: datasets,
  }
  return (
    <Line options={options} data={data} />
  );
};