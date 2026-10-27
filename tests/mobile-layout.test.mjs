import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../public/assets/styles.css', import.meta.url), 'utf8');

test('hidden dashboard stays hidden on narrow screens until authentication succeeds', () => {
  assert.match(html, /class="workspace-view hidden" id="workspace-view"/);
  assert.match(css, /#workspace-view\.hidden[\s\S]{0,120}display:\s*none\s*!important/);
  assert.match(css, /\.workspace-view\.hidden\s*\{\s*display:\s*none\s*!important/s);
});

test('mobile navigation is collapsed until the hamburger opens it', () => {
  assert.match(html, /class="icon-button mobile-nav-toggle" id="mobile-nav-toggle"/);
  assert.match(css, /\.site-header \.main-nav\s*\{[\s\S]{0,500}display:\s*none\s*!important/s);
  assert.match(css, /\.site-header\.mobile-nav-open \.main-nav\s*\{\s*display:\s*flex\s*!important/s);
  assert.match(html, /class="language-switch mobile-language-switch"[\s\S]*data-language="az"[\s\S]*data-language="en"[\s\S]*data-language="ru"/i);
});

test('mobile layouts constrain horizontal overflow and keep touch controls usable', () => {
  assert.match(css, /html\{width:100%;max-width:100%;overflow-x:clip/s);
  assert.match(css, /button,a,input,select,textarea\{touch-action:manipulation\}/);
  assert.match(css, /\.site-header \{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+40px/s);
});
