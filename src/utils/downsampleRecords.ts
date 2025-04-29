import { DateTime } from 'luxon';
import {RecordMesg} from "../types/fitfile.ts";

/**
 * Down sample record messages by number of messages
 * Problem: No guarantee that sample rate is consistent over time
 * @param records
 * @param targetPoints
 */
export function downsampleRecords(
  records: RecordMesg[],
  targetPoints = 100
): { labels: string[]; pace: number[]; heartRate: number[]; elevation: number[] } {
  const chunkSize = Math.floor(records.length / targetPoints);
  const labels: string[] = [];
  const pace: number[] = [];
  const heartRate: number[] = [];
  const elevation: number[] = [];

  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    if (chunk.length === 0) continue;

    const avgSpeed =
      chunk.reduce((sum, r) => sum + (r.enhancedSpeed ?? 0), 0) / chunk.length;
    const avgHR =
      chunk.reduce((sum, r) => sum + (r.heartRate ?? 0), 0) / chunk.length;
    const avgAlt =
      chunk.reduce((sum, r) => sum + (r.enhancedAltitude ?? 0), 0) / chunk.length;

    pace.push(26.8224 / avgSpeed); // Convert speed to min/mile
    heartRate.push(avgHR);
    elevation.push(avgAlt);
    labels.push(
      DateTime.fromJSDate(chunk[0].timestamp).toLocaleString(DateTime.TIME_SIMPLE)
    );
  }

  return { labels, pace, heartRate, elevation };
}