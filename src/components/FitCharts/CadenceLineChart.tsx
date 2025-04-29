import {Card} from "../Panels/Card.tsx";
import {LineChart} from "../Charts/LineChart.tsx";
import {DataSetProps, YAxisConfig} from "../../types/chart.ts";

export const CadenceLineChart = (
  {cadence, labels}: {cadence: number[], labels: string[]}
) => {
  const cadenceDataset: DataSetProps[] = [{
    label: 'Cadence',
    data: cadence,
    borderColor: 'rgba(99,190,255,1)',
    backgroundColor: 'rgba(99,190,255,0.3)',
    yAxisID: 'y1'
  }]
  const yAxes: YAxisConfig[] = [{
    id: 'y1',
    position: 'left',
    title: 'Cadence',
    stepSize: 1,
    callback: (value) => `${value}`,
  }]
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Cadence</h2>
      <LineChart
        title={''}
        labels={labels}
        datasets={cadenceDataset}
        yAxes={yAxes}
      />
    </Card>
  );
};