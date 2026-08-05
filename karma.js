const karmaToast = document.createElement('div');
karmaToast.className = 'karma-toast';
document.body.appendChild(karmaToast);
let karma = Number(localStorage.getItem('hamle-karma') || 126);
function showKarma(message) { karmaToast.textContent = message; karmaToast.classList.add('show'); setTimeout(() => karmaToast.classList.remove('show'), 1800); }
function updateKarma(amount) { karma += amount; localStorage.setItem('hamle-karma', karma); document.querySelectorAll('.karma-value').forEach(el => el.textContent = karma); if (amount > 0) showKarma(`+${amount} community points`); }
window.addCommunityPoints = updateKarma;

// A vote is intentionally anonymous and only measures how useful a post or comment is.
// It never affects the voter's community points.
function voteControl(initialScore, isComment = false) {
  const group = document.createElement('span'); group.className = isComment ? 'comment-votes' : 'vote-group';
  group.innerHTML = `<button class="vote-button up" aria-label="Upvote">+</button><b class="vote-score">${initialScore}</b><button class="vote-button down" aria-label="Downvote">−</button>`;
  let state = 0, score = initialScore;
  const render = () => { group.querySelector('.vote-score').textContent = score; group.querySelector('.up').classList.toggle('active', state === 1); group.querySelector('.down').classList.toggle('active', state === -1); };
  group.querySelector('.up').onclick = () => { score += state === 1 ? -1 : state === -1 ? 2 : 1; state = state === 1 ? 0 : 1; render(); };
  group.querySelector('.down').onclick = () => { score += state === -1 ? 1 : state === 1 ? -2 : -1; state = state === -1 ? 0 : -1; render(); };
  return group;
}
function addComment(panel, text) {
  const comment = document.createElement('div'); comment.className = 'comment';
  comment.innerHTML = '<span class="comment-avatar">M</span><div class="comment-body"><b>MateSeeker</b><small>just now</small><p></p></div>';
  comment.querySelector('p').textContent = text; comment.querySelector('.comment-body').appendChild(voteControl(0, true));
  panel.insertBefore(comment, panel.querySelector('.comment-box')); updateKarma(3);
}
document.querySelectorAll('.post').forEach((post, index) => {
  const footer = post.querySelector('.post-footer'); footer.querySelector('span').replaceWith(voteControl(index ? 31 : 24));
  const launch = document.createElement('button'); launch.className = 'comment-launch'; launch.textContent = 'Comment'; footer.appendChild(launch);
  const panel = document.createElement('div'); panel.className = 'comment-panel';
  panel.innerHTML = '<div class="comment"><span class="comment-avatar">S</span><div class="comment-body"><b>StudyKnight</b><small>8 min ago</small><p>Try improving the knight first; the position will open naturally.</p></div></div><div class="comment-box"><input maxlength="220" placeholder="Add a helpful comment..."><button>Post</button></div><p class="anonymous-note">Votes are anonymous. No one can see who voted.</p>';
  panel.querySelector('.comment-body').appendChild(voteControl(index ? 7 : 18, true)); post.appendChild(panel);
  launch.onclick = () => panel.classList.toggle('open');
  panel.querySelector('.comment-box button').onclick = () => { const input = panel.querySelector('input'); if (input.value.trim()) { addComment(panel, input.value.trim()); input.value = ''; } };
});
const profileStats = document.querySelector('.profile-stats'); const karmaStat = document.createElement('span'); karmaStat.innerHTML = '<b class="karma-value"></b><small>POINTS</small>'; profileStats.appendChild(karmaStat);
document.querySelector('.profile-hero h1').insertAdjacentHTML('beforeend', ' <span class="karma-chip"><i>✦</i><span class="karma-value"></span> pts</span>');
document.querySelectorAll('.karma-value').forEach(el => el.textContent = karma);
