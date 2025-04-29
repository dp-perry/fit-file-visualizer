'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type DataSetProps = {
  label: string,
  data: number[],
  backgroundColor?: string | string[]
}

type BarChartProps = {
  title: string;
  labels: string[];
  datasets: DataSetProps[];
  totalMinutes: number
}

export const BarChart = (
  {title, labels, datasets, totalMinutes}: BarChartProps
) => {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const value = context.raw as number;
            if (!totalMinutes || totalMinutes == 0) return `${value} min`;
            const percentage = ((value / totalMinutes) * 100).toFixed(1);
            return `${value} min (${percentage}%)`;
          }
        },
      },
    },
  };

  const data: ChartData<'bar'> = {
    labels: labels,
    datasets: datasets,
  }
  return (
    <Bar options={options} data={data} />
  );
};