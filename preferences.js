const preferences = {
  en: { title: 'Make Hamle yours', appearance: 'Appearance', copy: 'Switch between light and dark mode', language: 'Language', nav: { discover: 'Discover', help: 'Help', messages: 'Messages', meet: 'Meet', analysis: 'Study', profile: 'Profile' } },
  tr: { title: 'Hamle’yi kendine göre ayarla', appearance: 'Görünüm', copy: 'Açık ve koyu mod arasında geçiş yap', language: 'Dil', nav: { discover: 'Keşfet', help: 'Yardım', messages: 'Mesajlar', meet: 'Buluş', analysis: 'Çalış', profile: 'Profil' } },
  de: { title: 'Gestalte Hamle nach dir', appearance: 'Darstellung', copy: 'Zwischen hellem und dunklem Modus wechseln', language: 'Sprache', nav: { discover: 'Entdecken', help: 'Hilfe', messages: 'Nachrichten', meet: 'Treffen', analysis: 'Studie', profile: 'Profil' } },
  fr: { title: 'Personnalisez Hamle', appearance: 'Apparence', copy: 'Basculer entre mode clair et sombre', language: 'Langue', nav: { discover: 'Découvrir', help: 'Aide', messages: 'Messages', meet: 'Rencontre', analysis: 'Étude', profile: 'Profil' } },
  it: { title: 'Personalizza Hamle', appearance: 'Aspetto', copy: 'Passa dalla modalità chiara a quella scura', language: 'Lingua', nav: { discover: 'Scopri', help: 'Aiuto', messages: 'Messaggi', meet: 'Incontro', analysis: 'Studio', profile: 'Profilo' } }
};

const profileHeader = document.querySelector('#profile .topbar');
const settingsButton = document.createElement('button');
settingsButton.className = 'icon-button';
settingsButton.id = 'settings-button';
settingsButton.setAttribute('aria-label', 'Ayarlar');
settingsButton.textContent = '⚙';
profileHeader.appendChild(settingsButton);

const settings = document.createElement('div');
settings.className = 'settings-modal';
settings.innerHTML = `<section class="settings-panel" aria-label="Ayarlar"><button class="settings-close" aria-label="Kapat">&times;</button><p class="settings-kicker">PREFERENCES</p><h2></h2><div class="setting-row"><span><strong></strong><small></small></span><button class="theme-toggle" role="switch" aria-checked="false" aria-label="Koyu tema"><i></i></button></div><label class="language-picker"><span></span><select aria-label="Dil"><option value="tr">Türkçe</option><option value="en">English</option><option value="de">Deutsch</option><option value="fr">Français</option><option value="it">Italiano</option></select></label></section>`;
document.body.appendChild(settings);

const themeToggle = settings.querySelector('.theme-toggle');
const languagePicker = settings.querySelector('select');

function setTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark', dark);
  themeToggle.classList.toggle('on', dark);
  themeToggle.setAttribute('aria-checked', String(dark));
  localStorage.setItem('hamle-theme', dark ? 'dark' : 'light');
}

function setLanguage(language) {
  const text = preferences[language] || preferences.tr;
  document.documentElement.lang = language;
  settings.querySelector('h2').textContent = text.title;
  settings.querySelector('.setting-row strong').textContent = text.appearance;
  settings.querySelector('.setting-row small').textContent = text.copy;
  settings.querySelector('.language-picker span').textContent = text.language;
  languagePicker.value = language;
  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    const label = item.querySelector('small');
    if (label) label.textContent = text.nav[item.dataset.target] || item.dataset.target;
  });
  localStorage.setItem('hamle-language', language);
}

settingsButton.addEventListener('click', () => settings.classList.add('open'));
settings.querySelector('.settings-close').addEventListener('click', () => settings.classList.remove('open'));
themeToggle.addEventListener('click', () => setTheme(document.body.classList.contains('dark') ? 'light' : 'dark'));
languagePicker.addEventListener('change', event => setLanguage(event.target.value));

setTheme(localStorage.getItem('hamle-theme') || 'light');
setLanguage(localStorage.getItem('hamle-language') || 'en');
