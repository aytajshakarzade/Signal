/** Parse the duration metadata emitted by FFmpeg (`Duration: HH:MM:SS.xx`). */
export function parseFfmpegDuration(output) {
  const match = String(output || '').match(/Duration:\s*(\d+):(\d{2}):(\d{2}(?:\.\d+)?)/i);
  if (!match) return 0;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3]);
  if (![hours, minutes, seconds].every(Number.isFinite) || minutes > 59 || seconds >= 60 || seconds < 0) return 0;
  return (hours * 3600) + (minutes * 60) + seconds;
}
