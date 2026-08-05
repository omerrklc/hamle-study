const openingLibrary = [
  { name: 'Italian Game', eco: 'C50', moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4', note: 'Fast development and king-side pressure.', side: 'White' },
  { name: 'Sicilian Defense', eco: 'B20', moves: '1. e4 c5', note: 'A fighting reply to 1.e4 with many sharp plans.', side: 'Black' },
  { name: 'Queen’s Gambit', eco: 'D06', moves: '1. d4 d5 2. c4', note: 'Claim the centre and create long-term pressure.', side: 'White' },
  { name: 'Ruy Lopez', eco: 'C60', moves: '1. e4 e5 2. Nf3 Nc6 3. Bb5', note: 'A classical opening built around central tension.', side: 'White' },
  { name: 'Caro-Kann', eco: 'B10', moves: '1. e4 c6 2. d4 d5', note: 'A solid, resilient choice against 1.e4.', side: 'Black' },
  { name: 'King’s Indian', eco: 'E60', moves: '1. d4 Nf6 2. c4 g6', note: 'Let White build a centre, then attack it.', side: 'Black' }
];
const startPosition = ['♜','♞','♝','♛','♚','♝','♞','♜','♟','♟','♟','♟','♟','♟','♟','♟','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','♙','♙','♙','♙','♙','♙','♙','♙','♖','♘','♗','♕','♔','♗','♘','♖'];
function boardMarkup(position = startPosition) { return `<div class="proper-board">${position.map((piece, i) => { const rank = 8 - Math.floor(i / 8), file = 'abcdefgh'[i % 8]; return `<button class="board-square ${(Math.floor(i/8)+i)%2?'dark-square':'light-square'}" data-square="${file}${rank}">${i % 8 === 0 ? `<i class="rank-label">${rank}</i>` : ''}${i > 55 ? `<i class="file-label">${file}</i>` : ''}<b class="chess-piece ${piece && piece.charCodeAt(0) >= 9818 ? 'black-piece' : 'white-piece'}">${piece}</b></button>`; }).join('')}</div>`; }
const advanced = document.createElement('section'); advanced.className = 'screen analysis-screen'; advanced.id = 'analysis';
advanced.innerHTML = `<header class="topbar"><div class="brand"><span class="brand-mark">♞</span><span>hamle</span></div><button class="icon-button" id="analysis-history">⌁</button></header><div class="section-heading compact"><p class="eyebrow">STUDY ROOM</p><h1>Train your next<br />best move.</h1></div><div class="study-tabs"><button class="active" data-study="board">Board</button><button data-study="openings">Openings</button><button data-study="saved">Saved</button></div><div id="board-study"><div class="turn-banner"><span>WHITE TO MOVE</span><b>Italian Game · Move 4</b><small>◷ 08:42</small></div>${boardMarkup()}<div class="move-strip"><button class="move-back">‹</button><span><b>1. e4 e5</b><b>2. Nf3 Nc6</b><b class="current-move">3. Bc4</b></span><button class="move-forward">›</button></div><div class="analysis-tools"><button id="draw-toggle">⌁ Draw</button><button id="flip-board">↕ Flip</button><button id="reset-board">↺ Reset</button></div><div class="coach-card"><span>♞</span><p><b>Study tip</b>Develop your pieces before moving the same piece twice.</p><button id="show-plan">View plan</button></div><article class="variation" id="variation"><h3>Italian Game: your plan</h3><p>Castle early, place your bishop on c4 and prepare pressure on f7. Avoid rushing the attack before development is complete.</p><code>4. O-O Nf6 5. d3 Bc5 6. c3 O-O</code></article><button class="ask-analysis" id="community-analysis">Ask the community about this position</button></div><div id="openings-study" class="opening-library"></div><div id="saved-study" class="empty-study"><span>♙</span><h3>Your study shelf is empty</h3><p>Save an opening or a position to revisit it later.</p></div>`;
document.querySelector('.bottom-nav').before(advanced);
const analyzeNav = document.createElement('button'); analyzeNav.className = 'nav-item'; analyzeNav.dataset.target = 'analysis'; analyzeNav.innerHTML = '<span>♜</span><small>Study</small>'; document.querySelector('.bottom-nav').insertBefore(analyzeNav, document.querySelector('.bottom-nav').lastElementChild);
function showAnalysis() { activateScreen('analysis'); }
analyzeNav.onclick = showAnalysis;
document.querySelector('#openings-study').innerHTML = `<p class="library-intro">Master the patterns behind the most played openings.</p>${openingLibrary.map((o,i) => `<article class="opening-card" data-opening="${i}"><div class="mini-opening-board"><span>♟</span><span>♙</span><span>♞</span></div><div><small>${o.eco} · PLAY AS ${o.side.toUpperCase()}</small><h3>${o.name}</h3><p>${o.moves}</p></div><b>›</b></article>`).join('')}`;
document.querySelectorAll('.study-tabs button').forEach(button => button.onclick = () => { document.querySelectorAll('.study-tabs button').forEach(b=>b.classList.toggle('active',b===button)); ['board','openings','positions','history','saved'].forEach(id=>document.querySelector(`#${id}-study`).style.display=id===button.dataset.study?'block':'none'); });
document.querySelector('#show-plan').onclick = () => document.querySelector('#variation').classList.toggle('show');
document.querySelector('#flip-board').onclick = () => document.querySelector('.proper-board').classList.toggle('flipped');
document.querySelector('#reset-board').onclick = () => { document.querySelector('.board-frame').replaceWith(window.buildBoardFrame()); bindSquares(); };
document.querySelector('#draw-toggle').onclick = e => e.currentTarget.classList.toggle('active');
function bindSquares() { document.querySelectorAll('.board-square').forEach(square => square.onclick = () => square.classList.toggle('marked')); }
bindSquares();
document.querySelectorAll('.opening-card').forEach(card => card.onclick = () => { const o = openingLibrary[card.dataset.opening]; document.querySelector('.coach-card p').innerHTML = `<b>${o.name}</b> ${o.note}`; document.querySelector('.study-tabs button[data-study="board"]').click(); showAnalysis(); window.loadStudyOpening?.(o.name, o.eco); });
document.querySelector('#community-analysis').onclick = () => { document.querySelector('#ask-button').click(); document.querySelector('#toast').textContent = 'Opening position attached'; document.querySelector('#toast').classList.add('show'); setTimeout(() => document.querySelector('#toast').classList.remove('show'), 1800); };
function createOverlay(kind) { const o = document.createElement('div'); o.className = 'overlay'; o.id = kind; document.body.appendChild(o); return o; }
const searchOverlay = createOverlay('search-overlay'); searchOverlay.innerHTML = '<section class="overlay-card"><button class="overlay-close">&times;</button><h2>Find your chess people</h2><input class="search-input" placeholder="Search players, mentors or openings"><div class="filter-grid"><button class="selected">Rapid 1200–1600</button><button>Nearby</button><button>Mentor</button><button>Italian Game</button><button>Speaks English</button></div><div class="search-result"><i>N</i><span><b>Nora Aksoy <em class="mentor-badge">MENTOR</em></b><small>1642 ELO · Sicilian · 0.8 km</small></span></div><div class="search-result"><i>J</i><span><b>Jon Bell</b><small>1520 ELO · Italian Game · English</small></span></div></section>';
const noticeOverlay = createOverlay('safety-overlay'); noticeOverlay.innerHTML = '<section class="overlay-card"><button class="overlay-close">&times;</button><h2>Play safely in person</h2><p>Meet players in public venues and keep your exact location private until you choose to share it.</p><div class="notice"><b>Privacy first</b>Hamle shows approximate distance only. Your home address and live location are never visible to another player.</div><div class="reputation-line"><span>Community reputation</span><b>72% trusted</b></div><div class="reputation-bar"><i></i></div><div class="report-row"><button>Block player</button><button class="danger">Report concern</button></div></section>';
const notificationOverlay = createOverlay('notification-overlay'); notificationOverlay.innerHTML = '<section class="overlay-card"><button class="overlay-close">&times;</button><h2>Notifications</h2><div class="notification-item"><b>Nora accepted your match</b><small>2 minutes ago</small></div><div class="notification-item"><b>Your comment earned 5 useful votes</b><small>18 minutes ago</small></div><div class="notification-item"><b>Arda invited you to Gambit Coffee</b><small>1 hour ago</small></div></section>';
document.querySelectorAll('.overlay-close').forEach(b => b.onclick = () => b.closest('.overlay').classList.remove('open'));
document.querySelectorAll('.icon-button')[1].onclick = () => searchOverlay.classList.add('open'); document.querySelectorAll('.icon-button')[0].onclick = () => notificationOverlay.classList.add('open'); document.querySelectorAll('.cafe-card').forEach(card => card.onclick = () => noticeOverlay.classList.add('open')); document.querySelector('.more').onclick = () => noticeOverlay.classList.add('open');

const positionsTab = document.createElement('button');
positionsTab.dataset.study = 'positions';
positionsTab.textContent = 'Positions';
const savedTab = document.querySelector('.study-tabs button[data-study="saved"]');
savedTab.before(positionsTab);

const historyTab = document.createElement('button');
historyTab.dataset.study = 'history';
historyTab.textContent = 'Game history';
positionsTab.after(historyTab);

const positionBoard = pieces => `<div class="position-board" aria-hidden="true">${Array.from({ length: 64 }, (_, index) => {
  const square = `${'abcdefgh'[index % 8]}${8 - Math.floor(index / 8)}`;
  const piece = pieces[square];
  return `<span class="position-square">${piece ? `<img src="https://lichess1.org/assets/piece/cburnett/${piece}.svg" alt="">` : ''}</span>`;
}).join('')}</div>`;

const positionsStudy = document.createElement('div');
positionsStudy.id = 'positions-study';
positionsStudy.className = 'positions-study';
positionsStudy.innerHTML = `
  <section class="position-intro"><p class="eyebrow">PRACTICE TOGETHER</p><h2>Choose a position.<br>Get matched at random.</h2><p>Pick the stage you want to practise. We will pair you online with another player who chose the same type of position.</p></section>
  <div class="position-filters" role="tablist"><button class="selected">All</button><button>Opening</button><button>Middlegame</button><button>Endgame</button></div>
  <div class="position-list">
    <article class="study-position-card selected" data-position="lucena"><div class="position-card-head"><span>ENDGAME</span><b>18 players ready</b></div>${positionBoard({ a8: 'bR', f8: 'bK', c7: 'wK', a7: 'wP', f7: 'wR' })}<div class="position-copy"><h3>Lucena: build a bridge</h3><p>Convert the extra pawn as White, or find the most resilient defence as Black.</p></div><div class="position-match"><span class="avatar ece">18</span><span><b>Endgame players online</b><small>Same position · 10+5</small></span><i>Live</i></div><div class="side-choice"><button class="selected">Play White</button><button>Random side</button><button>Play Black</button></div><button class="position-action">Find a random opponent <b>→</b></button></article>
    <article class="study-position-card" data-position="minority"><div class="position-card-head"><span>MIDDLEGAME</span><b>11 players ready</b></div>${positionBoard({ a8: 'bR', d8: 'bQ', g8: 'bK', c6: 'bN', d5: 'bP', e5: 'bP', a2: 'wR', d1: 'wQ', g1: 'wK', c3: 'wN', c4: 'wP', d4: 'wP' })}<div class="position-copy"><h3>Minority attack</h3><p>Play the Carlsbad structure from either side and choose the right strategic plan.</p></div><div class="position-match"><span class="avatar mert">11</span><span><b>Middlegame players online</b><small>Same position · 15+10</small></span><i>Live</i></div><button class="position-action">Find a random opponent <b>→</b></button></article>
    <article class="study-position-card" data-position="attack"><div class="position-card-head"><span>OPENING</span><b>26 players ready</b></div>${positionBoard({ g8: 'bK', f6: 'bN', d5: 'bP', e4: 'wP', c4: 'wB', f3: 'wN', d1: 'wQ', g1: 'wK' })}<div class="position-copy"><h3>Italian: pressure on f7</h3><p>Finish development, calculate the attack and practise converting initiative into a plan.</p></div><div class="position-match"><span class="avatar selin">26</span><span><b>Opening players online</b><small>Same position · 10+5</small></span><i>Live</i></div><button class="position-action">Find a random opponent <b>→</b></button></article>
  </div>`;
document.querySelector('.analysis-screen').appendChild(positionsStudy);

positionsTab.onclick = () => {
  document.querySelectorAll('.study-tabs button').forEach(button => button.classList.toggle('active', button === positionsTab));
  ['board', 'openings', 'positions', 'history', 'saved'].forEach(id => document.querySelector(`#${id}-study`).style.display = id === 'positions' ? 'block' : 'none');
};
document.querySelectorAll('.position-filters button').forEach(button => button.onclick = () => {
  document.querySelectorAll('.position-filters button').forEach(item => item.classList.toggle('selected', item === button));
});
document.querySelectorAll('.study-position-card').forEach(card => card.onclick = event => {
  if (event.target.closest('.side-choice')) return;
  document.querySelectorAll('.study-position-card').forEach(item => item.classList.toggle('selected', item === card));
});
document.querySelectorAll('.side-choice button').forEach(button => button.onclick = () => {
  button.closest('.side-choice').querySelectorAll('button').forEach(item => item.classList.toggle('selected', item === button));
});

const historyStudy = document.createElement('div');
historyStudy.id = 'history-study';
historyStudy.className = 'history-study';
historyStudy.innerHTML = `<section class="history-intro"><p class="eyebrow">GAME HISTORY</p><h2>Review the moments<br>that changed the game.</h2><p>Results stay connected to the full game, so you can return to any critical position and analyse it.</p></section><div class="result-summary"><span><b>12</b><small>Games</small></span><span><b>7</b><small>Wins</small></span><span><b>3</b><small>Lessons saved</small></span></div><div class="history-list"><article class="game-result win"><div class="game-result-head"><span>RANDOM ENDGAME · 10+5</span><time>Today · 19:42</time></div><div class="result-players"><span><b>You</b><small>White · 1534</small></span><strong>1–0</strong><span><b>Alex R.</b><small>Black · 1512</small></span></div><p><i>✓</i> Won after converting the Lucena position in 42 moves.</p><button class="analyse-game" data-game="lucena">Analyse this game <b>→</b></button></article><article class="game-result draw"><div class="game-result-head"><span>MIDDLEGAME · 15+10</span><time>Yesterday · 22:08</time></div><div class="result-players"><span><b>You</b><small>Black · 1534</small></span><strong>½–½</strong><span><b>Sam L.</b><small>White · 1567</small></span></div><p><i>≈</i> Draw agreed after 36 moves. Two tactical chances to revisit.</p><button class="analyse-game" data-game="minority">Analyse this game <b>→</b></button></article><article class="game-result loss"><div class="game-result-head"><span>OPENING · 10+5</span><time>Mon · 18:24</time></div><div class="result-players"><span><b>You</b><small>White · 1528</small></span><strong>0–1</strong><span><b>Mia S.</b><small>Black · 1551</small></span></div><p><i>!</i> Lost the initiative on move 18. The position is ready to review.</p><button class="analyse-game" data-game="attack">Analyse this game <b>→</b></button></article></div>`;
document.querySelector('.analysis-screen').appendChild(historyStudy);

historyTab.onclick = () => {
  document.querySelectorAll('.study-tabs button').forEach(button => button.classList.toggle('active', button === historyTab));
  ['board', 'openings', 'positions', 'history', 'saved'].forEach(id => document.querySelector(`#${id}-study`).style.display = id === 'history' ? 'block' : 'none');
};
document.querySelectorAll('.analyse-game').forEach(button => button.onclick = () => {
  document.querySelector('.study-tabs button[data-study="board"]').click();
  document.querySelector('.turn-banner b').textContent = `Game review · ${button.dataset.game}`;
  document.querySelector('.turn-banner span').textContent = 'ANALYSIS MODE';
});
