import {SessionLine} from "./SessionLine.tsx";
import {DateTime} from "luxon";
import {formatTime} from "../../utils/time.ts";
import {SessionMesg} from "../../types/fitfile.ts"

export const SessionData = (
  {session}: {session: SessionMesg}
) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='flex flex-col gap-4'>
          <SessionLine title={'Start Time'} value={DateTime.fromJSDate(session.startTime).toLocaleString(DateTime.DATETIME_SHORT)} />
          <SessionLine title={'Moving Time'} value={formatTime(session.totalTimerTime)} />
          <SessionLine title={'Session duration'} value={formatTime(session.totalElapsedTime)} />
        </div>
        <div className='flex flex-col gap-4'>
          <SessionLine title={'Avg HR'} value={session.avgHeartRate + ' bpm'} />
          <SessionLine title={'Max HR'} value={session.maxHeartRate + ' bpm'} />
          <SessionLine title={'Calories'} value={session.totalCalories + 'cal'} />
        </div>
        <div className='flex flex-col gap-4'>
          <SessionLine title={'Distance'} value={(session.totalDistance / 1000).toFixed(2) + 'km'} />
          <SessionLine title={'Elevation Gain'} value={session.totalAscent + 'm'} />
          <SessionLine title={'Moving Speed'} value={(session.enhancedAvgSpeed * 3.6).toFixed(2) + 'km/h'} />
          <SessionLine title={'Session Speed'} value={((session.totalDistance / session.totalElapsedTime) * 3.6).toFixed(2) + 'km/h'} />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <div className='col-span-3'>
          <b>Stryd data</b>
        </div>
        <div>
          {
            session.totalStrides &&
            <SessionLine title={'Total strides'} value={session.totalStrides + ' strides'} />
          }
        </div>
        <div>
          {
            session.avgRunningCadence &&
            <SessionLine title={'Average running cadence'} value={session.avgRunningCadence + ' strides'} />
          }
        </div>

      </div>
    </div>
  );
};