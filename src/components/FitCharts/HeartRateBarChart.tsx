import {TimeInZoneMesg} from "../../types/fitfile.ts";

import {Card} from "../Panels/Card.tsx";
import {BarChart} from "../Charts/BarChart.tsx"


export const HeartRateBarChart = (
  {hrZoneData}: {hrZoneData: TimeInZoneMesg}
) => {
  const boundaries = hrZoneData.hrZoneHighBoundary;
  const timeInSeconds = hrZoneData.timeInHrZone

  const zoneColors = [
    '#4FC3F7', // light blue (Zone 1)
    '#81C784', // green (Zone 2)
    '#FFF176', // yellow (Zone 3)
    '#FFB74D', // orange (Zone 4)
    '#E57373', // red (Zone 5)
    '#D32F2F', // dark red (Zone 6)
    '#B71C1C', // Zone 7+
  ];

  const zoneLabels: string[] = [];
  for (let i = 0; i < boundaries.length + 1; i++) {
    const lower = i === 0 ? 0 : boundaries[i - 1] + 1;
    const upper = boundaries[i] ?? 'max';
    zoneLabels.push(`${lower}–${upper} bpm`);
  }

  const timeInMinutes = timeInSeconds.map((sec) => parseFloat((sec / 60).toFixed(1)));
  const totalMinutes = timeInMinutes.reduce((acc, curr) => acc + curr, 0)
  const barChartDatasets = [
    {
      label: 'Minutes',
      data: timeInMinutes,
      backgroundColor: zoneColors.slice(0, timeInMinutes.length),
    },
  ]

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Heart Rate Zones</h2>
      <BarChart
        title={'Time in Heart Rate Zones'}
        labels={zoneLabels}
        datasets={barChartDatasets}
        totalMinutes={totalMinutes}
      />
    </Card>
  );
};