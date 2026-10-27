import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { resolve } from 'node:path';

function createI18nHarness() {
  const languageButtons = ['az', 'en', 'ru'].map(language => ({
    dataset: { language }, attrs: {}, classList: { toggle() {} },
    setAttribute(name, value) { this.attrs[name] = value; }, addEventListener() {}
  }));
  const nodes = [
    'Platformanı və Freelancer / mütəxəssis',
    'Kontent yaradıcısı',
    'PULSUZ başla',
    'Qarşılıqlı əlaqə — Qarşılıqlı əlaqə'
  ].map(value => ({ nodeType: 3, nodeValue: value, parentElement: { closest() { return null; } } }));
  const meta = { content: '', nodeType: 1, matches() { return false; }, getAttribute() { return ''; }, setAttribute() {} };
  const storage = new Map();
  const document = {
    body: { nodeType: 1, querySelectorAll() { return []; } }, documentElement: { lang: 'az' }, title: '', nodeType: 9,
    querySelectorAll(selector) { return selector === '[data-language]' ? languageButtons : []; },
    querySelector(selector) { return selector === 'meta[name="description"]' ? meta : null; },
    createTreeWalker() {
      let index = -1;
      return { currentNode: null, nextNode() { index += 1; if (index < nodes.length) { this.currentNode = nodes[index]; return true; } return false; } };
    }
  };
  const observers = [];
  class MockMutationObserver {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {} disconnect() {} takeRecords() { return []; }
  }
  const context = {
    document, Node: { TEXT_NODE: 3, ELEMENT_NODE: 1 }, NodeFilter: { SHOW_TEXT: 4 }, MutationObserver: MockMutationObserver,
    localStorage: { getItem(key) { return storage.get(key) ?? null; }, setItem(key, value) { storage.set(key, value); }, removeItem(key) { storage.delete(key); } },
    window: { dispatchEvent() {} }, CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init?.detail; } },
    console, Map, WeakMap, Set, URL, RegExp, String, Object, Array, Date, JSON
  };
  vm.runInNewContext(readFileSync(resolve('public/assets/i18n.js'), 'utf8'), context);
  return { api: context.window.SignalI18n, nodes, observers };
}

test('AZ/EN/RU switching preserves source text and does not translate substrings inside other words', () => {
  const { api, nodes } = createI18nHarness();
  const azOriginal = nodes.map(node => node.nodeValue);
  assert.deepEqual(azOriginal, ['Platformanı və Freelancer / mütəxəssis', 'Kontent yaradıcısı', 'PULSUZ başla', 'Qarşılıqlı əlaqə — Qarşılıqlı əlaqə']);

  api.setLanguage('en');
  assert.equal(nodes[0].nodeValue, 'the platform and Freelancer / specialist');
  assert.equal(nodes[1].nodeValue, 'Content creator');
  assert.equal(nodes[2].nodeValue, 'Get started free');
  assert.equal(nodes[3].nodeValue, 'Engagement — Engagement');

  api.setLanguage('ru');
  assert.equal(nodes[0].nodeValue, 'платформу и Фрилансер / специалист');
  assert.equal(nodes[1].nodeValue, 'Создатель контента');
  api.setLanguage('az');
  assert.deepEqual(nodes.map(node => node.nodeValue), azOriginal);
});

test('new dynamic content added after language selection is translated and can be restored', () => {
  const { api, nodes, observers } = createI18nHarness();
  api.setLanguage('en');
  const dynamic = { nodeType: 3, nodeValue: 'Platformada', parentElement: { closest() { return null; } } };
  nodes.push(dynamic);
  observers.at(-1).callback([{ type: 'childList', addedNodes: [dynamic] }]);
  assert.equal(dynamic.nodeValue, 'on the platform');
  api.setLanguage('ru');
  assert.equal(dynamic.nodeValue, 'на платформе');
  api.setLanguage('az');
  assert.equal(dynamic.nodeValue, 'Platformada');
});

test('product capability copy is localized for Azerbaijani, English, and Russian', () => {
  const { api } = createI18nHarness();
  assert.equal(api.t('YAYIMDAN ƏVVƏL YOXLAMA'), 'YAYIMDAN ƏVVƏL YOXLAMA');
  api.setLanguage('en');
  assert.equal(api.t('YAYIMDAN ƏVVƏL YOXLAMA'), 'PRE-PUBLISH REVIEW');
  assert.equal(api.t('Nəyi düzəltməli olduğunu gör.'), 'See what to improve.');
  assert.equal(api.t('Video auditi'), 'Video review');
  api.setLanguage('ru');
  assert.equal(api.t('YAYIMDAN ƏVVƏL YOXLAMA'), 'ПРОВЕРКА ПЕРЕД ПУБЛИКАЦИЕЙ');
  assert.equal(api.t('Öz məlumatların'), 'Твои данные');
});


test('billing and floating-assistant sentences stay fully localized in English and Russian', () => {
  const { api } = createI18nHarness();
  const billingCopy = 'Süni intellekt köməkçisi limitləri və iş axınını ehtiyacına uyğun genişləndir.';
  const freePlanCopy = 'İdeyalarını sınamaq və gündəlik məzmun işləri üçün.';
  const countCopy = 'Gündə 10 Süni intellekt köməkçisi mesajı';
  api.setLanguage('en');
  assert.equal(api.t(billingCopy), 'Choose the AI assistant plan that fits your workflow.');
  assert.equal(api.t(freePlanCopy), 'For exploring ideas and everyday content tasks.');
  assert.equal(api.t(countCopy), '10 AI assistant messages per day');
  api.setLanguage('ru');
  assert.equal(api.t(billingCopy), 'Выбери тариф ИИ-помощника под свой рабочий процесс.');
  assert.equal(api.t(freePlanCopy), 'Для проверки идей и повседневных задач с контентом.');
  assert.equal(api.t(countCopy), '10 сообщений ИИ-помощнику в день');
});


test('Mimo helper controls and supporting copy are translated in all three languages', () => {
  const { api } = createI18nHarness();
  const title = 'Köməkçini öz zövqünə uyğunlaşdır';
  const description = 'Köməkçinin adını və görünüşünü seç. Seçimlərin bu brauzerdə, hesabın üçün yadda saxlanacaq.';
  const save = 'Görünüşü saxla ✨';
  assert.equal(api.t(title), title);
  api.setLanguage('en');
  assert.equal(api.t(title), 'Make your helper your own');
  assert.equal(api.t(description), "Choose your helper's name and appearance. Your preferences are saved in this browser for your account.");
  assert.equal(api.t(save), 'Save appearance ✨');
  api.setLanguage('ru');
  assert.equal(api.t(title), 'Настрой помощника под себя');
  assert.equal(api.t(save), 'Сохранить оформление ✨');
  api.setLanguage('az');
  assert.equal(api.t(title), title);
});

test('Orbit dashboard labels stay concise and localized in EN/RU', () => {
  const { api } = createI18nHarness();
  api.setLanguage('en');
  assert.equal(api.t('Bir ideya.'), 'One idea.');
  assert.equal(api.t('Bir siqnal.'), 'One signal.');
  assert.equal(api.t('Yeni analiz'), 'New analysis');
  assert.equal(api.t('Mətni yoxla'), 'Review copy');
  assert.equal(api.t('Menyunu yığ'), 'Collapse menu');
  api.setLanguage('ru');
  assert.equal(api.t('Bir ideya.'), 'Одна идея.');
  assert.equal(api.t('Bir siqnal.'), 'Один сигнал.');
  assert.equal(api.t('Siqnalları gör'), 'Смотри сигналы');
  assert.equal(api.t('Menyunu genişləndir'), 'Развернуть меню');
});

test('editorial landing copy stays localized in all three languages', () => {
  const { api } = createI18nHarness();
  const nav = 'Mətn auditi';
  const lead = 'Mətni, ilk kadrı və çağırışı yayımdan əvvəl yoxla. Öz statistikanla müqayisə et.';
  assert.equal(api.t(nav), nav);
  api.setLanguage('en');
  assert.equal(api.t(nav), 'Copy review');
  assert.equal(api.t(lead), 'Review the copy, opening frame, and call to action before publishing. Compare them with your own metrics.');
  api.setLanguage('ru');
  assert.equal(api.t(nav), 'Проверка текста');
  assert.equal(api.t(lead), 'Проверь текст, первый кадр и призыв к действию до публикации. Сравни с собственной статистикой.');
  api.setLanguage('az');
  assert.equal(api.t(lead), lead);
});

test('Video Lab, Team gates, and the total-interactions CSV workflow have AZ/EN/RU copy', () => {
  const { api } = createI18nHarness();
  const videoGate = 'Video Lab Go və Pro planlarında açılır. İlk kadrları, ekrandakı yazıları və mövcud səs mətnini təhlil edib konkret düzəlişlər al.';
  const csvHelp = 'Tarix YYYY-MM-DD formatında ola bilər. Date, Platform, Post, Views, Interactions, ER formatı və ya date, platform, title, views, likes, comments, shares, saves formatı dəstəklənir. Fayl 2 MB-dan kiçik olmalıdır. Yükləməzdən əvvəl şəxsi məlumatları sil.';
  api.setLanguage('en');
  assert.match(api.t(videoGate), /Video Lab is available on Go and Pro/);
  assert.match(api.t(csvHelp), /Both Date, Platform, Post, Views, Interactions, ER/);
  assert.equal(api.t('Videonu kadr-kadr təhlil et'), 'Review your video frame by frame');
  api.setLanguage('ru');
  assert.match(api.t(videoGate), /Video Lab доступен на тарифах Go и Pro/);
  assert.match(api.t(csvHelp), /Поддерживаются форматы Date, Platform, Post, Views, Interactions, ER/);
  assert.equal(api.t('Videonu kadr-kadr təhlil et'), 'Разбери видео покадрово');
  api.setLanguage('az');
  assert.equal(api.t('Videonu kadr-kadr təhlil et'), 'Videonu kadr-kadr təhlil et');
});
