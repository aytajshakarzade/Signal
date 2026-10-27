(() => {
  'use strict';
  const $ = (selector, base = document) => base.querySelector(selector);
  const $$ = (selector, base = document) => [...base.querySelectorAll(selector)];
  const state = { user: null, authMode: 'register', platform: 'Instagram', lastAnalysis: null, lastVideoAnalysis: null, ideas: [], metrics: [], businessProfile: null, rewards: null, reportPeriod: 'week', trends: [], config: {}, scrapeItems: [], scrapeTarget: '', scrapePlatform: '', chatHistory: [], billing: null, busy: false };
  const authModal = $('#auth-modal');
  const authAlert = $('#auth-alert');
  const authForm = $('#auth-form');
  const profileLabels = { creator: 'Məzmun müəllifi', company: 'Özəl şirkət', agency: 'Marketinq agentliyi', personal_brand: 'Şəxsi brend', freelancer: 'Sərbəst mütəxəssis' };

  function buddyAvatarSvg(avatar) {
    const themes = {
      '🦊': { base: '#ef9b4b', dark: '#60354b', inner: '#ffd2a8', muzzle: '#fff6e9', blush: '#f3a2a1', bg: '#f3eaff', accent: '#8d69c3', kind: 'fox' },
      '🐱': { base: '#ce8ebe', dark: '#503b5e', inner: '#f4c7e6', muzzle: '#fff4fb', blush: '#eca7ce', bg: '#f9eafa', accent: '#9669c7', kind: 'cat' },
      '🐼': { base: '#f8f6f2', dark: '#343040', inner: '#d8d4dc', muzzle: '#ffffff', blush: '#edb1b7', bg: '#edf0f5', accent: '#8c73bd', kind: 'panda' },
      '🐸': { base: '#9bd16a', dark: '#315c43', inner: '#c5e994', muzzle: '#efffcf', blush: '#d5e78a', bg: '#eaf5d8', accent: '#6a9f55', kind: 'frog' },
      '🦄': { base: '#d5a8ed', dark: '#65466f', inner: '#f7c8e0', muzzle: '#fff4fb', blush: '#f0a8d0', bg: '#f3e6ff', accent: '#f0b85c', kind: 'unicorn' },
      '🐙': { base: '#ee928e', dark: '#703c5b', inner: '#f7b0aa', muzzle: '#fff0e9', blush: '#f5bbb5', bg: '#ffebe8', accent: '#9d62b6', kind: 'octopus' },
      '🐻': { base: '#b98a65', dark: '#533b36', inner: '#d3a887', muzzle: '#f9e9d6', blush: '#d9918d', bg: '#f6ebdf', accent: '#a66b49', kind: 'bear' },
      '🤖': { base: '#9fc8e9', dark: '#3d4d70', inner: '#c6e5f7', muzzle: '#f2fbff', blush: '#efacb2', bg: '#e4f2fc', accent: '#5a82bc', kind: 'robot' }
    };
    const t = themes[avatar] || themes['🦊'];
    let ears = '';
    let accessory = '';
    let detail = '';
    if (t.kind === 'fox') {
      ears = `<path d="M25 45 L20 17 Q20 12 26 17 L43 31 M71 45 L76 17 Q76 12 70 17 L53 31" fill="${t.base}" stroke="${t.dark}" stroke-width="3" stroke-linejoin="round"/><path d="M25 34 L24 23 L34 32 M71 34 L72 23 L62 32" fill="${t.inner}"/>`;
      detail = `<path d="M35 63 Q48 72 61 63 Q58 78 48 78 Q38 78 35 63Z" fill="${t.muzzle}"/><path d="M43 67 Q48 71 53 67" fill="none" stroke="${t.dark}" stroke-width="2.2" stroke-linecap="round"/>`;
    } else if (t.kind === 'cat') {
      ears = `<path d="M25 42 L23 17 Q23 13 28 17 L43 31 M71 42 L73 17 Q73 13 68 17 L53 31" fill="${t.base}" stroke="${t.dark}" stroke-width="3" stroke-linejoin="round"/><path d="M28 32 L27 23 L35 31 M68 32 L69 23 L61 31" fill="${t.inner}"/>`;
      detail = `<path d="M35 65 Q48 73 61 65" fill="none" stroke="${t.dark}" stroke-width="2.2" stroke-linecap="round"/><path d="M27 60 L16 57 M27 65 L16 66 M69 60 L80 57 M69 65 L80 66" stroke="${t.dark}" stroke-width="1.7" stroke-linecap="round"/>`;
    } else if (t.kind === 'panda') {
      ears = `<circle cx="29" cy="31" r="12" fill="${t.dark}"/><circle cx="67" cy="31" r="12" fill="${t.dark}"/>`;
      detail = `<ellipse cx="37" cy="49" rx="8" ry="11" fill="${t.dark}" transform="rotate(25 37 49)"/><ellipse cx="59" cy="49" rx="8" ry="11" fill="${t.dark}" transform="rotate(-25 59 49)"/><ellipse cx="48" cy="64" rx="15" ry="10" fill="${t.muzzle}"/><path d="M44 64 Q48 69 52 64" fill="none" stroke="${t.dark}" stroke-width="2" stroke-linecap="round"/>`;
    } else if (t.kind === 'frog') {
      ears = `<circle cx="32" cy="31" r="14" fill="${t.base}" stroke="${t.dark}" stroke-width="3"/><circle cx="64" cy="31" r="14" fill="${t.base}" stroke="${t.dark}" stroke-width="3"/><circle cx="32" cy="31" r="7" fill="#fffdf8"/><circle cx="64" cy="31" r="7" fill="#fffdf8"/><circle cx="33" cy="32" r="3" fill="${t.dark}"/><circle cx="63" cy="32" r="3" fill="${t.dark}"/>`;
      detail = `<path d="M38 64 Q48 73 58 64" fill="none" stroke="${t.dark}" stroke-width="2.5" stroke-linecap="round"/>`;
    } else if (t.kind === 'unicorn') {
      ears = `<path d="M28 43 L26 22 Q26 18 31 21 L43 33 M68 43 L70 22 Q70 18 65 21 L53 33" fill="${t.base}" stroke="${t.dark}" stroke-width="3" stroke-linejoin="round"/><path d="M43 30 L48 9 L54 30Z" fill="${t.accent}" stroke="${t.dark}" stroke-width="2.2" stroke-linejoin="round"/><path d="M47 16 L50 13" stroke="#fff8dd" stroke-width="2" stroke-linecap="round"/>`;
      accessory = `<path d="M25 39 Q13 30 17 46 Q20 53 28 52" fill="#f2a6cc" stroke="${t.dark}" stroke-width="2.5"/><circle cx="19" cy="45" r="3" fill="#fff4fb"/>`;
      detail = `<path d="M37 65 Q48 73 59 65" fill="none" stroke="${t.dark}" stroke-width="2.2" stroke-linecap="round"/>`;
    } else if (t.kind === 'octopus') {
      ears = `<path d="M29 65 Q18 68 20 79 Q21 84 29 79 M39 71 Q31 84 38 87 Q43 88 45 78 M57 71 Q65 84 58 87 Q53 88 51 78 M67 65 Q78 68 76 79 Q75 84 67 79" fill="none" stroke="${t.base}" stroke-width="8" stroke-linecap="round"/><path d="M29 65 Q18 68 20 79 M67 65 Q78 68 76 79" fill="none" stroke="${t.dark}" stroke-width="2.2" stroke-linecap="round"/>`;
      detail = `<path d="M39 64 Q48 71 57 64" fill="none" stroke="${t.dark}" stroke-width="2.2" stroke-linecap="round"/>`;
    } else if (t.kind === 'bear') {
      ears = `<circle cx="29" cy="32" r="13" fill="${t.base}" stroke="${t.dark}" stroke-width="3"/><circle cx="67" cy="32" r="13" fill="${t.base}" stroke="${t.dark}" stroke-width="3"/><circle cx="29" cy="32" r="6" fill="${t.inner}"/><circle cx="67" cy="32" r="6" fill="${t.inner}"/>`;
      detail = `<ellipse cx="48" cy="62" rx="15" ry="11" fill="${t.muzzle}"/><path d="M43 62 Q48 67 53 62" fill="none" stroke="${t.dark}" stroke-width="2.2" stroke-linecap="round"/>`;
    } else if (t.kind === 'robot') {
      ears = `<path d="M25 41 H17 Q13 41 13 46 V55 Q13 59 18 59 H25 M71 41 H79 Q83 41 83 46 V55 Q83 59 78 59 H71" fill="${t.inner}" stroke="${t.dark}" stroke-width="3"/><path d="M48 21 V14" stroke="${t.dark}" stroke-width="3" stroke-linecap="round"/><circle cx="48" cy="11" r="5" fill="${t.accent}" stroke="${t.dark}" stroke-width="2"/>`;
      detail = `<rect x="35" y="58" width="26" height="13" rx="6.5" fill="${t.muzzle}" stroke="${t.dark}" stroke-width="2"/><path d="M40 64 H45 M51 64 H56" stroke="${t.dark}" stroke-width="2" stroke-linecap="round"/>`;
    }
    const eyePatch = t.kind === 'panda' ? '' : '';
    const eyes = t.kind === 'frog'
      ? ''
      : t.kind === 'robot'
        ? `<rect x="31" y="46" width="13" height="11" rx="4" fill="${t.dark}"/><rect x="52" y="46" width="13" height="11" rx="4" fill="${t.dark}"/><circle cx="37" cy="49" r="2" fill="#fff"/><circle cx="58" cy="49" r="2" fill="#fff"/>`
        : t.kind === 'panda'
          ? `<circle cx="37" cy="49" r="3.2" fill="#fff"/><circle cx="59" cy="49" r="3.2" fill="#fff"/>`
          : `<ellipse cx="37" cy="49" rx="3.2" ry="4.5" fill="${t.dark}"/><ellipse cx="59" cy="49" rx="3.2" ry="4.5" fill="${t.dark}"/><circle cx="38" cy="47.5" r="1.1" fill="#fff"/><circle cx="60" cy="47.5" r="1.1" fill="#fff"/>`;
    const muzzle = t.kind === 'fox' ? '' : (t.kind === 'panda' || t.kind === 'bear' || t.kind === 'cat' || t.kind === 'unicorn' || t.kind === 'octopus') ? '' : `<path d="M42 62 Q48 67 54 62" fill="none" stroke="${t.dark}" stroke-width="2.2" stroke-linecap="round"/>`;
    return `<svg class="buddy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Köməkçi avatarı"><circle cx="48" cy="48" r="45" fill="${t.bg}"/><circle cx="17" cy="23" r="2.2" fill="${t.accent}" opacity=".65"/><path d="M75 16 l2.3 5.2 5.2 2.3-5.2 2.3-2.3 5.2-2.3-5.2-5.2-2.3 5.2-2.3Z" fill="${t.accent}" opacity=".8"/>${ears}${accessory}<path d="M24 43 Q24 30 38 30 H58 Q72 30 72 43 V57 Q72 78 48 80 Q24 78 24 57Z" fill="${t.base}" stroke="${t.dark}" stroke-width="3" stroke-linejoin="round"/><path d="M29 40 Q30 32 39 33 H57 Q66 32 67 40" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".42"/>${eyes}<ellipse cx="30" cy="59" rx="5" ry="3" fill="${t.blush}" opacity=".75"/><ellipse cx="66" cy="59" rx="5" ry="3" fill="${t.blush}" opacity=".75"/>${detail}${muzzle}<path d="M44 73 Q48 76 52 73" stroke="${t.dark}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".8"/><circle cx="78" cy="69" r="3" fill="${t.accent}" opacity=".7"/></svg>`;
  }

  const BUDDY_DEFAULT = Object.freeze({ name: 'Mimo', avatar: '🦊' });
  const BUDDY_AVATARS = new Set(['🦊','🐱','🐼','🐸','🦄','🐙','🐻','🤖']);
  let selectedBuddyAvatar = BUDDY_DEFAULT.avatar;
  function buddyStorageKey() {
    const identity = String(state.user?.email || state.user?.id || 'guest').trim().toLowerCase();
    return `signalStudioBuddyV1:${identity || 'guest'}`;
  }
  function getBuddyProfile() {
    try {
      const saved = JSON.parse(localStorage.getItem(buddyStorageKey()) || '{}');
      return {
        name: typeof saved.name === 'string' && saved.name.trim() ? saved.name.trim().slice(0, 28) : BUDDY_DEFAULT.name,
        avatar: BUDDY_AVATARS.has(saved.avatar) ? saved.avatar : BUDDY_DEFAULT.avatar
      };
    } catch { return { ...BUDDY_DEFAULT }; }
  }
  function syncBuddyUI() {
    const profile = getBuddyProfile();
    selectedBuddyAvatar = profile.avatar;
    document.querySelectorAll('[data-buddy-name]').forEach(node => { node.textContent = profile.name; });
    document.querySelectorAll('[data-buddy-avatar-display]').forEach(node => { node.innerHTML = buddyAvatarSvg(profile.avatar); node.classList.add('has-custom-avatar'); });
    document.querySelectorAll('.assistant-message-ai .assistant-message-avatar').forEach(node => { node.innerHTML = buddyAvatarSvg(profile.avatar); node.classList.add('has-custom-avatar'); });
    const nameInput = $('#buddy-name-input'); if (nameInput && document.activeElement !== nameInput) nameInput.value = profile.name;
    const preview = $('#buddy-settings-avatar-preview'); if (preview) { preview.innerHTML = buddyAvatarSvg(profile.avatar); preview.classList.add('has-custom-avatar'); }
    $$('[data-buddy-avatar-choice]').forEach(button => {
      button.innerHTML = buddyAvatarSvg(button.dataset.buddyAvatarChoice);
      const active = button.dataset.buddyAvatarChoice === profile.avatar;
      button.classList.toggle('is-selected', active); button.setAttribute('aria-pressed', String(active));
    });
    const launcher = $('#signal-chat-launcher');
    if (launcher) launcher.setAttribute('aria-label', `${profile.name} köməkçisini aç`);
    const panel = $('#signal-chat-panel'); if (panel) panel.setAttribute('aria-label', `${profile.name} süni intellekt köməkçisi`);
    const close = $('#signal-chat-close'); if (close) close.setAttribute('aria-label', 'Söhbəti bağla');
    const tourMascot = document.querySelector('.tour-mascot'); if (tourMascot) { tourMascot.innerHTML = buddyAvatarSvg(profile.avatar); tourMascot.classList.add('has-custom-avatar'); }
  }
  function saveBuddyProfile() {
    const name = ($('#buddy-name-input')?.value || '').trim().slice(0, 28) || BUDDY_DEFAULT.name;
    const avatar = BUDDY_AVATARS.has(selectedBuddyAvatar) ? selectedBuddyAvatar : BUDDY_DEFAULT.avatar;
    const profile = { name, avatar };
    try { localStorage.setItem(buddyStorageKey(), JSON.stringify(profile)); } catch { /* keep in memory for the current session */ }
    syncBuddyUI();
    const status = $('#buddy-settings-status');
    if (status) status.textContent = `${name} yeni görünüşünü bəyəndi! ✨`;
    toast(`Köməkçinin görünüşü saxlanıldı.`);
  }
  function bindBuddySettings() {
    $$('[data-buddy-avatar-choice]').forEach(button => button.addEventListener('click', () => {
      selectedBuddyAvatar = button.dataset.buddyAvatarChoice;
      const preview = $('#buddy-settings-avatar-preview'); if (preview) { preview.innerHTML = buddyAvatarSvg(selectedBuddyAvatar); preview.classList.add('has-custom-avatar'); }
      $$('[data-buddy-avatar-choice]').forEach(choice => {
        const active = choice === button; choice.classList.toggle('is-selected', active); choice.setAttribute('aria-pressed', String(active));
      });
      const status = $('#buddy-settings-status'); if (status) status.textContent = 'Bu avatar xoşuna gəldi? Görünüşü saxlamağı unutma.';
    }));
    $('#buddy-settings-save')?.addEventListener('click', saveBuddyProfile);
    $('#buddy-name-input')?.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); saveBuddyProfile(); } });
  }

  function toast(message) {
    const el = $('#toast'); if (!el) return;
    el.textContent = window.SignalI18n ? window.SignalI18n.t(message) : message; el.classList.add('show');
    clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 3600);
  }
  function setAlert(message, type = 'error') {
    authAlert.className = `form-alert ${type}`; authAlert.textContent = window.SignalI18n ? window.SignalI18n.t(message) : message; authAlert.classList.remove('hidden');
  }
  function clearAlert() { authAlert.className = 'form-alert hidden'; authAlert.textContent = ''; }
  async function api(path, options = {}) {
    const init = { credentials: 'same-origin', ...options, headers: { ...(options.body && !(options.body instanceof Blob) ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) } };
    let response;
    try { response = await fetch(path, init); }
    catch { throw new Error('Xidmətə qoşulmaq mümkün olmadı. İnternet bağlantını yoxla və yenidən cəhd et.'); }
    const responseText = await response.text();
    let payload;
    try { payload = responseText ? JSON.parse(responseText) : {}; }
    catch {
      const apiRequest = typeof path === 'string' && path.startsWith('/api/');
      const missingApi = response.status === 404 && apiRequest;
      payload = {
        ok: false,
        message: missingApi
          ? 'Bu əməliyyat hazırda əlçatan deyil. Səhifəni yenilə və yenidən cəhd et.'
          : 'Sorğunu tamamlamaq mümkün olmadı. Səhifəni yenilə və yenidən cəhd et.'
      };
    }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) payload = { ok: false, message: 'Serverdən düzgün cavab alınmadı. /api/health səhifəsini yoxla.' };
    if (!response.ok || payload.ok === false) {
      const error = new Error(payload.message || 'Sorğunu tamamlamaq mümkün olmadı.');
      error.status = response.status; error.code = payload.code; error.payload = payload; throw error;
    }
    return payload;
  }
  function makeElement(tag, className = '', text = '') {
    const element = document.createElement(tag); if (className) element.className = className; if (text !== undefined && text !== null) element.textContent = window.SignalI18n ? window.SignalI18n.t(String(text)) : String(text); return element;
  }
  function firstInitial(value) { return (String(value || 'S').trim()[0] || 'S').toLocaleUpperCase('az-AZ'); }
  function formatNumber(value) { return new Intl.NumberFormat('az-AZ', { maximumFractionDigits: 1 }).format(Number(value) || 0); }
  function formatPercent(value) { return Number.isFinite(Number(value)) ? `${Number(value).toLocaleString('az-AZ', { maximumFractionDigits: 2 })}%` : '—'; }
  function safeDate(value) { const d = new Date(value); return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('az-AZ'); }
  function setHeaderForUser() {
    $$('[data-auth="register"]').forEach(button => { button.textContent = state.user ? 'İş məkanım ↗' : (button.classList.contains('btn-small') ? 'Pulsuz başla ↗' : 'Öz hekayəni başlat ↗'); });
    $$('[data-auth="login"]').forEach(button => { button.textContent = state.user ? 'Hesabım' : 'Daxil ol'; });
  }
  function showWorkspace() {
    if (!state.user) return openAuth('login');
    $('#landing-view').classList.add('hidden'); $('#site-header').classList.add('hidden'); $('#site-footer').classList.add('hidden'); $('#workspace-view').classList.remove('hidden');
    $('#sidebar-user-name').textContent = state.user.name; $('#sidebar-user-email').textContent = state.user.email;
    $('#user-avatar').textContent = firstInitial(state.user.name); $('#sidebar-profile-type').textContent = profileLabels[state.user.profileType] || 'İstifadəçi';
    $('#profile-name').value = state.user.name || ''; $('#profile-email').value = state.user.email || ''; $('#profile-status').value = state.user.emailVerified ? 'Təsdiqlənib' : 'Təsdiq gözlənilir'; $('#profile-type-read').value = profileLabels[state.user.profileType] || 'Məzmun müəllifi';
    syncBuddyUI();
    updateBillingIdentity();
    showView('overview'); void loadWorkspaceData(); window.scrollTo({ top: 0, behavior: 'smooth' }); scheduleFirstLoginTour();
  }
  function showLanding() {
    $('#workspace-view').classList.add('hidden'); $('#landing-view').classList.remove('hidden'); $('#site-header').classList.remove('hidden'); $('#site-footer').classList.remove('hidden'); $('#sidebar').classList.remove('mobile-open'); setHeaderForUser(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function updateFeatureGates() {
    const plan = String(state.user?.plan || 'free').toLowerCase();
    const videoAllowed = ['go', 'pro'].includes(plan);
    const teamAllowed = plan === 'pro';
    $('#video-plan-gate')?.classList.toggle('hidden', videoAllowed);
    $('#video-lab-content')?.classList.toggle('hidden', !videoAllowed);
    $('#team-plan-gate')?.classList.toggle('hidden', teamAllowed);
    $('#team-plan-content')?.classList.toggle('hidden', !teamAllowed);
  }
  function showView(name) {
    updateFeatureGates();
    const titleMap = {
      overview: ['İCMAL', `Xoş gəldin, ${state.user?.name?.split(/\s+/)[0] || 'yaradıcı'}.`],
      predictor: ['PROQNOZ LABORATORİYASI', 'Məzmununu təhlil et.'], video: ['VİDEO LABORATORİYASI', 'Videonu kadr-kadr araşdır.'], trends: ['AKTUAL MÖVZULAR', 'Növbəti mövzunu məlumatla seç.'],
      reports: ['HESABATLAR', 'Nəticələrini dövrlər üzrə müqayisə et.'], library: ['MƏZMUN KİTABXANASI', 'İdeyaların bir yerdə.'],
      connections: ['SOSİAL MƏLUMAT LABORATORİYASI', 'Platformalardan real açıq məlumat gətir.'], team: ['ƏMƏKDAŞLIQ', 'Biznesləri və mütəxəssisləri birləşdir.'], rewards: ['DƏVƏTLƏR VƏ MÜKAFAT', 'İcmanı böyüt, xal qazan.'], settings: ['TƏNZİMLƏMƏLƏR', 'İş məkanını qur.'], assistant: ['SÜNİ İNTELLEKT KÖMƏKÇİSİ', 'İdeyanı birlikdə inkişaf etdirək.'], billing: ['PLAN VƏ ÖDƏNİŞ', 'İşinə uyğun plan seç.']
    };
    $$('.workspace-page').forEach(page => page.classList.toggle('is-active', page.id === `view-${name}`));
    $$('.side-link').forEach(link => link.classList.toggle('is-active', link.dataset.view === name));
    $('#breadcrumb-label').textContent = (titleMap[name] || titleMap.overview)[0]; $('#workspace-title').textContent = (titleMap[name] || titleMap.overview)[1];
    $('#sidebar').classList.remove('mobile-open');
    const plan = String(state.user?.plan || 'free').toLowerCase();
    if (name === 'video' && ['go', 'pro'].includes(plan)) {
      setTimeout(() => $('#video-file')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    }
    if (name === 'reports') renderReport();
    if (name === 'connections') void loadApifyStatus();
    if (name === 'team' && plan === 'pro') {
      void api('/api/business-profile').then(result => { state.businessProfile = result.profile || null; if (state.businessProfile) fillBusinessProfile(state.businessProfile); }).catch(error => { $('#business-profile-status').textContent = error.message; });
      void loadPartners();
    }
    if (name === 'rewards') void loadRewards();
    if (name === 'billing') void loadBilling();
  }

  const firstTour = {
    active: false, index: 0, timer: null, target: null, shell: null, spotlight: null,
    steps: [
      { view: 'overview', target: null, title: 'Xoş gəldin! ✨', body: 'Gəl iş məkanını birlikdə tanıyaq. Bu qısa tur səni əsas səhifələrdən keçirəcək; istənilən vaxt keçə və ya əvvəlki addıma qayıda bilərsən.' },
      { view: 'overview', target: '#view-overview .overview-welcome', title: '1. İcmal paneli', body: 'Burada əsas göstəricilərini, saxladığın ideyaları və tez-tez istifadə olunan alətləri görəcəksən. Real məlumatların əlavə edilməyənə qədər rəqəmlər nümunə kimi göstərilmir.' },
      { view: 'predictor', target: '#view-predictor .workspace-card, #view-predictor .content-form, #view-predictor form', title: '2. Mətn təhlili', body: 'Paylaşım mətnini, platformanı və məqsədi seç. Sistem mətnin başlanğıcını, aydınlığını və çağırışını qiymətləndirir; bu bal viral olma zəmanəti deyil.' },
      { view: 'video', target: '#view-video .video-upload-panel', fallbackView: 'billing', fallbackTarget: '#view-billing .billing-plan-grid', paid: true, title: '3. Video təhlili', body: 'Videonu əlavə edərək ilk kadrları, yazıları və dəstəklənən audio məlumatlarını yoxla. Bu imkan hesab planından asılı ola bilər.' },
      { view: 'trends', target: '#view-trends #trend-form', title: '4. Aktual mövzular', body: 'Mövzu, sahə və region seçərək aktual siqnalları araşdır. Mənbədən gələn faktiki nəticələrlə süni intellekt tövsiyələri bir-birindən ayrılır.' },
      { view: 'connections', target: '#view-connections .connector-platforms', title: '5. Platforma məlumatları', body: 'Dəstəklənən platformalarda açıq paylaşımları axtar, uyğun məlumatları gətir və nəticələrini hesabatlarda istifadə et. Bəzi mənbələr əlavə hesab və xərc tələb edə bilər.' },
      { view: 'reports', target: '#view-reports .report-toolbar', title: '6. Hesabatlar', body: 'Həftəlik, aylıq və illik dövrləri seç. Öz statistikalarını CSV faylı ilə yüklə, qrafikləri və nəticələri nəzərdən keçir.' },
      { view: 'library', target: '#view-library .library-toolbar', title: '7. Məzmun kitabxanası', body: 'Təhlil etdiyin və sonradan istifadə etmək istədiyin ideyaları saxla, axtar və yenidən işə qaytar.' },
      { view: 'team', target: '#view-team .team-page-grid', fallbackView: 'billing', fallbackTarget: '#view-billing .billing-plan-grid', paid: true, title: '8. Komanda və biznes', body: 'Şirkət, agentlik və yaradıcı profilləri ilə əməkdaşlıq məkanı qur. Bu bölmənin bəzi imkanları Pro planı tələb edir.' },
      { view: 'rewards', target: '#view-rewards .reward-total', title: '9. Dəvətlər və mükafatlar', body: 'Şəxsi dəvət keçidini paylaş, təsdiqlənmiş dəvətlərini izlə və qaydalara uyğun xallar topla.' },
      { view: 'settings', target: '#view-settings .settings-grid', title: '10. Hesab tənzimləmələri', body: 'Hesab məlumatlarına və bağlantıların vəziyyətinə bax. Məxfi giriş açarları iş məkanında göstərilmir.' },
      { view: 'billing', target: '#view-billing .billing-plan-grid', title: '11. Plan və ödəniş', body: 'Pulsuz, Go və Pro planlarının fərqini müqayisə et. Ödənişi yalnız Stripe-ın təhlükəsiz səhifəsində test rejimindən başlayaraq yoxla.' },
      { view: 'overview', target: '#signal-chat-launcher', title: '12. Köməkçi həmişə yanındadır', body: 'Sağ aşağı küncdəki düymə ilə süni intellekt köməkçisini istənilən səhifədən aça bilərsən. Mətn, video ssenarisi, ideya və planlar barədə sual ver.' },
      { view: 'overview', target: '#view-overview .overview-action-grid', title: 'Hazırsan! 🎉', body: 'Tur tamamlandı. İstənilən bölməyə soldakı menyudan keçə bilərsən. Bu tur həmin hesab üçün bir dəfə göstəriləcək.' }
    ]
  };
  function tourT(value) { return window.SignalI18n ? window.SignalI18n.t(value) : value; }
  function tourStorageKey() { return `signalStudioFirstTourV1:${String(state.user?.email || state.user?.id || 'account').toLowerCase()}`; }
  function scheduleFirstLoginTour() {
    if (!state.user || firstTour.active || firstTour.timer) return;
    try { if (localStorage.getItem(tourStorageKey()) === 'done') return; } catch { /* use in-memory tour */ }
    firstTour.timer = setTimeout(() => { firstTour.timer = null; if (state.user) beginFirstLoginTour(); }, 950);
  }
  function makeTourShell() {
    if (firstTour.shell) return firstTour.shell;
    const shell = document.createElement('div'); shell.id = 'signal-first-tour'; shell.className = 'signal-tour hidden';
    shell.innerHTML = `<div class="tour-spotlight" id="tour-spotlight" aria-hidden="true"></div><section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title"><div class="tour-card-top"><span class="tour-mascot" aria-hidden="true">✳</span><span id="tour-counter" class="tour-counter"></span><button type="button" class="tour-close" id="tour-skip" aria-label="Turu keç">×</button></div><h2 id="tour-title"></h2><p id="tour-body"></p><div class="tour-progress"><i id="tour-progress-fill"></i></div><div class="tour-actions"><button type="button" class="tour-skip-link" id="tour-skip-link">Turu keç</button><div><button type="button" class="btn btn-outline btn-small" id="tour-back">Geri</button><button type="button" class="btn btn-primary btn-small" id="tour-next">Növbəti ↗</button></div></div></section></div>`;
    document.body.append(shell); firstTour.shell = shell; firstTour.spotlight = $('#tour-spotlight');
    $('#tour-next').addEventListener('click', () => { if (firstTour.index >= firstTour.steps.length - 1) endFirstLoginTour(); else renderFirstTourStep(firstTour.index + 1); });
    $('#tour-back').addEventListener('click', () => renderFirstTourStep(Math.max(0, firstTour.index - 1)));
    ['#tour-skip', '#tour-skip-link'].forEach(selector => $(selector).addEventListener('click', endFirstLoginTour));
    document.addEventListener('keydown', event => { if (!firstTour.active) return; if (event.key === 'ArrowRight') $('#tour-next')?.click(); else if (event.key === 'ArrowLeft') $('#tour-back')?.click(); else if (event.key === 'Escape') endFirstLoginTour(); });
    window.addEventListener('resize', positionTourSpotlight); window.addEventListener('scroll', positionTourSpotlight, true);
    return shell;
  }
  function beginFirstLoginTour() {
    if (!state.user || firstTour.active) return;
    makeTourShell(); firstTour.active = true; firstTour.shell.classList.remove('hidden'); document.body.classList.add('tour-is-open'); renderFirstTourStep(0);
  }
  function positionTourSpotlight() {
    if (!firstTour.active || !firstTour.spotlight) return;
    if (!firstTour.target || !firstTour.target.isConnected || firstTour.target.getClientRects().length === 0) { firstTour.spotlight.classList.add('is-intro'); return; }
    const rect = firstTour.target.getBoundingClientRect(), pad = 7;
    firstTour.spotlight.classList.remove('is-intro');
    firstTour.spotlight.style.left = `${Math.max(5, rect.left - pad)}px`;
    firstTour.spotlight.style.top = `${Math.max(5, rect.top - pad)}px`;
    firstTour.spotlight.style.width = `${Math.min(window.innerWidth - Math.max(5, rect.left - pad) - 5, rect.width + pad * 2)}px`;
    firstTour.spotlight.style.height = `${Math.min(window.innerHeight - Math.max(5, rect.top - pad) - 5, rect.height + pad * 2)}px`;
  }
  function updateFirstTourCopy() {
    if (!firstTour.active) return;
    const step = firstTour.steps[firstTour.index]; if (!step) return;
    $('#tour-title').textContent = tourT(step.title); $('#tour-body').textContent = tourT(step.body);
    $('#tour-counter').textContent = `${firstTour.index + 1} / ${firstTour.steps.length}`;
    $('#tour-progress-fill').style.width = `${((firstTour.index + 1) / firstTour.steps.length) * 100}%`;
    $('#tour-back').textContent = tourT('Geri'); $('#tour-skip-link').textContent = tourT('Turu keç');
    $('#tour-next').textContent = tourT(firstTour.index === firstTour.steps.length - 1 ? 'Tamamla ✓' : 'Növbəti ↗');
    $('#tour-skip').setAttribute('aria-label', tourT('Turu keç'));
    $('#tour-back').disabled = firstTour.index === 0;
  }
  function renderFirstTourStep(index) {
    if (!firstTour.active) return;
    firstTour.index = Math.max(0, Math.min(firstTour.steps.length - 1, index));
    const step = firstTour.steps[firstTour.index];
    if (firstTour.target) firstTour.target.classList.remove('tour-highlighted');
    const hasPlan = ['go','pro'].includes(String(state.user?.plan || 'free').toLowerCase());
    const useFallback = step.paid && !hasPlan;
    const view = useFallback ? step.fallbackView : step.view;
    const selector = useFallback ? step.fallbackTarget : step.target;
    showView(view);
    firstTour.target = null;
    updateFirstTourCopy();
    if (!selector) { firstTour.spotlight.classList.add('is-intro'); positionTourSpotlight(); return; }
    setTimeout(() => {
      if (!firstTour.active) return;
      const target = document.querySelector(selector);
      if (target) {
        firstTour.target = target; target.classList.add('tour-highlighted');
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center', inline: 'nearest' });
        setTimeout(positionTourSpotlight, 180); setTimeout(positionTourSpotlight, 500);
      } else { firstTour.spotlight.classList.add('is-intro'); }
    }, 100);
  }
  function endFirstLoginTour() {
    if (!firstTour.active) return;
    if (firstTour.target) firstTour.target.classList.remove('tour-highlighted');
    firstTour.target = null; firstTour.active = false; firstTour.shell?.classList.add('hidden'); document.body.classList.remove('tour-is-open');
    try { localStorage.setItem(tourStorageKey(), 'done'); } catch { /* session still continues */ }
    showView('overview');
  }
  window.addEventListener('signal-language-change', () => { if (firstTour.active) updateFirstTourCopy(); });

  function openAuth(mode = 'register') {
    if (state.user) { showWorkspace(); return; }
    state.authMode = mode; document.body.classList.add('auth-is-open'); clearAlert(); $('#resend-row').classList.add('hidden'); authForm.reset();
    const register = mode === 'register';
    $('#auth-eyebrow').textContent = register ? 'SƏNİN YARADICI MƏKANIN' : 'SIGNAL / STUDIO';
    $('#auth-title').textContent = register ? 'Hesabını yarat.' : 'Yenidən xoş gəldin.';
    $('#auth-description').textContent = register ? 'Bütün əsas funksiyalara pulsuz başla.' : 'İş məkanına keçmək üçün məlumatlarını daxil et.';
    $('#name-field').classList.toggle('hidden', !register); $('#profile-type-field')?.classList.toggle('hidden', !register); $('#confirm-field').classList.toggle('hidden', !register);
    $('#auth-name').required = register; $('#auth-confirm').required = register; $('#auth-password').autocomplete = register ? 'new-password' : 'current-password';
    $('#auth-submit').textContent = register ? 'Pulsuz hesab yarat ↗' : 'Daxil ol ↗'; $('#auth-switch-copy').textContent = register ? 'Artıq hesabın var?' : 'Hələ hesabın yoxdur?'; $('#auth-switch').textContent = register ? 'Daxil ol' : 'Qeydiyyatdan keç';
    const ref = new URL(location.href).searchParams.get('ref'); if (register && ref) sessionStorage.setItem('signalReferralCode', ref);
    authModal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; setTimeout(() => $(register ? '#auth-name' : '#auth-email').focus(), 30);
  }
  function closeAuth() { authModal.classList.add('hidden'); document.body.style.overflow = ''; document.body.classList.remove('auth-is-open'); }
  function setAuthLoading(loading) { state.busy = loading; $('#auth-submit').disabled = loading; $('#auth-submit').textContent = loading ? 'Yoxlanılır…' : (state.authMode === 'register' ? 'Pulsuz hesab yarat ↗' : 'Daxil ol ↗'); }
  async function submitAuth(event) {
    event.preventDefault(); if (state.busy) return; clearAlert();
    const email = $('#auth-email').value.trim().toLowerCase(), password = $('#auth-password').value, name = $('#auth-name').value.trim();
    if (!email || !$('#auth-email').checkValidity()) return setAlert('Düzgün e-poçt ünvanı daxil et.');
    if (state.authMode === 'register') {
      if (name.length < 2) return setAlert('Ad ən azı 2 simvol olmalıdır.');
      if (password.length < 8) return setAlert('Şifrə ən azı 8 simvoldan ibarət olmalıdır.');
      if (password !== $('#auth-confirm').value) return setAlert('Şifrələr eyni deyil. Yenidən yoxla.');
    } else if (!password) return setAlert('Şifrəni daxil et.');
    setAuthLoading(true);
    try {
      if (state.authMode === 'register') {
        const profileType = $('#auth-profile-type')?.value || 'creator';
        const referralCode = sessionStorage.getItem('signalReferralCode') || new URL(location.href).searchParams.get('ref') || '';
        const result = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, profileType, referralCode }) });
        $('#resend-row').classList.remove('hidden'); $('#resend-confirmation').dataset.email = result.email || email; setAlert(result.message || 'Təsdiq məktubu göndərildi.', 'success');
      } else {
        const result = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); state.user = result.user; closeAuth(); setHeaderForUser(); showWorkspace(); toast(`Xoş gəldin, ${result.user.name.split(/\s+/)[0]}!`);
      }
    } catch (error) { setAlert(error.message || 'Xəta baş verdi.'); if (error.payload?.canResend || error.code === 'email_not_verified') { $('#resend-row').classList.remove('hidden'); $('#resend-confirmation').dataset.email = error.payload?.email || email; } }
    finally { setAuthLoading(false); }
  }
  async function resendVerification() {
    const email = $('#resend-confirmation').dataset.email || $('#auth-email').value.trim().toLowerCase(); if (!email) return setAlert('Əvvəlcə e-poçt ünvanını daxil et.');
    const button = $('#resend-confirmation'); button.disabled = true;
    try { const result = await api('/api/auth/resend-verification', { method: 'POST', body: JSON.stringify({ email }) }); setAlert(result.message || 'Sorğu qəbul edildi.', 'success'); }
    catch (error) { setAlert(error.message); } finally { button.disabled = false; }
  }

  // Transparent local review used only when there is no AI API connection.
  function localTextReview(text, goal, platform) {
    const clean = String(text || '').trim(); if (!clean) return null;
    const words = clean.match(/[\p{L}\p{N}_#@'-]+/gu) || [], lower = clean.toLocaleLowerCase('az-AZ');
    const hooks = ['necə', 'niyə', 'sən', 'bəs', 'kəşf', 'öyrən', 'səhv', 'bilmədiyin', 'how', 'why', 'you', 'discover'];
    const hasHook = hooks.some(word => lower.includes(word)), hasQuestion = clean.includes('?'), hasCTA = /(şərh|yaz|izlə|saxla|paylaş|daxil ol|link|comment|follow|save|share|book|register)/i.test(clean);
    const firstLine = clean.split(/[.!?\n]/)[0] || '', hashtagCount = (clean.match(/#[\p{L}\p{N}_]+/gu) || []).length;
    const hook = Math.max(20, Math.min(96, 45 + (hasHook ? 20 : 0) + (hasQuestion ? 12 : 0) + (firstLine.length <= 90 ? 8 : -8)));
    const readability = Math.max(20, Math.min(96, 85 - Math.max(0, words.length - 50) * .7 - Math.max(0, clean.length - 380) * .025 + (words.length > 10 ? 4 : 0)));
    const cta = Math.max(20, Math.min(96, 45 + (hasCTA ? 22 : 0) + (hasQuestion ? 10 : 0) + (goal === 'engagement' ? 8 : goal === 'leads' ? 5 : 0) + (hashtagCount ? 3 : 0)));
    const score = Math.round((hook * .38 + readability * .29 + cta * .33) * (platform === 'TikTok' && clean.length < 200 ? 1.02 : 1));
    const recommendations = [];
    if (!hasHook) recommendations.push('İlk cümlədə konkret sual, ziddiyyət və ya fayda göstərən diqqətçəkən başlanğıc seç.');
    if (firstLine.length > 120) recommendations.push('İlk cümləni qısalt: əsas faydanı ilk 1–2 sətirdə de.');
    if (!hasCTA) recommendations.push('Məqsədə uyğun çağırış əlavə et: şərh yaz, saxla, linkə keç və ya müraciət et.');
    if (words.length < 12) recommendations.push('Dəyər təklifini daha aydın izah edən bir konkret nümunə və ya səbəb əlavə et.');
    if (hashtagCount > 8) recommendations.push('Hashtag-ləri mövzu ilə birbaşa əlaqəli, az sayda etiketlə məhdudlaşdır.');
    if (!recommendations.length) recommendations.push('Struktur aydındır. Növbəti mərhələdə bunu öz hesabının keçmiş nəticələri ilə müqayisə et.');
    return { score: Math.max(1, Math.min(99, score)), hook: Math.round(hook), readability: Math.round(readability), engagement: Math.round(cta), words: words.length, text: clean, platform, goal, goalLabel: goal, engine: 'rule_based', recommendations };
  }
  function applyLandingAnalysis(result) {
    if (!result) return; $('#result-subtitle').textContent = `${result.words} söz · ${result.platform || state.platform} · ${result.engine === 'groq' ? 'Süni intellekt təhlili' : 'Mətn strukturu təhlili'}`;
    $('#score-number').textContent = result.score; $('#score-ring').style.setProperty('--score', result.score); $('#score-heading').textContent = result.score >= 75 ? 'Aydın struktur' : result.score >= 55 ? 'İnkişaf potensialı' : 'Təkmilləşdirmə lazımdır';
    $('#score-description').textContent = 'Mətn keyfiyyəti — gələcək auditoriya əhatəsinin proqnozu deyil';
    [['hook', result.hook], ['readability', result.readability], ['engagement', result.engagement]].forEach(([key, value]) => { $(`#${key}-value`).textContent = `${value}%`; $(`#${key}-progress`).style.width = `${value}%`; });
    $('#analysis-advice').textContent = `↳ Tövsiyə: ${result.recommendations?.[0] || 'Məzmununu real nəticələrlə müqayisə et.'}`;
  }
  async function onAnalyze(event) {
    event.preventDefault(); const text = $('#content-text').value.trim();
    if (text.length < 8) return toast('Daha dolğun analiz üçün bir neçə cümlə daxil et.');
    const button = $('#analyzer-form button[type="submit"]'); button.disabled = true; button.textContent = 'Təhlil edilir…';
    try {
      const result = await api('/api/analyze-preview', { method: 'POST', body: JSON.stringify({ text, platform: state.platform, goal: $('#content-goal').value, language: window.SignalI18n?.getLanguage?.() || 'az' }) });
      state.lastLandingAnalysis = result; applyLandingAnalysis(result);
      $('#result-title').textContent = result.title || 'Məzmun təhlili';
      $('#result-subtitle').textContent = `${result.words} söz · ${result.platform} · ${result.engine === 'groq' ? 'Süni intellekt təhlili' : 'Mətn strukturu təhlili'}`;
      $('#score-description').textContent = result.engine === 'groq' ? 'Süni intellektlə məzmun təhlili' : 'Mətn strukturunun qiymətləndirilməsi';
      $('#analysis-advice').textContent = `Tövsiyə: ${result.recommendations?.[0] || 'Mətnini nəzərdən keçir və məqsədinə uyğunlaşdır.'}`;
      toast('Məzmun təhlili tamamlandı.');
    } catch (error) { toast(error.message || 'Məzmunu təhlil etmək mümkün olmadı.'); }
    finally { button.disabled = false; button.innerHTML = 'Mətni analiz et <span>↗</span>'; }
  }

  async function loadWorkspaceData() {
    const settled = await Promise.allSettled([api('/api/content'), api('/api/metrics'), api('/api/business-profile'), api('/api/config')]);
    if (settled[0].status === 'fulfilled') state.ideas = settled[0].value.items || [];
    if (settled[1].status === 'fulfilled') state.metrics = settled[1].value.items || [];
    if (settled[2].status === 'fulfilled') state.businessProfile = settled[2].value.profile || null;
    if (settled[3].status === 'fulfilled') state.config = settled[3].value;
    renderIdeas(); renderOverview(); renderReport(); loadSettingsIntegrations(); updateBillingIdentity();
    if (state.businessProfile) fillBusinessProfile(state.businessProfile);
    void loadRewards();
  }
  function renderOverview() {
    const metrics = state.metrics || []; $('#kpi-posts').textContent = formatNumber(metrics.length); $('#kpi-count').textContent = formatNumber(state.ideas.length);
    const totalViews = metrics.reduce((sum, m) => sum + (m.views || 0), 0);
    const totalInteractions = metrics.reduce((sum, m) => sum + engagement(m), 0);
    $('#kpi-engagement').textContent = totalViews ? formatPercent(totalInteractions / totalViews * 100) : '—';
    const groups = new Map(); metrics.forEach(m => { const current = groups.get(m.platform) || { views: 0, interactions: 0 }; current.views += m.views || 0; current.interactions += engagement(m); groups.set(m.platform, current); });
    let top = null; groups.forEach((v, k) => { const rate = v.views ? v.interactions / v.views : 0; if (!top || rate > top.rate) top = { name: k, rate }; });
    $('#kpi-platform').textContent = top ? top.name : '—';
    const empty = $('#overview-empty'), breakdown = $('#overview-platforms');
    empty.classList.toggle('hidden', metrics.length > 0); breakdown.replaceChildren();
    if (metrics.length) {
      [...groups.entries()].sort((a,b) => (b[1].views ? b[1].interactions/b[1].views : 0) - (a[1].views ? a[1].interactions/a[1].views : 0)).forEach(([platform, value]) => {
        const row = makeElement('div', 'platform-stat-row'), label = makeElement('span','', platform), rate = value.views ? value.interactions / value.views * 100 : 0, bar = makeElement('div','progress'), fill = document.createElement('i'); fill.style.width = `${Math.max(1,Math.min(100,rate*10))}%`; bar.append(fill); row.append(label, bar, makeElement('b','',formatPercent(rate))); breakdown.append(row);
      });
    }
    const notice = $('#data-notice'); if (metrics.length >= 10) { notice.querySelector('p').textContent = `Məlumat vəziyyəti: ${metrics.length} paylaşım yüklənib. Hesabatlar şəxsi tarixçənə əsaslanır; real performans proqnozu üçün daha böyük tarixçə və model kalibrasiyası lazımdır.`; }
  }
  function renderIdeas() {
    const recent = $('#recent-ideas'); if (!recent) return; recent.replaceChildren(); $('#kpi-count').textContent = String(state.ideas.length);
    if (!state.ideas.length) { recent.append(makeElement('div','empty-state','Kitabxana boşdur. Proqnoz laboratoriyasında təhlil etdiyin ideyanı saxla.')); }
    state.ideas.slice(0, 4).forEach(item => { const row = makeElement('div','idea-row'); row.append(makeElement('span','idea-thumb','✳')); const info = makeElement('div','idea-row-main'); info.append(makeElement('strong','',item.title), makeElement('small','',`${item.platform || 'Instagram'} · ${item.format || 'Paylaşım'}`)); const button = makeElement('button','btn btn-outline btn-small','Aç'); button.type='button'; button.dataset.editIdea=item.id; row.append(info,button); recent.append(row); });
    renderLibrary();
  }
  function renderLibrary() {
    const tbody = $('#library-rows'); if (!tbody) return; const query = ($('#library-search')?.value || '').trim().toLocaleLowerCase('az-AZ');
    const shown = state.ideas.filter(item => String(item.title).toLocaleLowerCase('az-AZ').includes(query)); tbody.replaceChildren(); $('#library-count').textContent = `${state.ideas.length} ideya`;
    shown.forEach(item => { const row=document.createElement('tr'); [item.title,item.platform||'Instagram',item.format||'Paylaşım',safeDate(item.createdAt)].forEach(v=>row.append(makeElement('td','',v))); const cell=makeElement('td'), actions=makeElement('div','row-actions'); const use=makeElement('button','btn btn-outline btn-small','İstifadə et'); use.type='button'; use.dataset.editIdea=item.id; const del=makeElement('button','btn btn-outline btn-small','Sil'); del.type='button'; del.dataset.deleteIdea=item.id; actions.append(use,del); cell.append(actions); row.append(cell); tbody.append(row); });
    if (!shown.length) { const row=document.createElement('tr'), cell=makeElement('td','',state.ideas.length?'Axtarışa uyğun ideya tapılmadı.':'Kitabxana boşdur. Analiz nəticəsini və ya öz ideyanı əlavə et.'); cell.colSpan=5; row.append(cell); tbody.append(row); }
  }
  async function saveIdea(title, body = '', platform = 'Instagram', format = 'Paylaşım') {
    try { const result=await api('/api/content',{method:'POST',body:JSON.stringify({title,body,platform,format})}); state.ideas.unshift(result.item); renderIdeas(); toast('İdeya kitabxanada saxlanıldı.'); return true; }
    catch(error){ toast(error.message || 'İdeyanı saxlamaq mümkün olmadı.'); return false; }
  }
  async function deleteIdea(id) { try { await api(`/api/content/${encodeURIComponent(id)}`,{method:'DELETE'}); state.ideas=state.ideas.filter(c=>c.id!==id); renderIdeas(); toast('İdeya silindi.'); } catch(error){toast(error.message);} }
  function useIdea(id) { const item=state.ideas.find(i=>i.id===id); if(!item)return; $('#workspace-content-text').value=item.body||item.title; $('#workspace-platform').value=item.platform||'Instagram'; $('#workspace-char-count').textContent=`${$('#workspace-content-text').value.length} / 6000`; showView('predictor'); toast('İdeya proqnoz laboratoriyasına köçürüldü.'); }

  async function runWorkspaceAnalysis(event) {
    event.preventDefault(); const text=$('#workspace-content-text').value.trim(); if(!text)return toast('Təhlil üçün məzmun daxil et.');
    const button=$('#run-analysis'); button.disabled=true; button.textContent='Analiz edilir…'; $('#workspace-result-title').textContent='Analiz aparılır'; $('#workspace-recommendations').replaceChildren();
    const request={text,platform:$('#workspace-platform').value,sector:$('#workspace-sector').value.trim(),audience:$('#workspace-audience').value.trim(),goal:$('#workspace-goal').value,language:window.SignalI18n?.getLanguage?.()||'az'};
    try {
      const result=await api('/api/analyze',{method:'POST',body:JSON.stringify(request)}); state.lastAnalysis={...result,...request};
      $('#workspace-result-title').textContent=result.title||'Məzmun təhlili hazırdır'; $('#workspace-result-copy').textContent=result.summary||`${request.platform} · ${request.sector||'sahə seçilməyib'}`;
      const score=Number(result.score||0); $('#workspace-score').textContent=Number.isFinite(score)?String(score):'—'; $('#workspace-score-ring').style.setProperty('--score',Math.max(0,Math.min(100,score))); $('#workspace-score-kind').textContent=result.scoreKind||'Məzmun keyfiyyəti'; $('#workspace-score-label').textContent=result.scoreLabel||'Təhlil tamamlandı'; $('#workspace-confidence').textContent=result.confidenceLabel||'Etibarlılıq: ilkin';
      const metrics=$('#workspace-metrics'); metrics.replaceChildren(); const pairs=[['Diqqətçəkən giriş',result.hook],['Oxunaqlılıq',result.readability],['Çağırış / əlaqə',result.engagement]];
      pairs.forEach(([label,value])=>{if(!Number.isFinite(Number(value)))return; const row=makeElement('div','bar-row'); row.append(makeElement('span','',label)); const bar=makeElement('div','progress'),fill=document.createElement('i');fill.style.width=`${Math.max(0,Math.min(100,Number(value)))}%`;bar.append(fill);row.append(bar,makeElement('b','',`${Math.round(Number(value))}`));metrics.append(row);});
      const rec=$('#workspace-recommendations'); (result.recommendations||[]).forEach((message,i)=>{const item=makeElement('div','recommendation-item');item.append(makeElement('span','recommendation-index',String(i+1).padStart(2,'0')),makeElement('p','',message));rec.append(item);});
      $('#workspace-disclaimer').textContent=result.disclaimer||'Bu nəticə gələcək baxış və viral olma zəmanəti deyil. Hesab tarixçəsi yoxdursa, yalnız məzmun quruluşunu qiymətləndirir.'; $('#save-analysis-idea').disabled=false; toast(result.engine==='groq'?'Süni intellekt və məlumat təhlili tamamlandı.':'Qayda əsaslı ilkin təhlil tamamlandı.');
    } catch(error) { $('#workspace-result-title').textContent='Analizi tamamlamaq olmadı'; $('#workspace-result-copy').textContent=error.message; toast(error.message); }
    finally { button.disabled=false; button.textContent='Kontenti analiz et ↗'; }
  }

  function parseCsv(text) {
    const rows=[]; let row=[], field='', quoted=false;
    for(let i=0;i<text.length;i++){const c=text[i]; if(quoted){if(c==='"'&&text[i+1]==='"'){field+='"';i++;}else if(c==='"')quoted=false;else field+=c;}else if(c==='"')quoted=true;else if(c===','){row.push(field);field='';}else if(c==='\n'){row.push(field.replace(/\r$/,''));if(row.some(x=>x.trim()))rows.push(row);row=[];field='';}else field+=c;}
    if(field.length||row.length){row.push(field.replace(/\r$/,''));if(row.some(x=>x.trim()))rows.push(row);} if(rows.length<2)throw new Error('CSV faylında başlıq və ən azı bir məlumat sətri olmalıdır.');
    const headers=rows[0].map(x=>x.trim().toLowerCase().replace(/[\s-]+/g,'_'));
    const index=(names)=>headers.findIndex(h=>names.includes(h));
    const ix={date:index(['date','published_at','publish_date','created_time','timestamp']),platform:index(['platform','network','social_network']),title:index(['title','caption','post','post_title','post_name']),views:index(['views','view_count','video_views','plays','impressions']),likes:index(['likes','like_count']),interactions:index(['interactions','total_interactions','engagements','total_engagements']),er:index(['er','engagement_rate','engagement_rate_percent']),comments:index(['comments','comment_count']),shares:index(['shares','share_count']),saves:index(['saves','saved','save_count'])};
    for(const key of ['date','platform','views'])if(ix[key]<0)throw new Error(`CSV-də “${key}” sütunu tapılmadı. Gözlənən sütunlar: date, platform, post, views və likes və ya interactions.`);
    if(ix.likes<0&&ix.interactions<0)throw new Error('CSV-də “likes” və ya “interactions” sütunu olmalıdır. Ümumi qarşılıqlı əlaqə göstəricisi olan CSV dəstəklənir.');
    const out=[]; for(let r=1;r<rows.length;r++){const cells=rows[r];const n=key=>{if(ix[key]<0)return 0;const raw=String(cells[ix[key]]??'').replace(/[\s,%]/g,'');const v=Number(raw);return Number.isFinite(v)&&v>=0?v:0;};const date=String(cells[ix.date]||'').trim();if(!date)continue; const parsedDate=new Date(date);if(Number.isNaN(parsedDate.getTime()))continue;
      const item={publishedAt:parsedDate.toISOString(),platform:String(cells[ix.platform]||'Other').trim().slice(0,40)||'Other',title:ix.title>=0?String(cells[ix.title]||'').trim().slice(0,300):'',views:n('views'),likes:n('likes'),comments:n('comments'),shares:n('shares'),saves:n('saves')};
      if(ix.interactions>=0)item.interactions=n('interactions');
      if(ix.er>=0)item.sourceEngagementRate=n('er');
      out.push(item); }
    if(!out.length)throw new Error('Oxuna bilən məlumat sətri tapılmadı. Tarix və rəqəm sütunlarını yoxla.'); return out;
  }
  async function importMetrics(file) {
    const status=$('#import-status'); if(!file)return; if(file.size>2*1024*1024){status.textContent='Fayl 2 MB-dan böyükdür. CSV-ni kiçilt və yenidən yüklə.';return;}
    if(!/\.csv$/i.test(file.name)&&file.type!=='text/csv'){status.textContent='Yalnız .csv faylı qəbul edilir.';return;}
    status.textContent='CSV oxunur…';
    try { const entries=parseCsv(await file.text()); const result=await api('/api/metrics/import',{method:'POST',body:JSON.stringify({items:entries})}); status.textContent=`İdxal tamamlandı: ${result.imported} paylaşım. ${result.rejected||0} sətir ötürüldü.`; const data=await api('/api/metrics');state.metrics=data.items||[];renderOverview();renderReport();toast('Statistika import edildi.'); }
    catch(error){status.textContent=error.message||'CSV import edilə bilmədi.';}
  }
  function getPeriodMetrics() { const days=state.reportPeriod==='week'?7:state.reportPeriod==='month'?30:365; const cutoff=Date.now()-days*86400000; return state.metrics.filter(m=>new Date(m.publishedAt||m.date).getTime()>=cutoff); }
  function engagement(m){if(m?.interactions!==null&&m?.interactions!==undefined&&m?.interactions!==''){const total=Number(m.interactions);if(Number.isFinite(total)&&total>=0)return total;}return (Number(m.likes)||0)+(Number(m.comments)||0)+(Number(m.shares)||0)+(Number(m.saves)||0);}
  function renderReport() {
    const items=getPeriodMetrics(), posts=items.length, views=items.reduce((s,m)=>s+(Number(m.views)||0),0), interactions=items.reduce((s,m)=>s+engagement(m),0), rate=views?interactions/views*100:null;
    $('#report-posts').textContent=formatNumber(posts);$('#report-views').textContent=formatNumber(views);$('#report-rate').textContent=rate===null?'—':formatPercent(rate);
    const sorted=[...items].sort((a,b)=>(b.views?engagement(b)/b.views:0)-(a.views?engagement(a)/a.views:0)); const best=sorted[0];$('#report-best').textContent=best?(best.title||best.platform||'Adsız post').slice(0,28):'—';
    const body=$('#report-rows');body.replaceChildren();items.slice().sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt)).slice(0,80).forEach(m=>{const tr=document.createElement('tr');[safeDate(m.publishedAt),m.platform,m.title||'Adsız post',formatNumber(m.views),formatNumber(engagement(m)),m.views?formatPercent(engagement(m)/m.views*100):'—'].forEach(v=>tr.append(makeElement('td','',v)));body.append(tr);});
    if(!items.length){const tr=document.createElement('tr'),td=makeElement('td','','Seçilmiş dövr üçün məlumat tapılmadı. Daha uzun dövr seç və ya CSV import et.');td.colSpan=6;tr.append(td);body.append(tr);}
    const chart=$('#report-chart');chart.replaceChildren(); const insights=$('#report-insights');insights.replaceChildren();
    if(!items.length){chart.append(makeElement('div','metric-empty','Seçilmiş dövr üçün məlumat yoxdur.'));insights.append(makeElement('p','','Hesabat yaratmaq üçün seçilmiş dövrdə post statistikası lazımdır.'));return;}
    const buckets=new Map(); items.forEach(m=>{const d=new Date(m.publishedAt);const key=state.reportPeriod==='week'?d.toLocaleDateString('az-AZ',{weekday:'short'}):state.reportPeriod==='month'?`${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}`:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;const item=buckets.get(key)||{views:0,interactions:0,count:0};item.views+=m.views||0;item.interactions+=engagement(m);item.count++;buckets.set(key,item);});
    const pairs=[...buckets.entries()].sort((a,b)=>a[0].localeCompare(b[0]));const max=Math.max(1,...pairs.map(([,v])=>v.views));const bars=makeElement('div','bar-chart');pairs.slice(-16).forEach(([key,val])=>{const col=makeElement('div','bar-chart-col'),bar=makeElement('div','bar-chart-bar');bar.style.height=`${Math.max(4,val.views/max*100)}%`;bar.title=`${key}: ${formatNumber(val.views)} baxış`;col.append(bar,makeElement('small','',key));bars.append(col);});chart.append(bars,makeElement('div','chart-footnote','Sütunlar seçilmiş dövrdəki real baxış sayını göstərir; intervaldakı postlar cəmlənir.'));
    const addInsight=(title,copy)=>{const el=makeElement('div','insight-card');el.append(makeElement('b','',title),makeElement('p','',copy));insights.append(el);};
    addInsight('Nümunə ölçüsü',`${posts} post analizə daxil edildi. ${posts<10?'Nəticələr kiçik nümunə səbəbindən qeyri-sabit ola bilər.':posts<30?'Trend müşahidəsi mümkündür, lakin proqnoz üçün tarixçə artırılmalıdır.':'Daha geniş tarixçə ilə dövrlər və formatlar arasında müqayisə aparmaq mümkündür.'}`);
    addInsight('Engagement',rate===null?'Baxış sayı olmadığından engagement rate hesablamaq mümkün olmadı.':`Seçilmiş dövr üzrə ümumi engagement rate ${formatPercent(rate)} təşkil edir.`);
    if(best)addInsight('Ən yüksək nisbi engagement',`“${best.title||'Adsız post'}” postu ${best.views?formatPercent(engagement(best)/best.views*100):'—'} engagement rate göstərib (${best.platform}, ${safeDate(best.publishedAt)}).`);
    if(posts>=2){const byPlatform=new Map();items.forEach(m=>{const p=byPlatform.get(m.platform)||{views:0,interactions:0,count:0};p.views+=m.views||0;p.interactions+=engagement(m);p.count++;byPlatform.set(m.platform,p);});const sortedP=[...byPlatform.entries()].filter(([,p])=>p.views>0).sort((a,b)=>b[1].interactions/b[1].views-a[1].interactions/a[1].views);if(sortedP.length>1)addInsight('Platforma müqayisəsi',`${sortedP[0][0]} bu datada daha yüksək engagement rate göstərib (${formatPercent(sortedP[0][1].interactions/sortedP[0][1].views*100)}). Müxtəlif auditoriya ölçülərini və kontent növlərini nəzərə al.`);}
  }
  function selectedPeriodButton(button){$$('#report-periods [data-period]').forEach(el=>el.classList.toggle('is-selected',el===button));state.reportPeriod=button.dataset.period;renderReport();}
  function csvEscape(value){const str=String(value??'');return /[",\r\n]/.test(str)?`"${str.replace(/"/g,'""')}"`:str;}
  function downloadReport(){const rows=getPeriodMetrics();if(!rows.length)return toast('İxrac üçün real məlumat yoxdur.');const headers=['date','platform','title','views','likes','comments','shares','saves','interactions','engagement_rate'];const lines=[headers.join(',')];rows.forEach(m=>lines.push([m.publishedAt,m.platform,m.title,m.views,m.likes,m.comments,m.shares,m.saves,engagement(m),m.views?engagement(m)/m.views*100:0].map(csvEscape).join(',')));const blob=new Blob(['\ufeff'+lines.join('\r\n')],{type:'text/csv;charset=utf-8;'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`signal-studio-${state.reportPeriod}-report.csv`;a.click();URL.revokeObjectURL(a.href);}

  async function loadTrends() {
    const status=$('#trend-message'),button=$('#refresh-trends');button.disabled=true;button.textContent='Yoxlanılır…';status.textContent='Trend mənbəyinə sorğu göndərilir…';$('#trend-source-status').textContent='Yüklənir';
    const query=$('#trend-query').value.trim(),geo=$('#trend-region').value,sector=$('#trend-sector').value;
    try { const result=await api(`/api/trends?geo=${encodeURIComponent(geo)}&q=${encodeURIComponent(query)}&sector=${encodeURIComponent(sector)}`);state.trends=result.items||[];$('#trend-source-status').textContent=result.sourceLabel||'Canlı mənbə';$('#trend-source-status').classList.toggle('status-error',!result.live);status.textContent=result.message||`${state.trends.length} nəticə alındı. Məlumat yenilənməsi: ${result.fetchedAt?new Date(result.fetchedAt).toLocaleString('az-AZ'):'—'}.`;
      renderTrends(result);
    } catch(error){state.trends=[];$('#trend-source-status').textContent='Mənbə əlçatan deyil';status.textContent=error.message;renderTrends({items:[],live:false});}
    finally{button.disabled=false;button.textContent='Aktual trendləri yoxla ↗';}
  }
  function renderTrends(result={}) {
    const list=$('#trend-list');list.replaceChildren(); if(!state.trends.length){const empty=makeElement('div','metric-empty');empty.append(makeElement('span','trend-empty-icon','⌁'),makeElement('b','',result.live?'Bu filtr üzrə nəticə tapılmadı':'Canlı trend məlumatı hazırda yoxdur'),makeElement('p','',result.live?'Başqa açar söz və ya region seç.':'Sayt canlı məlumatı uydurmur. Şəbəkə bağlantısını yoxla və ya daha sonra yenidən cəhd et. Google Trends axtarış marağı sosial media engagement-i əvəz etmir.'));list.append(empty);return;}
    state.trends.forEach((trend,index)=>{const card=makeElement('article','trend-card');const top=makeElement('div','trend-card-top');top.append(makeElement('span','trend-rank',String(index+1).padStart(2,'0')),makeElement('span','trend-traffic',trend.traffic||trend.category||'Google Trends'));card.append(top,makeElement('h3','',trend.title),makeElement('p','',trend.description||'Trend başlığı mənbədən götürülüb; əlavə şərh üçün kontekst yoxlanmalıdır.'));const footer=makeElement('div','trend-card-footer');if(trend.url){const link=makeElement('a','text-button','Mənbəni aç ↗');link.href=trend.url;link.target='_blank';link.rel='noopener noreferrer';footer.append(link);}const save=makeElement('button','btn btn-outline btn-small','İdeya kimi saxla +');save.type='button';save.addEventListener('click',()=>saveIdea(trend.title,`Trend mənbəyi: ${trend.url||'Google Trends'}. ${trend.description||''}`,'Instagram','Trend ideyası'));footer.append(save);card.append(footer);list.append(card);});
  }

  async function analyzeVideo() {
    const file=$('#video-file').files?.[0]; const status=$('#video-analysis-status');
    if(!file){toast('Əvvəlcə MP4 və ya MOV video seç.');return;}
    if(file.size>500*1024*1024){status.textContent='Video 500 MB limitini keçir.';return;}
    if(!/\.(mp4|mov)$/i.test(file.name)){status.textContent='Yalnız MP4 və MOV faylları dəstəklənir.';return;}
    const button=$('#analyze-video');button.disabled=true;button.textContent='Hazırlanır…';status.textContent='Video analiz mühiti yoxlanılır…';
    try{
      const capability=await api('/api/video/status');
      if(!capability.aiConfigured)throw new Error('Video üçün süni intellekt xidməti qoşulmayıb. Serverin GROQ_API_KEY konfiqurasiyasını yoxla; Go/Pro planı təkbaşına AI açarını təmin etmir.');
      if(!capability.ffmpegAvailable)throw new Error('Video emalı üçün FFmpeg tapılmadı. START-SIGNAL-STUDIO.bat faylını yenidən işə sal və ya FFmpeg quraşdırmasını yoxla.');
      status.textContent=`${file.name} (${(file.size/1024/1024).toFixed(1)} MB) serverə göndərilir və emal edilir. Bu pəncərəni bağlama.`;
      const response=await fetch(`/api/video/analyze?filename=${encodeURIComponent(file.name)}`,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/octet-stream','X-UI-Language':window.SignalI18n?.getLanguage?.()||'az','X-Video-Platform':$('#workspace-platform').value,'X-Video-Sector':$('#workspace-sector').value.trim(),'X-Video-Audience':$('#workspace-audience').value.trim(),'X-Video-Goal':$('#workspace-goal').value},body:file});
      const result=await response.json().catch(()=>({ok:false,message:'Server cavabını oxumaq olmadı.'}));if(!response.ok||result.ok===false)throw new Error(result.message||'Video analizi alınmadı.');
      state.lastVideoAnalysis={...result,text:`Video: ${file.name}\n${result.transcript||''}`,platform:$('#workspace-platform').value};
      $('#video-analysis-results').classList.remove('hidden');
      $('#video-result-title').textContent=result.title||'Video analizi tamamlandı';$('#video-result-copy').textContent=result.summary||`${file.name} · ${result.frameCount||0} kadr`;
      $('#video-score').textContent=String(result.score??'—');$('#video-score-ring').style.setProperty('--score',Math.max(0,Math.min(100,Number(result.score)||0)));$('#video-score-kind').textContent=result.scoreKind||'Video keyfiyyət balı';$('#video-score-label').textContent=result.scoreLabel||'Kreativ struktur qiymətləndirildi';$('#video-confidence').textContent=result.confidenceLabel||'Gələcək performans proqnozu deyil';
      const metrics=$('#video-metrics');metrics.replaceChildren();[['Diqqətçəkən giriş',result.hook],['Vizual aydınlıq',result.readability],['Montaj / temp',result.engagement],['Ekran mətni',result.onScreenText]].forEach(([label,value])=>{if(value===null||value===undefined||!Number.isFinite(Number(value)))return;const row=makeElement('div','bar-row');row.append(makeElement('span','',label));const bar=makeElement('div','progress'),fill=document.createElement('i');fill.style.width=`${Math.max(0,Math.min(100,Number(value)))}%`;bar.append(fill);row.append(bar,makeElement('b','',String(Math.round(Number(value)))));metrics.append(row);});
      const rec=$('#video-recommendations');rec.replaceChildren();(result.recommendations||[]).forEach((message,i)=>{const item=makeElement('div','recommendation-item');item.append(makeElement('span','recommendation-index',String(i+1).padStart(2,'0')),makeElement('p','',message));rec.append(item);});if(result.transcript){const transcript=makeElement('div','insight-card');transcript.append(makeElement('b','','Videodan tanınan danışıq mətni'),makeElement('p','',result.transcript));rec.append(transcript);}
      $('#video-disclaimer').textContent=result.disclaimer||'Video icmalı gələcək baxış və viral olma zəmanəti deyil.';$('#save-video-analysis-idea').disabled=false;status.textContent=`Tamamlandı: ${result.frameCount||0} kadr analiz olundu${result.audioAnalyzed?' və audio transkripsiyası alındı':''}. Yüklənmiş video emaldan sonra silindi.`;$('#video-analysis-results').scrollIntoView({behavior:'smooth',block:'start'});toast('Video analizi tamamlandı.');
    }catch(error){status.textContent=error.message||'Video analizində xəta baş verdi.';toast(error.message||'Video analizində xəta baş verdi.');}
    finally{button.disabled=false;button.textContent='Videonu analiz et ↗';}
  }

  async function tailorTrends(){const button=$('#tailor-trends'),container=$('#niche-recommendations');button.disabled=true;button.textContent='Süni intellekt tövsiyə hazırlayır…';container.replaceChildren();try{const result=await api('/api/trends/recommend',{method:'POST',body:JSON.stringify({geo:$('#trend-region').value,sector:$('#trend-sector').value,audience:$('#workspace-audience')?.value.trim()||'',platform:$('#workspace-platform')?.value||'Instagram'})});const items=result.recommendations||[];if(!items.length)throw new Error('Süni intellekt konkret tövsiyə vermədi. Yenidən cəhd et.');items.forEach((idea,i)=>{const card=makeElement('article','niche-idea-card');card.append(makeElement('span','status-tag',`Trend əsası: ${idea.trendTitle||'Live trend'}`),makeElement('h3','',idea.contentAngle||'Kontent bucağı'));if(idea.fitRationale)card.append(makeElement('p','',idea.fitRationale));if(idea.hook)card.append(makeElement('p','niche-hook',`Hook: “${idea.hook}”`));if(idea.cta)card.append(makeElement('p','',`CTA: ${idea.cta}`));const foot=makeElement('footer');foot.append(makeElement('span','quiet-note',`Format: ${idea.format||'Paylaşım'}`));const save=makeElement('button','btn btn-outline btn-small','Kitabxanaya saxla +');save.type='button';save.addEventListener('click',()=>saveIdea(idea.contentAngle||idea.trendTitle,`Trend başlığı: ${idea.trendTitle||''}\nHook: ${idea.hook||''}\nCTA: ${idea.cta||''}\nSəbəb: ${idea.fitRationale||''}`,$('#workspace-platform')?.value||'Instagram',idea.format||'Trend ideyası'));foot.append(save);card.append(foot);container.append(card);});container.scrollIntoView({behavior:'smooth',block:'nearest'});}
    catch(error){container.append(makeElement('div','status-message',error.message));}finally{button.disabled=false;button.textContent='Trendləri nişimə uyğunlaşdır (AI) ✳';}}

  async function fillBusinessProfile(profile){if(!profile)return;$('#business-name').value=profile.businessName||'';$('#business-type').value=profile.businessType||state.user.profileType||'company';$('#business-sector').value=profile.sector||'';$('#business-bio').value=profile.bio||'';$('#business-public').checked=Boolean(profile.isPublic);}
  async function saveBusinessProfile(event){event.preventDefault();const payload={businessName:$('#business-name').value.trim(),businessType:$('#business-type').value,sector:$('#business-sector').value.trim(),bio:$('#business-bio').value.trim(),isPublic:$('#business-public').checked};try{const result=await api('/api/business-profile',{method:'POST',body:JSON.stringify(payload)});state.businessProfile=result.profile;$('#business-profile-status').textContent='Profil saxlanıldı.';toast('Əməkdaşlıq profilin yeniləndi.');if(payload.isPublic)void loadPartners();}catch(error){$('#business-profile-status').textContent=error.message;}}
  async function loadPartners(){const target=$('#partner-directory');if(!target)return;target.replaceChildren(makeElement('p','quiet-note','Əməkdaşlıq profilləri yüklənir…'));try{const result=await api('/api/partners');target.replaceChildren();if(!result.items?.length){const empty=makeElement('div','metric-empty');empty.append(makeElement('span','','♧'),makeElement('b','','Hazırda açıq profil yoxdur'),makeElement('p','','Öz profilini açıq et; digər istifadəçilər razılıq verdikdə burada görünəcəklər.'));target.append(empty);return;}result.items.forEach(person=>{const card=makeElement('article','partner-card');const avatar=makeElement('span','partner-avatar',firstInitial(person.businessName||person.name));const main=makeElement('div','partner-card-main');main.append(makeElement('b','',person.businessName||person.name),makeElement('span','',`${profileLabels[person.businessType]||profileLabels[person.profileType]||'İştirakçı'} · ${person.sector||'Sahə qeyd edilməyib'}`),makeElement('p','',person.bio||'Əməkdaşlıq üçün açıq profil.'));const right=makeElement('div','partner-card-action');right.append(makeElement('span','status-tag','Pulsuz icma'));card.append(avatar,main,right);target.append(card);});}catch(error){target.replaceChildren(makeElement('p','quiet-note',error.message));}}
  async function loadRewards(){if(!state.user)return;try{const result=await api('/api/rewards');state.rewards=result;$('#reward-points').innerHTML=`${formatNumber(result.points||0)} <small>bal</small>`;$('#reward-tier').textContent=(result.points||0)>=500?'İcma üzvü':(result.points||0)>=100?'Aktiv dəvətçi':'Başlanğıc';$('#reward-clicks').textContent=formatNumber(result.clicks||0);$('#reward-accepted').textContent=formatNumber(result.accepted||0);$('#reward-earned').textContent=formatNumber(result.earned||0);const url=new URL(location.origin+location.pathname);url.searchParams.set('ref',result.referralCode||'');$('#referral-link').value=url.toString();const history=$('#reward-history');history.replaceChildren();if(!(result.recent||[]).length)history.append(makeElement('p','','Hələ tamamlanmış dəvət yoxdur. Linkini komanda və partnyorlarla paylaş.'));else result.recent.forEach(entry=>{const row=makeElement('div','insight-card');row.append(makeElement('b','',entry.name||'Təsdiqlənmiş dəvət'),makeElement('p','',`${safeDate(entry.verifiedAt)} · +${entry.points||100} bal`));history.append(row);});}catch(error){toast(error.message);}}
  const SCRAPE_PLATFORM_COPY = {
    instagram: { label: 'Instagram istifadəçi adı, profil və ya Reel keçidi', placeholder: '@istifadəçi və ya https://www.instagram.com/istifadəçi/', help: 'Public Reels/profil məlumatları. Private hesabın şəxsi Insights datası deyil.' },
    facebook: { label: 'Facebook public Page URL-i', placeholder: 'https://www.facebook.com/nasa/', help: 'Yalnız açıq Facebook Pages. Şəxsi profilə və bağlı qruplara giriş deyil.' },
    tiktok: { label: 'TikTok istifadəçi adı və ya profil keçidi', placeholder: '@istifadəçi və ya https://www.tiktok.com/@istifadəçi', help: 'Açıq video paylaşımları. Qapalı hesab məlumatları və şəxsi təhlil deyil.' },
    youtube: { label: 'YouTube kanal adı, @handle və ya URL', placeholder: '@nasa və ya https://www.youtube.com/@nasa', help: 'Kanalın public Shorts məlumatları: title, views, likes, comments və tarix.' },
    linkedin: { label: 'LinkedIn mövzu və ya açar söz axtarışı', placeholder: 'səhiyyə marketinqi və ya şəxsi brend', help: 'Açıq paylaşım axtarışı. LinkedIn şəxsi hesabının daxili statistikası deyil.' }
  };
  function updateScrapePlatformCopy() {
    const platform = $('#scrape-platform')?.value || 'instagram'; const copy = SCRAPE_PLATFORM_COPY[platform];
    if (!copy) return;
    $('#scrape-target-label').textContent = copy.label;
    $('#scrape-target').placeholder = copy.placeholder;
    $('#scrape-target-help').textContent = copy.help;
  }
  async function loadApifyStatus() {
    const pill = $('#apify-status-pill'); const status = $('#scrape-status');
    if (!pill) return;
    try {
      const config = await api('/api/config'); state.config = { ...state.config, ...config };
      const configured = Boolean(config.apifyConfigured);
      pill.textContent = configured ? 'Bağlantı aktivdir' : 'Mənbə əlçatan deyil';
      pill.classList.toggle('status-connected', configured); pill.classList.toggle('status-disconnected', !configured);
      ['instagram','facebook','tiktok','youtube','linkedin'].forEach(platform => {
        const node = $(`#connector-status-${platform}`); if (node) node.textContent = platform === 'instagram' ? 'Reels' : platform === 'facebook' ? 'Səhifələr' : platform === 'tiktok' ? 'Videolar' : platform === 'youtube' ? 'Shorts' : 'Axtarış';
      });
      if (status && !status.dataset.hasResults) status.textContent = configured ? 'Sorğuya başlamağa hazırsan.' : 'Məlumat mənbəyi hazırda əlçatan deyil.';
      loadSettingsIntegrations();
    } catch (error) { pill.textContent = 'Bağlantı yoxlanmadı'; if (status) status.textContent = error.message; }
  }
  function fmtDuration(seconds) {
    const value = Number(seconds); if (!Number.isFinite(value) || value <= 0) return '';
    return `${Math.floor(value / 60)}:${String(Math.round(value % 60)).padStart(2, '0')}`;
  }
  function isTrustedMediaUrl(value) {
    try { const u = new URL(value); return u.protocol === 'https:' && /(^|\.)(cdninstagram\.com|fbcdn\.net|instagram\.com|facebook\.com|ytimg\.com|youtube\.com|licdn\.com|linkedin\.com|tiktokcdn\.com|tiktok\.com|googleusercontent\.com)$/i.test(u.hostname); }
    catch { return false; }
  }
  function renderScrapeResults(items) {
    const root = $('#scrape-results'); if (!root) return; root.replaceChildren();
    const list = Array.isArray(items) ? items : [];
    if (!list.length) {
      const empty = makeElement('div', 'metric-empty'); empty.append(makeElement('span', '', '◎'), makeElement('b', '', 'Mənbə nəticə qaytarmadı'), makeElement('p', '', 'Profilin public olduğuna, URL/açar sözün düzgünlüyünə və Apify Actor girişinin işlədiyinə əmin ol.')); root.append(empty); return;
    }
    list.forEach((item, index) => {
      const detail = item.details || {}; const card = makeElement('article', 'scrape-result-card');
      const head = makeElement('div', 'scrape-result-head');
      const identity = makeElement('div', 'scrape-result-identity');
      identity.append(makeElement('span', 'scrape-result-index', String(index + 1).padStart(2, '0')));
      const titles = makeElement('div'); titles.append(makeElement('h3', '', item.title || `${item.platform || 'Sosial şəbəkə'} paylaşımı`));
      const author = detail.author ? `@${detail.author.replace(/^@/, '')}` : (item.platform || 'Public post');
      titles.append(makeElement('small', '', `${author} · ${safeDate(item.publishedAt)}`)); identity.append(titles); head.append(identity);
      if (detail.url) { const link = makeElement('a', 'text-button', 'Mənbəni aç ↗'); link.href = detail.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; head.append(link); }
      card.append(head);
      if (detail.thumbnailUrl && isTrustedMediaUrl(detail.thumbnailUrl)) { const image = makeElement('img', 'scrape-result-thumb'); image.src = detail.thumbnailUrl; image.alt = `${item.platform || 'Sosial platforma'} kontentinin miniatürü`; image.loading = 'lazy'; image.referrerPolicy = 'no-referrer'; image.addEventListener('error', () => image.remove(), { once: true }); card.append(image); }
      const caption = (detail.caption || item.title || '').trim(); if (caption) card.append(makeElement('p', 'scrape-result-caption', caption.length > 520 ? `${caption.slice(0, 520)}…` : caption));
      const statGrid = makeElement('div', 'scrape-stat-grid');
      [['◉', 'Baxış', item.views ?? detail.views], ['♥', 'Bəyənmə', item.likes ?? detail.likes], ['↳', 'Şərh', item.comments ?? detail.comments], ['⟳', 'Paylaşım', item.shares ?? detail.shares]].forEach(([glyph, label, value]) => {
        const stat = makeElement('div', 'scrape-stat'); stat.append(makeElement('span', '', glyph), makeElement('small', '', label), makeElement('b', '', value === null || value === undefined ? '—' : formatNumber(value))); statGrid.append(stat);
      }); card.append(statGrid);
      const metadata = makeElement('div', 'scrape-result-meta');
      if (detail.durationSeconds) metadata.append(makeElement('span', 'scrape-meta-chip', `▶ ${fmtDuration(detail.durationSeconds)}`));
      (detail.hashtags || []).slice(0, 8).forEach(tag => metadata.append(makeElement('span', 'scrape-meta-chip', `#${tag}`)));
      if (detail.type) metadata.append(makeElement('span', 'scrape-meta-chip', detail.type));
      if (metadata.childNodes.length) card.append(metadata);
      if (detail.transcript) { const transcript = makeElement('details', 'scrape-transcript'); transcript.append(makeElement('summary', '', 'Transkriptə bax')); transcript.append(makeElement('p', '', detail.transcript.slice(0, 5000))); card.append(transcript); }
      if (item.sourceData && typeof item.sourceData === 'object') {
        const raw = makeElement('details', 'scrape-source-data'); raw.append(makeElement('summary', '', 'Actor-dan gələn əlavə məlumatlara bax'));
        const pre = makeElement('pre', 'scrape-source-json', JSON.stringify(item.sourceData, null, 2).slice(0, 18000)); raw.append(pre);
        raw.append(makeElement('small', 'scrape-source-note', 'Mənbə JSON-u ölçüyə nəzarət üçün dərinlik, element və mətn limitləri ilə saxlanılır. Tam normallaşdırılmış nəticəni JSON kimi endir.')); card.append(raw);
      }
      if (item.source) card.append(makeElement('small', 'scrape-source-note', `Mənbə: ${item.source} · açıq kontent`));
      root.append(card);
    });
  }
  function renderScrapeKpis(items) {
    const root = $('#scrape-kpis'); if (!root) return; root.replaceChildren(); const list = Array.isArray(items) ? items : [];
    const views = list.reduce((sum, row) => sum + Number(row.views || 0), 0);
    const interactions = list.reduce((sum, row) => sum + Number(row.likes || 0) + Number(row.comments || 0) + Number(row.shares || 0), 0);
    const values = [['Alınan nəticələr', formatNumber(list.length)], ['Ümumi baxış', formatNumber(views)], ['Ümumi əlaqə', formatNumber(interactions)], ['Orta qarşılıqlı əlaqə', views ? formatPercent(interactions / views * 100) : '—']];
    values.forEach(([label, value]) => { const card = makeElement('article', 'scrape-kpi-card'); card.append(makeElement('small', '', label), makeElement('strong', '', value)); root.append(card); });
  }
  async function runPublicScrape(event) {
    event.preventDefault();
    if (!state.user) { openAuth('login'); return; }
    if (!['go','pro'].includes(String(state.user.plan || 'free').toLowerCase())) { showView('billing'); const status = $('#billing-status'); if (status) status.textContent = 'Platformadan məzmun gətirilməsi Go planından başlayaraq mövcuddur.'; return; }
    if (!$('#scrape-cost-consent').checked) { $('#scrape-status').textContent = 'Davam etmək üçün Apify istifadəsinin hesabından kredit sərf edə biləcəyini təsdiqlə.'; return; }
    const button = $('#run-scrape'); const status = $('#scrape-status'); const platform = $('#scrape-platform').value;
    const target = $('#scrape-target').value.trim(); if (!target) { status.textContent = 'Profil/kanal və ya axtarış sözünü daxil et.'; return; }
    button.disabled = true; button.textContent = 'Məlumatlar gətirilir…'; status.dataset.hasResults = '';
    status.textContent = 'Apify Actor başladılır. Bu, seçilən nəticə sayından asılı olaraq bir neçə dəqiqə çəkə bilər.';
    try {
      if (state.config.apifyConfigured === false) await loadApifyStatus();
      const result = await api('/api/integrations/scrape', { method: 'POST', body: JSON.stringify({ platform, target, limit: Number($('#scrape-limit').value), includeTranscript: $('#scrape-include-transcript').checked }) });
      state.scrapeItems = result.items || []; state.scrapeTarget = target; state.scrapePlatform = platform; status.dataset.hasResults = '1';
      status.textContent = `${result.resultCount || 0} kontent alındı · ${result.imported || 0} yeni metrik hesabat bazasına əlavə olundu · ${result.duplicates || 0} təkrar buraxıldı. Mənbə: ${result.sourceLabel || 'Apify'} · ${safeDate(result.fetchedAt)}. ${result.rawDataDisclaimer || ''}`;
      renderScrapeResults(state.scrapeItems); renderScrapeKpis(state.scrapeItems);
      ['export-scrape-json','export-scrape-csv','scrape-to-reports'].forEach(id => { const b = $(`#${id}`); if (b) b.disabled = !state.scrapeItems.length; });
      try { const metricsResult = await api('/api/metrics'); state.metrics = metricsResult.items || []; renderOverview(); renderReport(); loadSettingsIntegrations(); } catch { /* scrape result is still visible even if metrics refresh fails */ }
      toast(`${state.scrapeItems.length} nəticə gətirildi.`);
    } catch (error) { status.textContent = error.message || 'Apify sorğusu alınmadı.'; status.dataset.hasResults = ''; toast(error.message || 'Apify sorğusu alınmadı.'); }
    finally { button.disabled = false; button.innerHTML = 'Məlumatları gətir <span>↗</span>'; }
  }
  function downloadScrapeJson() {
    if (!state.scrapeItems.length) return toast('Əvvəlcə Apify nəticəsi gətir.');
    const blob = new Blob([JSON.stringify({ fetchedAt: new Date().toISOString(), platform: state.scrapePlatform, target: state.scrapeTarget, items: state.scrapeItems }, null, 2)], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `signal-studio-${state.scrapePlatform}-data.json`; a.click(); URL.revokeObjectURL(a.href);
  }
  function downloadScrapeCsv() {
    if (!state.scrapeItems.length) return toast('Əvvəlcə Apify nəticəsi gətir.');
    const headers = ['published_at','platform','author','title','url','views','likes','comments','shares','duration_seconds','hashtags','caption','transcript'];
    const lines = [headers.join(',')];
    state.scrapeItems.forEach(item => { const d = item.details || {}; const vals = [item.publishedAt, item.platform, d.author, item.title, d.url, item.views, item.likes, item.comments, item.shares, d.durationSeconds, (d.hashtags || []).join(' '), d.caption, d.transcript]; lines.push(vals.map(csvEscape).join(',')); });
    const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `signal-studio-${state.scrapePlatform}-data.csv`; a.click(); URL.revokeObjectURL(a.href);
  }
  async function loadSettingsIntegrations(){const list=$('#integration-status-list');if(!list)return;list.replaceChildren();const items=[['Süni intellekt təhlili',state.config.groqConfigured?'Aktiv':'Hazırda əlçatan deyil'],['Video analizi',state.config.groqConfigured?'Süni intellektlə video təhlili':'Video emalı'],['Məzmun mənbələri',state.config.apifyConfigured?'Bağlantı aktivdir':'Bağlantı aktiv deyil'],['Trend axtarışı','Sorğu zamanı yoxlanılır'],['Paylaşım tarixçəsi',`${state.metrics.length} göstərici sətri`]];items.forEach(([title,detail])=>{const row=makeElement('div','integration-row');row.append(makeElement('span','',title),makeElement('small','',detail));list.append(row);});}

  const CHAT_LIMITS = { free: 10, go: 100, pro: 400 };
  function updateBillingIdentity() {
    const plan = String(state.user?.plan || 'free').toLowerCase();
    const names = { free: 'Pulsuz plan', go: 'Go planı', pro: 'Pro planı' };
    const label = $('#billing-current-plan'); if (label) label.textContent = names[plan] || names.free;
    updateFeatureGates();
    $$('.billing-plan-card').forEach(card => {
      const active = card.dataset.planCard === plan;
      card.classList.toggle('is-current', active);
      const button = card.querySelector('[data-plan-action]');
      if (button && active) { button.textContent = 'Cari plan'; button.disabled = true; }
      else if (button) button.disabled = false;
    });
  }
  async function loadBilling() {
    const status = $('#billing-status');
    try {
      const result = await api('/api/billing/status'); state.billing = result;
      state.user = { ...state.user, plan: result.plan || 'free' }; updateBillingIdentity();
      if (status) status.textContent = result.stripeConfigured ? 'Ödəniş sistemi aktivdir.' : 'Planlar görünür; ödəniş mərhələsi hazırda əlçatan deyil.';
    } catch (error) { if (status) status.textContent = error.message; }
  }
  async function startCheckout(plan) {
    if (!['go','pro'].includes(plan)) return;
    const status = $('#billing-status'); const buttons = $$('[data-plan-action]'); buttons.forEach(b => b.disabled = true);
    if (status) status.textContent = 'Təhlükəsiz ödəniş səhifəsi açılır…';
    try {
      const result = await api('/api/billing/checkout', { method: 'POST', body: JSON.stringify({ plan }) });
      if (!result.url || !/^https:\/\//i.test(result.url)) throw new Error('Ödəniş səhifəsi yaradıla bilmədi.');
      location.assign(result.url);
    } catch (error) { if (status) status.textContent = error.message || 'Ödəniş başlatmaq mümkün olmadı.'; buttons.forEach(b => b.disabled = false); updateBillingIdentity(); }
  }
  async function manageBilling() {
    const status = $('#billing-status'); const button = $('#manage-billing'); if (button) button.disabled = true;
    try { const result = await api('/api/billing/portal', { method: 'POST', body: '{}' }); if (!result.url || !/^https:\/\//i.test(result.url)) throw new Error('Ödəniş səhifəsi açıla bilmədi.'); location.assign(result.url); }
    catch (error) { if (status) status.textContent = error.message || 'Abunəliyi idarə etmək mümkün olmadı.'; if (button) button.disabled = false; }
  }
  function appendChatMessage(role, text, list = $('#assistant-messages')) {
    if (!list) return;
    const isUser = role === 'user';
    const buddy = getBuddyProfile();
    const article = makeElement('article', `assistant-message ${isUser ? 'assistant-message-user' : 'assistant-message-ai'}`);
    const avatarNode = makeElement('span', 'assistant-message-avatar', isUser ? firstInitial(state.user?.name) : '');
    if (!isUser) { avatarNode.innerHTML = buddyAvatarSvg(buddy.avatar); avatarNode.classList.add('has-custom-avatar'); }
    article.append(avatarNode);
    const content = makeElement('div');
    const label = makeElement('b', '', isUser ? (state.user?.name || 'Sən') : buddy.name);
    if (!isUser) label.dataset.buddyName = '';
    content.append(label);
    const p = makeElement('p', '', text); content.append(p); article.append(content); list.append(article); list.scrollTop = list.scrollHeight; return article;
  }
  async function sendAssistantMessage(message, surface = 'page') {
    const clean = String(message || '').trim(); if (!clean) return;
    if (!state.user) { openAuth('login'); return; }
    const floating = surface === 'floating';
    const list = floating ? $('#signal-chat-messages') : $('#assistant-messages');
    const send = floating ? $('#signal-chat-send') : $('#assistant-send');
    const input = floating ? $('#signal-chat-input') : $('#assistant-input');
    appendChatMessage('user', clean, list); state.chatHistory.push({ role: 'user', content: clean });
    send.disabled = true; input.disabled = true; send.textContent = '…';
    const pending = appendChatMessage('assistant', 'Cavab hazırlanır…', list); pending?.classList.add('is-pending');
    try {
      const result = await api('/api/ai/chat', { method: 'POST', body: JSON.stringify({ message: clean, history: state.chatHistory.slice(-12), language: window.SignalI18n?.getLanguage?.() || 'az' }) });
      const answer = String(result.reply || '').trim() || 'Bu suala cavab hazırlamaq mümkün olmadı.';
      pending?.remove(); appendChatMessage('assistant', answer, list); state.chatHistory.push({ role: 'assistant', content: answer });
      if (state.chatHistory.length > 16) state.chatHistory = state.chatHistory.slice(-16);
      const usage = $('#assistant-usage'); if (usage) usage.textContent = `Bu gün ${result.used || 0} / ${result.limit || CHAT_LIMITS[state.user?.plan || 'free']} mesaj istifadə edilib`;
    } catch (error) { pending?.remove(); appendChatMessage('assistant', error.message || 'Süni intellekt cavab verə bilmədi. Bir daha cəhd et.', list); }
    finally { send.disabled = false; input.disabled = false; send.textContent = '↗'; input.focus(); }
  }
  function mountFloatingAssistant() {
    if ($('#signal-chat-widget')) return;
    const widget = document.createElement('div'); widget.id = 'signal-chat-widget'; widget.className = 'signal-chat-widget';
    widget.innerHTML = `
      <button type="button" class="signal-chat-launcher" id="signal-chat-launcher" aria-label="Süni intellekt köməkçisini aç" aria-expanded="false" aria-controls="signal-chat-panel">
        <span class="signal-chat-mascot" aria-hidden="true" data-buddy-avatar-display>🦊</span><span class="signal-chat-launcher-copy"><b data-buddy-name>Mimo</b><small>İdeya dostun · birlikdə yaradaq</small></span><span class="signal-chat-unread" aria-hidden="true">•</span>
      </button>
      <section class="signal-chat-panel hidden" id="signal-chat-panel" role="dialog" aria-label="Signal süni intellekt köməkçisi">
        <header class="signal-chat-head"><span class="signal-chat-mascot" aria-hidden="true" data-buddy-avatar-display>🦊</span><div><b data-buddy-name>Mimo</b><small><i></i> Hazırdır · Azərbaycan dilində danış</small></div><button type="button" id="signal-chat-close" class="signal-chat-close" aria-label="Söhbəti bağla">×</button></header>
        <div class="signal-chat-messages" id="signal-chat-messages" role="log" aria-live="polite"><article class="assistant-message assistant-message-ai"><span class="assistant-message-avatar" data-buddy-avatar-display>🦊</span><div><b data-buddy-name>Mimo</b><p>Salam! ✨ Mətnini yaxşılaşdırmaq, video ssenarisi qurmaq və ya kontent planı hazırlamaq üçün mənə yaz.</p></div></article></div>
        <div class="signal-chat-prompts"><button type="button" data-float-prompt="Paylaşımım üçün 3 diqqətçəkən giriş cümləsi hazırla.">💡 Giriş fikirləri</button><button type="button" data-float-prompt="Bu həftə üçün 5 paylaşım ideyası və qısa plan hazırla.">🗓 Həftəlik plan</button></div>
        <form id="signal-chat-form" class="signal-chat-compose"><textarea id="signal-chat-input" maxlength="4000" rows="2" placeholder="Sualını buraya yaz..." aria-label="Mesajın" required></textarea><button type="submit" id="signal-chat-send" aria-label="Mesajı göndər">↗</button></form>
        <div class="signal-chat-foot">Şəxsi məlumatlarını yazmamağa çalış.</div>
      </section>`;
    document.body.append(widget);
    syncBuddyUI();
    const launcher = $('#signal-chat-launcher'), panel = $('#signal-chat-panel');
    launcher.addEventListener('click', () => { const open = panel.classList.toggle('hidden') === false; widget.classList.toggle('is-open', open); launcher.setAttribute('aria-expanded', String(open)); launcher.classList.toggle('is-open', open); $('#signal-chat-unread')?.classList.add('hidden'); if (open) $('#signal-chat-input').focus(); });
    $('#signal-chat-close').addEventListener('click', () => { panel.classList.add('hidden'); widget.classList.remove('is-open'); launcher.setAttribute('aria-expanded', 'false'); launcher.classList.remove('is-open'); launcher.focus(); });
    $('#signal-chat-form').addEventListener('submit', event => { event.preventDefault(); const input = $('#signal-chat-input'); const message = input.value.trim(); if (!message) return; if (!state.user) { panel.classList.add('hidden'); widget.classList.remove('is-open'); launcher.setAttribute('aria-expanded', 'false'); launcher.classList.remove('is-open'); openAuth('login'); return; } input.value = ''; void sendAssistantMessage(message, 'floating'); });
    $$('[data-float-prompt]').forEach(button => button.addEventListener('click', () => { const input = $('#signal-chat-input'); input.value = button.dataset.floatPrompt || ''; input.focus(); }));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.classList.contains('hidden')) { panel.classList.add('hidden'); widget.classList.remove('is-open'); launcher.setAttribute('aria-expanded', 'false'); launcher.classList.remove('is-open'); launcher.focus(); } });
  }
  mountFloatingAssistant();
  bindBuddySettings();
  syncBuddyUI();
  $('#assistant-form').addEventListener('submit', event => { event.preventDefault(); const input = $('#assistant-input'); const message = input.value.trim(); if (!message) return; input.value = ''; void sendAssistantMessage(message); });
  $$('[data-chat-prompt]').forEach(button => button.addEventListener('click', () => { $('#assistant-input').value = button.dataset.chatPrompt || ''; $('#assistant-input').focus(); }));
  $$('[data-plan-action]').forEach(button => button.addEventListener('click', () => { if (button.dataset.planAction === 'free') { toast('Pulsuz plan artıq seçilib.'); return; } void startCheckout(button.dataset.planAction); }));
  $('#manage-billing').addEventListener('click', manageBilling);

  authForm.addEventListener('submit',submitAuth);$('#auth-close').addEventListener('click',closeAuth);$('#auth-switch').addEventListener('click',()=>openAuth(state.authMode==='register'?'login':'register'));$('#resend-confirmation').addEventListener('click',resendVerification);
  $('#password-toggle').addEventListener('click',()=>{const input=$('#auth-password'),showing=input.type==='text';input.type=showing?'password':'text';$('#password-toggle').textContent=showing?'Göstər':'Gizlət';});
  $('#auth-modal').addEventListener('click',event=>{if(event.target===authModal)closeAuth();});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!authModal.classList.contains('hidden'))closeAuth();});$$('[data-auth]').forEach(button=>button.addEventListener('click',()=>openAuth(button.dataset.auth)));
  $('#analyzer-form').addEventListener('submit',onAnalyze);$('#content-text').addEventListener('input',()=>$('#char-count').textContent=`${$('#content-text').value.length} / 1200`);$('#char-count').textContent=`${$('#content-text').value.length} / 1200`;
  $('#platform-choices').addEventListener('click',event=>{const button=event.target.closest('[data-platform]');if(!button)return;state.platform=button.dataset.platform;$$('#platform-choices .choice').forEach(choice=>{const selected=choice===button;choice.classList.toggle('is-selected',selected);choice.setAttribute('aria-pressed',String(selected));});});
  $$('.side-link').forEach(button=>button.addEventListener('click',()=>{showView(button.dataset.view);const target=button.dataset.scrollTarget;if(target)setTimeout(()=>$(target)?.scrollIntoView({behavior:'smooth',block:'center'}),90);}));$$('[data-view]').forEach(button=>button.addEventListener('click',()=>{if(!button.classList.contains('side-link')){showView(button.dataset.view);const target=button.dataset.scrollTarget;if(target)setTimeout(()=>$(target)?.scrollIntoView({behavior:'smooth',block:'center'}),90);}}));
  $('#workspace-analyzer').addEventListener('submit',runWorkspaceAnalysis);$('#workspace-content-text').addEventListener('input',()=>$('#workspace-char-count').textContent=`${$('#workspace-content-text').value.length} / 6000`);
  $('#save-analysis-idea').addEventListener('click',async()=>{if(!state.lastAnalysis)return;const item=state.lastAnalysis;const title=(item.text||'Yeni məzmun ideyası').split(/[.!?\n]/)[0].slice(0,280)||'Yeni məzmun ideyası';const saved=await saveIdea(title,item.text,item.platform,'Analiz edilmiş kontent');if(saved)$('#save-analysis-idea').disabled=true;});
  $('#save-video-analysis-idea').addEventListener('click',async()=>{if(!state.lastVideoAnalysis)return;const item=state.lastVideoAnalysis;const title=(item.title||'Video təhlili').slice(0,280);const body=[item.summary||'',...(item.recommendations||[]).map((x,i)=>`${i+1}. ${x}`),item.transcript?`Transkript: ${item.transcript}`:''].filter(Boolean).join('\n');const saved=await saveIdea(title,body,item.platform||'Instagram','Video təhlili');if(saved)$('#save-video-analysis-idea').disabled=true;});
  $('#library-search').addEventListener('input',renderLibrary);$('#new-idea-button').addEventListener('click',async()=>{const title=window.prompt('Yeni məzmun ideyasının adını yaz:');if(title?.trim())await saveIdea(title.trim());});$('#library-rows').addEventListener('click',event=>{const del=event.target.closest('[data-delete-idea]');if(del)return deleteIdea(del.dataset.deleteIdea);const use=event.target.closest('[data-edit-idea]');if(use)useIdea(use.dataset.editIdea);});$('#recent-ideas').addEventListener('click',event=>{const use=event.target.closest('[data-edit-idea]');if(use)useIdea(use.dataset.editIdea);});
  $('#mobile-menu').addEventListener('click',()=>$('#sidebar').classList.toggle('mobile-open'));$('.notice-close').addEventListener('click',()=>$('.workspace-notice').classList.add('hidden'));
  $('#metrics-file').addEventListener('change',event=>{void importMetrics(event.target.files[0]);event.target.value='';});$('#report-periods').addEventListener('click',event=>{const button=event.target.closest('[data-period]');if(button)selectedPeriodButton(button);});$('#download-report').addEventListener('click',downloadReport);$('#print-report').addEventListener('click',()=>window.print());$('#trend-form').addEventListener('submit',event=>{event.preventDefault();void loadTrends();});$('#tailor-trends').addEventListener('click',tailorTrends);$('#analyze-video').addEventListener('click',()=>void analyzeVideo());$('#video-file').addEventListener('change',event=>{const file=event.target.files?.[0];$('#video-file-status').textContent=file?`${file.name} · ${(file.size/1024/1024).toFixed(1)} MB`:'Video seçilməyib.';});$('#scrape-form').addEventListener('submit',runPublicScrape);$('#scrape-platform').addEventListener('change',updateScrapePlatformCopy);$('#export-scrape-json').addEventListener('click',downloadScrapeJson);$('#export-scrape-csv').addEventListener('click',downloadScrapeCsv);$('#scrape-to-reports').addEventListener('click',()=>showView('reports'));
  $('#business-profile-form').addEventListener('submit',saveBusinessProfile);$('#refresh-partners').addEventListener('click',()=>void loadPartners());$('#copy-referral').addEventListener('click',async()=>{const text=$('#referral-link').value;try{await navigator.clipboard.writeText(text);toast('Dəvət linki köçürüldü.');}catch{const input=$('#referral-link');input.select();document.execCommand('copy');toast('Dəvət linki seçildi.');}});
  const logOut=async()=>{try{await api('/api/auth/logout',{method:'POST',body:'{}'});}catch{}state.user=null;state.ideas=[];state.metrics=[];state.lastAnalysis=null;setHeaderForUser();showLanding();toast('Hesabdan çıxış edildi.');};$('#sign-out').addEventListener('click',logOut);$('#settings-logout').addEventListener('click',logOut);

  async function bootstrap(){
    $('#footer-year').textContent=String(new Date().getFullYear()); updateScrapePlatformCopy();
    const publicPage = document.documentElement.dataset.publicPage || 'home';
    $$('[data-route-link]').forEach(link => {
      const active = link.dataset.routeLink === publicPage;
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const url=new URL(window.location.href), referral=url.searchParams.get('ref'), verifiedNotice=url.searchParams.get('verified')==='1';
    const checkoutStatus=url.searchParams.get('checkout'), checkoutSession=url.searchParams.get('session_id');
    if(verifiedNotice){url.searchParams.delete('verified');history.replaceState({},'',`${url.pathname}${url.search}${url.hash}`);}
    if(referral){try{const seen=sessionStorage.getItem(`signal-ref-${referral}`);if(!seen){await api('/api/referrals/click',{method:'POST',body:JSON.stringify({code:referral})});sessionStorage.setItem(`signal-ref-${referral}`,'1');}}catch{} }
    try{const result=await api('/api/me');state.user=result.user;setHeaderForUser();}catch{state.user=null;setHeaderForUser();}
    const token=url.searchParams.get('verify');if(token){url.searchParams.delete('verify');history.replaceState({},'',`${url.pathname}${url.search}${url.hash}`);try{const result=await api(`/api/auth/verify?token=${encodeURIComponent(token)}`);state.user=result.user;closeAuth();setHeaderForUser();showWorkspace();toast(result.message||'E-poçt təsdiqləndi.');}catch(error){openAuth('login');setAlert(error.message||'Təsdiq linkindən istifadə etmək mümkün olmadı.');$('#resend-row').classList.remove('hidden');}}
    $('#char-count').textContent = `${$('#content-text').value.length} / 1200`;
    if(state.user){showWorkspace();if(verifiedNotice)toast('E-poçt ünvanın təsdiqləndi. İş məkanına xoş gəldin.');
      if(checkoutStatus==='success' && checkoutSession){try{const billingResult=await api('/api/billing/confirm',{method:'POST',body:JSON.stringify({sessionId:checkoutSession})});state.user={...state.user,...billingResult.user};setHeaderForUser();updateBillingIdentity();showView('billing');const billStatus=$('#billing-status');if(billStatus)billStatus.textContent='Abunəliyin aktivləşdirildi. Xoş gəlmisən!';}catch(error){showView('billing');const billStatus=$('#billing-status');if(billStatus)billStatus.textContent=error.message||'Ödənişi təsdiqləmək mümkün olmadı.';}}
      else if(checkoutStatus==='cancel'){showView('billing');const billStatus=$('#billing-status');if(billStatus)billStatus.textContent='Ödəniş tamamlanmadı; cari planın dəyişməyib.';}
    }
    else if(verifiedNotice){openAuth('login');setAlert('E-poçt ünvanın təsdiqləndi. İndi hesabına daxil ol.', 'success');}
    if(checkoutStatus){const cleanUrl=new URL(window.location.href);cleanUrl.searchParams.delete('checkout');cleanUrl.searchParams.delete('session_id');history.replaceState({},'',`${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);}
  }
  bootstrap();
})();
