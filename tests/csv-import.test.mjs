import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/assets/app.js', import.meta.url), 'utf8');

function extractFunction(source, declaration) {
  const start = source.indexOf(declaration);
  assert.notEqual(start, -1, `${declaration} should exist`);
  const braceStart = source.indexOf('{', start);
  let depth = 0, quote = null, escaped = false;
  for (let i = braceStart; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`Could not extract ${declaration}`);
}

const parseCsv = vm.runInNewContext(`(${extractFunction(source, 'function parseCsv(text) {')})`);

test('CSV import accepts the provided Date/Platform/Post/Views/Interactions/ER format', () => {
  const input = [
    'Date,Platform,Post,Views,Interactions,ER',
    '2026-10-22,Instagram,"El futbolista Leo Messi, Premio Princesa de Asturias de los Deportes 2026, ya está en Asturias", "32,239,600", "2,039,046",6.32%',
    '2026-10-21,Instagram,"Le pedí a ChatGPT que me enseñara una apertura de ajedrez", "39,441,439", "2,272,592",5.76%'
  ].join('\n');
  const rows = parseCsv(input);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].publishedAt.slice(0, 10), '2026-10-22');
  assert.equal(rows[0].title.startsWith('El futbolista Leo Messi'), true);
  assert.equal(rows[0].views, 32239600);
  assert.equal(rows[0].interactions, 2039046);
  assert.equal(rows[0].sourceEngagementRate, 6.32);
  assert.equal(rows[1].views, 39441439);
  assert.equal(rows[1].interactions, 2272592);
});

test('CSV import retains compatibility with likes/comments/shares format', () => {
  const rows = parseCsv('date,platform,title,views,likes,comments,shares,saves\n2026-10-22,Instagram,Sample post,10000,500,20,10,4');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].likes, 500);
  assert.equal(rows[0].comments, 20);
  assert.equal(rows[0].shares, 10);
  assert.equal(rows[0].interactions, undefined);
});
