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
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {DataSetProps, YAxisConfig} from "../../types/chart.ts"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

type LineChartProps = {
  title: string;
  labels: string[];
  datasets: DataSetProps[];
  yAxes: YAxisConfig[];
  controlledMinX?: number;
  controlledMaxX?: number;
  onZoomPan?: (minX: number, maxX: number) => void;
  height?: number;
}

export const LineChart = (
  {title, labels, datasets, yAxes, controlledMinX, controlledMaxX, onZoomPan, height}: LineChartProps
) => {
  const yScales = yAxes.reduce((acc, axis) => {
    let calculatedMin = axis.min;
    let calculatedMax = axis.max;

    const matchingDatasets = datasets.find(ds => ds.yAxisID === axis.id);
    if (axis.autoMinFromDataset && datasets.length && matchingDatasets) {
      const lowest = Math.min(...matchingDatasets.data);
      calculatedMin = Math.floor(lowest / 10) * 10 - (axis.stepSize * 2); // subtract stepsize as a buffer
      const highest = Math.max(...matchingDatasets.data);
      calculatedMax = Math.ceil(highest / 10) * 10 + (axis.stepSize * 2);
      if (calculatedMin < 0) calculatedMin = 0; // Never go below 0
    }

    acc[axis.id] = {
      type: 'linear' as const,
      display: true,
      position: axis.position,
      title: {
        display: true,
        text: axis.title,
      },
      ticks: {
        stepSize: axis.stepSize,
        callback: axis.callback,
      },
      grid: {
        drawOnChartArea: axis.gridOnChart ?? true,
        color: 'rgba(200,200,200,0.3)',
      },
      min: calculatedMin,
      max: calculatedMax,
    };
    return acc;
  }, {} as any);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x', // Allow horizontal panning
          // modifierKey: 'ctrl',
          onPanComplete: ({ chart }) => {
            const xAxis = chart.scales['x'];
            onZoomPan?.(xAxis.min as number, xAxis.max as number);
          },
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x', // Only zoom horizontally
          onZoomComplete: ({ chart }) => {
            const xAxis = chart.scales['x'];
            onZoomPan?.(xAxis.min as number, xAxis.max as number);
          },
        },
        limits: {
          x: { min: 'original', max: 'original' }, // optional to prevent zooming too far
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        min: controlledMinX,
        max: controlledMaxX,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
        },
      },
      ...yScales
    },
  }

  const data = {
    labels: labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      borderColor: dataset.borderColor ?? dataset.backgroundColor ?? 'rgba(99,190,255,1)',
      backgroundColor: dataset.backgroundColor ?? 'rgba(99,190,255,0.3)',
      fill: dataset.fill ?? true,
      tension: dataset.tension ?? 0.3,
    })),
  }

  return (
    <div className="w-full" style={{ height: height ?? 300 }}>
      <Line options={options} data={data} />
    </div>
  );
};