import { existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  ['nodemailer', join(root, 'node_modules', 'nodemailer', 'package.json')],
  ['ffmpeg-static', join(root, 'node_modules', 'ffmpeg-static', 'package.json')]
];
const missing = required.filter(([, path]) => !existsSync(path)).map(([name]) => name);
if (!missing.length) {
  console.log('Signal Studio: əsas paketlər hazırdır.');
  process.exit(0);
}
console.log(`Signal Studio: çatışmayan paketlər (${missing.join(', ')}). npm install başladılır...`);
const isWindows = process.platform === 'win32';
const result = spawnSync(isWindows ? 'npm.cmd' : 'npm', ['install', '--no-audit', '--no-fund'], {
  cwd: root,
  stdio: 'inherit',
  shell: isWindows
});
if (result.error || result.status !== 0) {
  console.error('Paketləri quraşdırmaq mümkün olmadı. İnterneti yoxla və layihə qovluğunda npm install əmrini icra et.');
  process.exit(result.status || 1);
}
const stillMissing = required.filter(([, path]) => !existsSync(path)).map(([name]) => name);
if (stillMissing.length) {
  console.error(`Quraşdırmadan sonra paket tapılmadı: ${stillMissing.join(', ')}`);
  process.exit(1);
}
console.log('Signal Studio: paketlər quraşdırıldı.');
