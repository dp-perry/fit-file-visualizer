import {LapMesg} from "../../types/fitfile.ts"

export const LapTable = (
  {laps, conversion, speedUnit}: {laps: LapMesg[], conversion: number, speedUnit: string}
) => {
  return (
    <div>
      <div className='grid grid-cols-5 font-semibold bg-blue-100 p-2'>
        <div>Lap</div>
        <div>Minute / Mile</div>
        <div>Avg Speed</div>
        <div>Elev. Gain</div>
        <div>Avg. Cadence</div>
      </div>
      {
        laps.map((lap, index) => (
          <div key={index} className='grid grid-cols-5 p-2 odd:bg-gray-100'>
            <div>{lap.totalDistance > 1600 ? `Mile ${index + 1}` : lap.totalDistance + ' meters'}</div>
            <div>{(lap.totalTimerTime / 60).toFixed(2)}</div>
            <div>{((lap.totalDistance / lap.totalTimerTime) * conversion).toFixed(2)} {speedUnit}</div>
            <div>{lap.totalAscent} m</div>
            <div>{lap.avgRunningCadence} strides/min</div>
          </div>
        ))
      }
    </div>
  );
};