import {useEffect, useState} from "react";
import { DateTime } from "luxon";

// Types & Libs
import {downsampleByTime} from "../utils/downsampleByTime.ts";
import {getSuggestedInterval} from "../utils/data_utils.ts";

// Components
import {Card} from "./Panels/Card.tsx";
import {SessionData} from "./Dashboard/SessionData.tsx";
import {HeartRateBarChart} from "./FitCharts/HeartRateBarChart.tsx";
import {CadenceLineChart} from "./FitCharts/CadenceLineChart.tsx";
import {PaceLineChart} from "./FitCharts/PaceLineChart.tsx";
import {ElevationLineChart} from "./FitCharts/ElevationLineChart.tsx";
import {LapTable} from "./Dashboard/LapTable.tsx";
import {FitMessages} from "../types/fitfile.ts";

type DashboardProps = {
  fitData: FitMessages;
}

const Dashboard = (
  { fitData } : DashboardProps
) => {
  const [paceIntervalSeconds, setPaceIntervalSeconds] = useState<number>(60);

  const conversion = 3.6; // 2.237 for imperial
  const unit = 'km/h'; // mph
  const session = fitData.sessionMesgs[0];
  const records = fitData.recordMesgs;
  const laps = fitData.lapMesgs;
  const timeInZonesSession = fitData.timeInZoneMesgs.find(mesg => mesg.referenceMesg == 'session');



  useEffect(() => {
    if (!records.length) return;

    // Get basic session data so we can set out paceInterval
    const start = DateTime.fromJSDate(records[0].timestamp);
    const end = DateTime.fromJSDate(records[records.length - 1].timestamp);
    const totalDuration = end.diff(start, 'seconds').seconds;

    const bestInterval = getSuggestedInterval(totalDuration);
    setPaceIntervalSeconds(bestInterval);
  }, [records]);

  // Downsample record messages so they can be used more meaningfully in the charts
  const {labels, pace, heartRate, elevation, cadence } = downsampleByTime(records, paceIntervalSeconds)
  // Downsample by # of datapoints is also possible but probably less useful
  // const {labels, pace, heartRate, elevation } = downsampleRecords(records)

  return (
    <div className="space-y-8">
      <div className="space-y-8 lg:grid lg:grid-cols-2 gap-8">

        <Card>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold flex flex-col md:gap-2 md:flex-row">
              <span>Sport profile:</span>
              <span>{session.sportProfileName}</span>
            </h2>
            <div className="flex flex-col items-end">
              <label htmlFor="intervalSelect" className="text-sm font-medium text-gray-600 mb-1">
                Chart Interval
              </label>
              <select
                id="intervalSelect"
                className="rounded border border-stone-300 text-sm p-2"
                defaultValue={paceIntervalSeconds}
                onChange={(e) => setPaceIntervalSeconds(Number(e.target.value))}
              >
                <option value="10">Every 10 seconds</option>
                <option value="30">Every 30 seconds</option>
                <option value="60">Every 1 minute</option>
                <option value="300">Every 5 minutes</option>
              </select>
              <span className="text-xs text-gray-400 mt-1">Controls chart smoothing</span>
            </div>
          </div>

          <SessionData session={session} />
        </Card>

        <Card>
          <h2 className='text-2xl font-bold mb-4'>Laps</h2>
          <LapTable laps={laps} conversion={conversion} speedUnit={unit} />
        </Card>

        {
          timeInZonesSession &&
          <HeartRateBarChart hrZoneData={timeInZonesSession} />
        }

        {
          cadence &&
          <CadenceLineChart cadence={cadence} labels={labels} />
        }
      </div>

      <PaceLineChart
        pace={pace}
        heartRate={heartRate}
        labels={labels}
        conversion={conversion}
        speedUnit={unit}
      />

      <ElevationLineChart
        elevation={elevation}
        cadence={cadence}
        labels={labels}
      />

    </div>
  );
};

export default Dashboard;