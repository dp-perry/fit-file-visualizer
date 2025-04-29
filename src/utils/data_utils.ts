export function getSuggestedInterval(totalSeconds: number): number {
  if (totalSeconds <= 15 * 60) return 10; // ≤ 15 min → every 10 seconds
  if (totalSeconds <= 30 * 60) return 30; // ≤ 30 min → every 30 seconds
  if (totalSeconds <= 60 * 60) return 60; // ≤ 1 hour → every 1 min
  if (totalSeconds <= 2 * 60 * 60) return 120; // ≤ 2 hours → every 2 min
  if (totalSeconds <= 4 * 60 * 60) return 300; // ≤ 4 hours → every 5 min
  return 600; // 10 min for anything longer
}