const toast = document.querySelector('#toast');
const modal = document.querySelector('#ask-modal');
const tr = (key) => window.HamleI18n?.t(key) || key;
const phrases = {
  matched: { en:'You matched with Deniz! Make your first move in Messages.', tr:'Deniz ile eşleştin! İlk hamleni Mesajlar’dan yapabilirsin.', de:'Du hast ein Match mit Deniz! Mach deinen ersten Zug in Nachrichten.', fr:'Vous avez matché avec Deniz ! Faites votre premier coup dans Messages.', it:'Hai un match con Deniz! Fai la prima mossa in Messaggi.' },
  next: { en:'Discovering the next player.', tr:'Sonraki oyuncu keşfediliyor.', de:'Nächster Spieler wird entdeckt.', fr:'Découverte du joueur suivant.', it:'Alla scoperta del prossimo giocatore.' },
  profile: { en:'Deniz’s profile will open soon.', tr:'Deniz’in profili yakında açılacak.', de:'Deniz’ Profil wird bald geöffnet.', fr:'Le profil de Deniz ouvrira bientôt.', it:'Il profilo di Deniz si aprirà presto.' },
  shared: { en:'Your question was shared with the community!', tr:'Sorun toplulukla paylaşıldı!', de:'Deine Frage wurde mit der Community geteilt!', fr:'Votre question a été partagée avec la communauté !', it:'La tua domanda è stata condivisa con la community!' }
};
const say = (key) => phrases[key]?.[window.HamleI18n?.language() || 'en'] || phrases[key]?.en || key;
function showToast(message) { toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2300); }
window.showHamleToast = showToast;

document.querySelector('#like-btn')?.addEventListener('click', () => {
  showToast(say('matched'));
  const card = document.querySelector('#player-card');
  card.style.transform = 'translateX(120%) rotate(6deg)';
  setTimeout(() => card.style.transform = '', 700);
});
document.querySelector('#pass-btn')?.addEventListener('click', () => showToast(say('next')));
document.querySelector('#profile-btn')?.addEventListener('click', () => showToast(say('profile')));
document.querySelectorAll('#ask-button, #ask-button-2').forEach(button => button.addEventListener('click', () => modal.classList.add('open')));
document.querySelector('.close-modal')?.addEventListener('click', () => modal.classList.remove('open'));
document.querySelector('.submit-question')?.addEventListener('click', () => { modal.classList.remove('open'); showToast(say('shared')); });
const chatCopy = {
  en:{online:'Online now',back:'Back',placeholder:'Write a message…',empty:'Start the conversation.',today:'Today'},
  tr:{online:'Şimdi çevrimiçi',back:'Geri',placeholder:'Mesaj yaz…',empty:'Sohbete bir mesajla başla.',today:'Bugün'},
  de:{online:'Jetzt online',back:'Zurück',placeholder:'Nachricht schreiben…',empty:'Starte die Unterhaltung.',today:'Heute'},
  fr:{online:'En ligne maintenant',back:'Retour',placeholder:'Écrire un message…',empty:'Commencez la conversation.',today:'Aujourd’hui'},
  it:{online:'Online ora',back:'Indietro',placeholder:'Scrivi un messaggio…',empty:'Inizia la conversazione.',today:'Oggi'}
};
const chatLanguage = () => chatCopy[window.HamleI18n?.language() || 'en'] || chatCopy.en;
const chat = document.createElement('section');
chat.className = 'chat-panel';
chat.setAttribute('aria-live','polite');
document.querySelector('.app-shell').appendChild(chat);
let activeChat = null;
const storedMessages = () => JSON.parse(localStorage.getItem('hamle-messages') || '{}');
const saveMessages = value => localStorage.setItem('hamle-messages', JSON.stringify(value));
function renderChat() {
  if (!activeChat) return;
  const copy = chatLanguage();
  const history = storedMessages()[activeChat] || [];
  const starter = activeChat === 'Deniz' ? [
    {from:'them', text: window.HamleI18n?.t('msgOne') || 'Do you have a plan for the Italian Game?'}
  ] : [{from:'them', text: window.HamleI18n?.t('msgTwo') || 'Thanks for the analysis!'}];
  const entries = history.length ? history : starter;
  chat.innerHTML = `<header class="chat-head"><button class="chat-back" aria-label="${copy.back}">‹</button><span class="chat-avatar ${activeChat === 'Deniz' ? 'deniz' : ''}">${activeChat[0]}</span><span class="chat-person"><strong>${activeChat}</strong><small>${copy.online}</small></span></header><div class="chat-messages"><p class="chat-date">${copy.today}</p>${entries.map(item => `<p class="chat-bubble ${item.from === 'me' ? 'me' : 'them'}"></p>`).join('')}</div><form class="chat-compose"><input maxlength="500" autocomplete="off" aria-label="${copy.placeholder}" placeholder="${copy.placeholder}"><button class="chat-send" aria-label="Send">↑</button></form>`;
  chat.querySelectorAll('.chat-bubble').forEach((bubble, index) => bubble.textContent = entries[index].text);
  const messages = chat.querySelector('.chat-messages'); messages.scrollTop = messages.scrollHeight;
  chat.querySelector('.chat-back').onclick = () => { chat.classList.remove('open'); activeChat = null; };
  chat.querySelector('.chat-compose').onsubmit = event => {
    event.preventDefault(); const input = event.currentTarget.querySelector('input'); const value = input.value.trim(); if (!value) return;
    const all = storedMessages(); all[activeChat] = [...(all[activeChat] || starter), {from:'me', text:value}]; saveMessages(all); renderChat();
  };
}
document.querySelectorAll('.conversation').forEach(item => item.addEventListener('click', () => { activeChat = item.dataset.name; renderChat(); chat.classList.add('open'); }));
window.addEventListener('hamle:languagechange', () => { if (activeChat) renderChat(); });
