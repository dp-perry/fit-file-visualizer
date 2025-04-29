import {Card} from "../Panels/Card.tsx";
import {LineChart} from "../Charts/LineChart.tsx";
import {DataSetProps, YAxisConfig} from "../../types/chart.ts";

export const PaceLineChart = (
  {pace, heartRate, labels, conversion, speedUnit}: {pace: number[], heartRate?: number[], labels: string[], conversion: number, speedUnit: string},
) => {
  // Create data sets
  const paceDataset: DataSetProps[] = [
    {
      label: `Speed (${speedUnit})`,
      data: pace.map(p => p * conversion), // Convert from m/s to {speedUnit}
      borderColor: 'rgba(99,190,255,1)',
      backgroundColor: 'rgba(99,190,255,0.3)',
      yAxisID: 'y1'
    },
  ];
  const yAxes: YAxisConfig[] = [{
    id: 'y1',
    position: 'left',
    title: `Speed (${speedUnit})`,
    stepSize: 1,
    callback: (value) => `${value}`,
    min: 0,
  }]
  if (heartRate) {
    paceDataset.push(
      {
        label: 'Heart Rate (bpm)',
        data: heartRate,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.3)',
        yAxisID: 'y2'
      }
    )
    yAxes.push(
      {
        id: 'y2',
        position: 'right',
        title: 'Heart Rate (bpm)',
        stepSize: 10,
        callback: (value) => `${value} bpm`,
        gridOnChart: false,
        autoMinFromDataset: true
      }
    )
  }
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Pace</h2>
      <div className=''>
        <LineChart
          title={'Pace'}
          labels={labels}
          datasets={paceDataset}
          yAxes={yAxes}
        />
      </div>
    </Card>
  );
};