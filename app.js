const screens = document.querySelectorAll('.screen');
const navItems = document.querySelectorAll('.nav-item');
const toast = document.querySelector('#toast');
const modal = document.querySelector('#ask-modal');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2300);
}

navItems.forEach(item => item.addEventListener('click', () => {
  const target = item.dataset.target;
  screens.forEach(screen => screen.classList.toggle('active', screen.id === target));
  navItems.forEach(nav => nav.classList.toggle('active', nav === item));
}));

document.querySelector('#like-btn')?.addEventListener('click', () => {
  showToast('Deniz ile eşleştin! Sohbetlerden ilk hamleni yapabilirsin.');
  const card = document.querySelector('#player-card');
  card.style.transform = 'translateX(120%) rotate(6deg)';
  setTimeout(() => card.style.transform = '', 700);
});
document.querySelector('#pass-btn')?.addEventListener('click', () => showToast('Sonraki oyuncuyu keşfediyorsun.'));
document.querySelector('#profile-btn')?.addEventListener('click', () => showToast('Deniz profili yakında açılacak.'));
document.querySelector('#compat-button')?.addEventListener('click', () => showToast('Uyum, tempo ve aktivite tercihlerine göre hesaplanır.'));
document.querySelectorAll('#ask-button, #ask-button-2').forEach(button => button.addEventListener('click', () => modal.classList.add('open')));
document.querySelector('.close-modal')?.addEventListener('click', () => modal.classList.remove('open'));
document.querySelector('.submit-question')?.addEventListener('click', () => { modal.classList.remove('open'); showToast('Sorun toplulukla paylaşıldı!'); });
document.querySelectorAll('.conversation').forEach(item => item.addEventListener('click', () => showToast(`${item.dataset.name} ile sohbet yakında açılacak.`)));
