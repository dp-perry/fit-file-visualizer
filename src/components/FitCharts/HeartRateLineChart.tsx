import {Card} from "../Panels/Card.tsx";
import {LineChart} from "../Charts/LineChart.tsx";
import {DataSetProps, YAxisConfig} from "../../types/chart.ts";

export const HeartRateLineChart = (
  {heartRate, labels}: { heartRate: number[], labels: string[] },
) => {
  // Maybe make a chart available that displays heartRate only?
  const heartRateDataset: DataSetProps[] = [{
    label: 'HeartRate',
    data: heartRate,
    borderColor: 'rgba(255,99,132,1)',
    backgroundColor: 'rgba(255,99,132,0.3)',
  }]
  const yAxes: YAxisConfig[] = [{
    id: 'y1',
    position: 'left',
    title: 'Heart rate (bpm)',
    stepSize: 10,
    callback: (value) => `${value} bpm`,
  },]
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Heart rate</h2>
      <LineChart
        title={''}
        labels={labels}
        datasets={heartRateDataset}
        yAxes={yAxes}
      />
    </Card>
  );
};