import {Card} from "../Panels/Card.tsx";
import {LineChart} from "../Charts/LineChart.tsx";
import {DataSetProps, YAxisConfig} from "../../types/chart.ts";

export const ElevationLineChart = (
  {elevation, cadence, labels}: { elevation: number[], cadence?: number[], labels: string[] },
) => {
  const elevationDataset: DataSetProps[] = [
    {
      label: 'Elevation (m)',
      data: elevation.map(el => Math.floor(el)),
      borderColor: '#ffc658',
      backgroundColor: 'rgba(255,198,88,0.3)',
      tension: 0.3,
      fill: true,
      yAxisID: 'y1'
    },
  ];
  const yAxes: YAxisConfig[] = [{
    id: 'y1',
    position: 'left',
    title: 'Elevation (meters)',
    stepSize: 10,
    callback: (value) => `${value}`,
    autoMinFromDataset: true
  }]
  if (cadence) {
    elevationDataset.push({
      label: 'Cadence',
      data: cadence,
      borderColor: 'rgba(99,190,255,1)',
      backgroundColor: 'rgba(99,190,255,0.3)',
      yAxisID: 'y2'
    })
    yAxes.push({
      id: 'y2',
      position: 'right',
      title: 'Cadence',
      stepSize: 1,
      callback: (value) => `${value}`,
      gridOnChart: false,
    })
  }
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Elevation</h2>
      <div className=''>
        <LineChart
          title={'Elevation'}
          labels={labels}
          datasets={elevationDataset}
          yAxes={yAxes}
        />
      </div>
    </Card>
  );
};