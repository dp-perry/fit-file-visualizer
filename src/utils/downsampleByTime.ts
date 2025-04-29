import { DateTime } from 'luxon';

import {RecordMesg} from "../types/fitfile.ts"

/**
 * Downsample records by time
 * TODO: Ignore points with no movement before / after activity
 * @param records
 * @param intervalSeconds
 */
export function downsampleByTime(
  records: RecordMesg[],
  intervalSeconds = 60
): { labels: string[]; pace: number[]; heartRate: number[]; elevation: number[], cadence: number[] } {
  if (records.length === 0) {
    return { labels: [], pace: [], heartRate: [], elevation: [], cadence: [] };
  }

  const start = DateTime.fromJSDate(records[0].timestamp);
  // const end = DateTime.fromJSDate(records[records.length - 1].timestamp);
  // const totalDurationSec = end.diff(start, 'seconds').seconds;

  // const bucketDuration = totalDurationSec / targetPoints; // seconds per bucket

  const labels: string[] = [];
  const pace: number[] = [];
  const heartRate: number[] = [];
  const elevation: number[] = [];
  const cadence: number[] = [];

  let bucketStart = start;
  let bucketEnd = start.plus({ seconds: intervalSeconds });

  let bucketRecords: RecordMesg[] = [];

  for (const record of records) {
    const recordTime = DateTime.fromJSDate(record.timestamp);

    if (recordTime <= bucketEnd) {
      bucketRecords.push(record);
    } else {
      if (bucketRecords.length > 0) {
        const avgSpeed =
          bucketRecords.reduce((sum, r) => sum + (r.enhancedSpeed ?? 0), 0) /
          bucketRecords.length;
        const avgHR =
          bucketRecords.reduce((sum, r) => sum + (r.heartRate ?? 0), 0) /
          bucketRecords.length;
        const avgAlt =
          bucketRecords.reduce((sum, r) => sum + (r.enhancedAltitude ?? 0), 0) /
          bucketRecords.length;
        const avgCadence =
          bucketRecords.reduce((sum, r) => sum + (r.cadence ?? 0), 0) /
          bucketRecords.length;

        pace.push(avgSpeed); // Convert speed to min/mile
        heartRate.push(avgHR);
        elevation.push(avgAlt);
        cadence.push(avgCadence);
        labels.push(bucketStart.toLocaleString(DateTime.TIME_SIMPLE));
      }

      // Find the next record not in the current bucket
      // skip intervals with no records
      while (recordTime > bucketEnd) {
        bucketStart = bucketEnd;
        bucketEnd = bucketStart.plus({ seconds: intervalSeconds });
      }
      bucketRecords = [record]; // start new bucket with current record
    }
  }

  // Final bucket
  if (bucketRecords.length > 0) {
    const avgSpeed =
      bucketRecords.reduce((sum, r) => sum + (r.enhancedSpeed ?? 0), 0) /
      bucketRecords.length;
    const avgHR =
      bucketRecords.reduce((sum, r) => sum + (r.heartRate ?? 0), 0) /
      bucketRecords.length;
    const avgAlt =
      bucketRecords.reduce((sum, r) => sum + (r.enhancedAltitude ?? 0), 0) /
      bucketRecords.length;
    const avgCadence =
      bucketRecords.reduce((sum, r) => sum + (r.cadence ?? 0), 0) /
      bucketRecords.length;

    pace.push(avgSpeed);
    heartRate.push(avgHR);
    elevation.push(avgAlt);
    cadence.push(avgCadence);
    labels.push(bucketStart.toLocaleString(DateTime.TIME_SIMPLE));
  }

  return { labels, pace, heartRate, elevation, cadence };
}