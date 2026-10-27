import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../public/assets/app.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../public/assets/styles.css', import.meta.url), 'utf8');
const server = readFileSync(new URL('../src/server.mjs', import.meta.url), 'utf8');
const i18n = readFileSync(new URL('../public/assets/i18n.js', import.meta.url), 'utf8');

test('Free plan opens Video Lab gate and paid content only appears when eligible', () => {
  assert.match(html, /id="video-plan-gate"/);
  assert.match(html, /id="video-lab-content"/);
  assert.match(app, /const videoAllowed = \['go', 'pro'\]\.includes\(plan\)/);
  assert.match(app, /classList\.toggle\('hidden', !videoAllowed\)/);
  assert.match(server, /const user = requirePlan\(req, res, 'go'\); if \(!user\) return;/);
});

test('Team & Business opens a Pro gate instead of silently redirecting to billing', () => {
  assert.match(html, /id="team-plan-gate"/);
  assert.match(html, /id="team-plan-content"/);
  assert.match(app, /const teamAllowed = plan === 'pro'/);
  const showViewFunction = app.slice(app.indexOf('  function showView(name) {'), app.indexOf('\n  const firstTour ='));
  assert.doesNotMatch(showViewFunction, /name === 'team'.*showView\('billing'\)/s);
  assert.match(server, /const user=requirePlan\(req,res,'pro'\);if\(!user\)return;/);
});

test('Video results render in their own Video Lab panel and can be saved', () => {
  assert.match(html, /id="video-analysis-results"/);
  assert.match(html, /id="video-result-title"/);
  assert.match(app, /\$\('#video-result-title'\)\.textContent/);
  assert.match(app, /\$\('#video-analysis-results'\)\.classList\.remove\('hidden'\)/);
  assert.match(app, /\$\('#save-video-analysis-idea'\)\.addEventListener/);
  assert.match(server, /onScreenText: numeric\(ai\.onScreenText\)/);
});

test('selected locale is passed to video/text analysis and assistant prompts', () => {
  assert.match(app, /X-UI-Language':window\.SignalI18n\?\.getLanguage/);
  assert.match(app, /language:window\.SignalI18n\?\.getLanguage/);
  assert.match(server, /Respond entirely in \$\{responseLanguage\}/);
  assert.match(server, /Respond entirely in \$\{chatLanguageName\}/);
  assert.match(i18n, /Komandanı bir məkanda birləşdir\./);
  assert.match(i18n, /Объедини команду в одном рабочем пространстве\./);
});

test('tables have responsive overflow and high-contrast surfaces in both themes', () => {
  assert.match(css, /overflow-x: auto !important; overscroll-behavior-inline/);
  assert.match(css, /:root\[data-theme="dark"\] \.workspace-view \.table-wrap tbody td \{ color: #f0e8f6 !important/);
  assert.match(css, /:root\[data-theme="light"\] \.feature-plan-gate/);
  assert.match(css, /\.workspace-view \.side-link-label \{ display: block; min-width: 0 !important; max-width: 100%; white-space: normal !important; overflow-wrap: anywhere/);
  assert.match(css, /\.workspace-view \.workspace-language-switch \{ display: inline-flex !important/);
});
