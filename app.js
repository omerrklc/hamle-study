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
document.querySelectorAll('.conversation').forEach(item => item.addEventListener('click', () => showToast(`${item.dataset.name}: ${tr('messages')}`)));
