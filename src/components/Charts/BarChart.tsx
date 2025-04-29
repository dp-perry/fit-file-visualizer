'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

type BarChartProps = {
  title: string;
  labels: string[];
  datasets: DataSetProps[];
}

export const BarChart = (
  {title, labels, datasets}: BarChartProps
) => {
  options.plugins.title.text = title;
  const data = {
    labels: labels,
    datasets: datasets,
  }
  return (
    <Bar options={options} data={data} />
  );
};