import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFfmpegDuration } from '../src/media-utils.mjs';

test('FFmpeg duration parser handles metadata emitted on stderr', () => {
  assert.equal(parseFfmpegDuration('Input #0, mov,mp4,m4a, Duration: 00:01:23.50, start: 0.000000, bitrate: 3 kb/s'), 83.5);
});

test('FFmpeg duration parser supports videos longer than one hour', () => {
  assert.equal(parseFfmpegDuration('Duration: 02:03:04.25'), 7384.25);
});

test('FFmpeg duration parser safely handles missing or invalid metadata', () => {
  assert.equal(parseFfmpegDuration('Duration: N/A'), 0);
  assert.equal(parseFfmpegDuration('no duration found'), 0);
  assert.equal(parseFfmpegDuration('Duration: 00:61:01.00'), 0);
});
