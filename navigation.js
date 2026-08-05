function activateScreen(target) {
  const selected = document.getElementById(target);
  if (!selected) return;

  document.querySelectorAll('.app-shell > .screen').forEach(screen => {
    screen.classList.toggle('active', screen === selected);
  });
  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.target === target);
  });
}

document.addEventListener('click', event => {
  const item = event.target.closest('.bottom-nav .nav-item');
  if (item) activateScreen(item.dataset.target);
});
