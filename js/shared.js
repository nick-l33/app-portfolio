// js/shared.js

let translations = {};
let currentLang = 'en';

// Load translations once
async function loadTranslations() {
  try {
    const res = await fetch('assets/translations.json');
    translations = await res.json();
  } catch (e) {
    console.warn('Failed to load translations. Falling back to English.');
    translations = { en: {} };
  }
}

// Apply saved theme
function applyTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Apply saved language & translate UI
function applyLanguage() {
  currentLang = localStorage.getItem('language') || 'en';
  const langSelect = document.getElementById('languageToggle');
  if (langSelect) langSelect.value = currentLang;

  const t = translations[currentLang] || translations.en || {};

  // === Translate index.html ===
  if (document.getElementById('page-title')) {
    document.getElementById('page-title').textContent = t.pageTitle || 'Data Science Web App Projects';
  }

  // Project 1
  if (document.getElementById('p1-title')) document.getElementById('p1-title').textContent = t.project1?.title || '';
  if (document.getElementById('p1-desc')) document.getElementById('p1-desc').textContent = t.project1?.desc || '';
  if (document.getElementById('p1-launch')) document.getElementById('p1-launch').textContent = t.project1?.launch || 'Launch App';
  if (document.getElementById('p1-details')) document.getElementById('p1-details').textContent = t.project1?.details || 'Details';

  // Project 2
  if (document.getElementById('p2-title')) document.getElementById('p2-title').textContent = t.project2?.title || '';
  if (document.getElementById('p2-desc')) document.getElementById('p2-desc').textContent = t.project2?.desc || '';
  if (document.getElementById('p2-launch')) document.getElementById('p2-launch').textContent = t.project2?.launch || 'Launch App';
  if (document.getElementById('p2-details')) document.getElementById('p2-details').textContent = t.project2?.details || 'Details';

  // Project 3
  if (document.getElementById('p3-title')) document.getElementById('p3-title').textContent = t.project3?.title || '';
  if (document.getElementById('p3-desc')) document.getElementById('p3-desc').textContent = t.project3?.desc || '';
  if (document.getElementById('p3-launch')) document.getElementById('p3-launch').textContent = t.project3?.launch || 'Launch App';
  if (document.getElementById('p3-details')) document.getElementById('p3-details').textContent = t.project3?.details || 'Details';

  // Footer
  if (document.getElementById('page-footer')) {
    document.getElementById('page-footer').textContent = t.footer || '© 2025 — Full-stack data science projects, developed with AI assistance, hosted on GitHub Pages';
  }

  // === Translate project1.html (if on that page) ===
  if (window.location.pathname.includes('project1.html')) {
    const h1 = document.querySelector('header h1');
    const backLink = document.querySelector('header a');
    const desc = document.querySelector('main p');
    const techHeader = document.querySelector('h2');
    const techList = document.querySelector('ul');
    const caption = document.querySelector('.text-sm.text-gray-600');

    if (h1) h1.textContent = t.project1?.title || '';
    if (backLink) backLink.textContent = t.backToProjects || '← Back to Projects';
    if (desc) desc.textContent = t.project1?.desc || '';
    if (techHeader) techHeader.textContent = t.project1?.techHeader || 'Tech Stack';
    if (techList && t.project1?.techItems) {
      techList.innerHTML = t.project1.techItems.map(item => `<li>${item}</li>`).join('');
    }
    if (caption) caption.textContent = t.project1?.underConstruction || '';
  }
}

// Setup theme toggle
function setupThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const isDark = document.documentElement.classList.contains('dark');
  btn.textContent = isDark ? '🌙' : '🌞';

  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const nowDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    btn.textContent = nowDark ? '🌙' : '🌞';
  });
}

// Setup language toggle
function setupLanguageToggle() {
  const select = document.getElementById('languageToggle');
  if (!select) return;

  select.addEventListener('change', (e) => {
    localStorage.setItem('language', e.target.value);
    applyLanguage(); // re-translate immediately
  });
}

// Initialize everything
async function init() {
  await loadTranslations();
  applyTheme();
  applyLanguage();
  setupThemeToggle();
  setupLanguageToggle();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
