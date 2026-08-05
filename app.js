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
  en:{online:'Online now',back:'Back',placeholder:'Write a message…',empty:'Start the conversation.',today:'Today',newMessage:'New message',choose:'Choose a player',close:'Close'},
  tr:{online:'Şimdi çevrimiçi',back:'Geri',placeholder:'Mesaj yaz…',empty:'Sohbete bir mesajla başla.',today:'Bugün',newMessage:'Yeni mesaj',choose:'Oyuncu seç',close:'Kapat'},
  de:{online:'Jetzt online',back:'Zurück',placeholder:'Nachricht schreiben…',empty:'Starte die Unterhaltung.',today:'Heute',newMessage:'Neue Nachricht',choose:'Spieler auswählen',close:'Schließen'},
  fr:{online:'En ligne maintenant',back:'Retour',placeholder:'Écrire un message…',empty:'Commencez la conversation.',today:'Aujourd’hui',newMessage:'Nouveau message',choose:'Choisir un joueur',close:'Fermer'},
  it:{online:'Online ora',back:'Indietro',placeholder:'Scrivi un messaggio…',empty:'Inizia la conversazione.',today:'Oggi',newMessage:'Nuovo messaggio',choose:'Scegli un giocatore',close:'Chiudi'}
};
const chatLanguage = () => chatCopy[window.HamleI18n?.language() || 'en'] || chatCopy.en;
const chat = document.createElement('section');
chat.className = 'chat-panel';
chat.setAttribute('aria-live','polite');
document.querySelector('.app-shell').appendChild(chat);
let activeChat = null;
const recipientSheet = document.createElement('div');
recipientSheet.className = 'recipient-sheet';
document.body.appendChild(recipientSheet);
function openChat(name) { activeChat = name; renderChat(); chat.classList.add('open'); }
function showRecipientPicker() {
  const copy = chatLanguage();
  recipientSheet.innerHTML = `<section class="recipient-card"><h2>${copy.choose}</h2><button data-recipient="Deniz"><span>D</span>Deniz</button><button data-recipient="Arda"><span>A</span>Arda K.</button><button class="recipient-close">${copy.close}</button></section>`;
  recipientSheet.classList.add('open');
  recipientSheet.querySelectorAll('[data-recipient]').forEach(button => button.onclick = () => { recipientSheet.classList.remove('open'); openChat(button.dataset.recipient); });
  recipientSheet.querySelector('.recipient-close').onclick = () => recipientSheet.classList.remove('open');
}
const newMessageButton = document.createElement('button');
newMessageButton.className = 'new-message';
newMessageButton.innerHTML = '<b>＋</b><span></span>';
document.querySelector('#messages .section-heading').after(newMessageButton);
newMessageButton.onclick = showRecipientPicker;
const storedMessages = () => JSON.parse(localStorage.getItem('hamle-chat-threads-v2') || '{}');
const saveMessages = value => localStorage.setItem('hamle-chat-threads-v2', JSON.stringify(value));
const openingThread = name => {
  const lang = window.HamleI18n?.language() || 'en';
  const thread = {
    en: name === 'Deniz' ? ['Hi Ömer! I saw you are studying the Italian Game.', 'Do you have a plan for the Italian Game?'] : ['Thanks for the analysis!', 'Would you like to review the critical position together?'],
    tr: name === 'Deniz' ? ['Selam Ömer! İtalyan Açılışı çalıştığını gördüm.', 'İtalyan Açılışı için bir planın var mı?'] : ['Analiz için teşekkürler!', 'Kritik pozisyonu birlikte incelemek ister misin?'],
    de: name === 'Deniz' ? ['Hallo Ömer! Ich habe gesehen, dass du die Italienische Partie studierst.', 'Hast du einen Plan für die Italienische Partie?'] : ['Danke für die Analyse!', 'Möchtest du die kritische Stellung zusammen ansehen?'],
    fr: name === 'Deniz' ? ['Salut Ömer ! J’ai vu que tu étudies l’Italienne.', 'As-tu un plan pour l’Italienne ?'] : ['Merci pour l’analyse !', 'Veux-tu revoir la position critique ensemble ?'],
    it: name === 'Deniz' ? ['Ciao Ömer! Ho visto che studi l’Italiana.', 'Hai un piano per l’Italiana?'] : ['Grazie per l’analisi!', 'Vuoi rivedere insieme la posizione critica?']
  };
  return (thread[lang] || thread.en).map(text => ({ from: 'them', text }));
};
const automaticReply = name => ({
  en: name === 'Deniz' ? 'Great — I’m looking at the board now.' : 'Sounds good. I’m ready when you are.',
  tr: name === 'Deniz' ? 'Harika — şimdi tahtaya bakıyorum.' : 'Olur. Hazır olduğunda buradayım.',
  de: name === 'Deniz' ? 'Super — ich schaue mir das Brett jetzt an.' : 'Klingt gut. Ich bin bereit, wenn du es bist.',
  fr: name === 'Deniz' ? 'Parfait — je regarde l’échiquier maintenant.' : 'D’accord. Je suis prêt quand tu l’es.',
  it: name === 'Deniz' ? 'Ottimo — sto guardando la scacchiera ora.' : 'Va bene. Sono pronto quando lo sei.'
}[window.HamleI18n?.language() || 'en'] || 'Sounds good.');
function renderChat() {
  if (!activeChat) return;
  const copy = chatLanguage();
  const history = storedMessages()[activeChat] || [];
  const entries = [...openingThread(activeChat), ...history];
  chat.innerHTML = `<header class="chat-head"><button class="chat-back" aria-label="${copy.back}">‹</button><span class="chat-avatar ${activeChat === 'Deniz' ? 'deniz' : ''}">${activeChat[0]}</span><span class="chat-person"><strong>${activeChat}</strong><small>${copy.online}</small></span></header><div class="chat-messages"><p class="chat-date">${copy.today}</p>${entries.map(item => `<p class="chat-bubble ${item.from === 'me' ? 'me' : 'them'}"></p>`).join('')}</div><form class="chat-compose"><input maxlength="500" autocomplete="off" aria-label="${copy.placeholder}" placeholder="${copy.placeholder}"><button class="chat-send" aria-label="Send">↑</button></form>`;
  chat.querySelectorAll('.chat-bubble').forEach((bubble, index) => bubble.textContent = entries[index].text);
  const messages = chat.querySelector('.chat-messages'); messages.scrollTop = messages.scrollHeight;
  chat.querySelector('.chat-back').onclick = () => { chat.classList.remove('open'); activeChat = null; };
  chat.querySelector('.chat-compose').onsubmit = event => {
    event.preventDefault(); const input = event.currentTarget.querySelector('input'); const value = input.value.trim(); if (!value) return;
    const recipient = activeChat;
    const all = storedMessages(); all[recipient] = [...(all[recipient] || []), {from:'me', text:value}]; saveMessages(all); renderChat();
    window.setTimeout(() => {
      const updated = storedMessages(); updated[recipient] = [...(updated[recipient] || []), {from:'them', text:automaticReply(recipient)}]; saveMessages(updated);
      if (activeChat === recipient) renderChat();
    }, 700);
  };
}
document.querySelectorAll('.conversation').forEach(item => item.addEventListener('click', () => openChat(item.dataset.name)));
window.addEventListener('hamle:languagechange', () => { newMessageButton.querySelector('span').textContent = chatLanguage().newMessage; if (activeChat) renderChat(); });
