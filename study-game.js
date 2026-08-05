(() => {
  if (typeof Chess === 'undefined') return;

  const game = new Chess();
  const pieceName = { p: 'P', n: 'N', b: 'B', r: 'R', q: 'Q', k: 'K' };
  let selected = null;
  let legalMoves = [];
  let opening = null;
  let timeline = [];
  let cursor = 0;
  const promotionSheet = document.createElement('div');
  promotionSheet.className = 'promotion-sheet';
  document.body.appendChild(promotionSheet);

  const boardNode = () => document.querySelector('#analysis .board-frame');
  const squareNode = square => boardNode()?.querySelector(`[data-square="${square}"]`);
  const assetFor = piece => `${piece.color}${pieceName[piece.type]}`;
  const openingLines = {
    'Italian Game': ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'],
    'Sicilian Defense': ['e4', 'c5'],
    'Queen’s Gambit': ['d4', 'd5', 'c4'],
    'Queenâ€™s Gambit': ['d4', 'd5', 'c4'],
    'Ruy Lopez': ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    'Caro-Kann': ['e4', 'c6', 'd4', 'd5'],
    'King’s Indian': ['d4', 'Nf6', 'c4', 'g6'],
    'Kingâ€™s Indian': ['d4', 'Nf6', 'c4', 'g6']
  };
  const notationCopy = () => ({
    en: { title: 'Move notation', start: 'Starting position' }, tr: { title: 'Hamle notasyonu', start: 'Başlangıç konumu' },
    de: { title: 'Zugnotation', start: 'Ausgangsstellung' }, fr: { title: 'Notation des coups', start: 'Position initiale' }, it: { title: 'Notazione mosse', start: 'Posizione iniziale' }
  }[window.HamleI18n?.language() || 'en'] || {});

  function notationPanel() {
    let panel = document.querySelector('#analysis .notation-panel');
    if (panel) return panel;
    const frame = boardNode();
    if (!frame) return null;
    const workspace = document.createElement('div'); workspace.className = 'study-workspace';
    panel = document.createElement('aside'); panel.className = 'notation-panel';
    frame.before(workspace); workspace.append(frame, panel);
    return panel;
  }

  function renderNotation(history) {
    const panel = notationPanel();
    if (!panel) return;
    const t = notationCopy();
    const rows = [];
    for (let index = 0; index < history.length; index += 2) rows.push(`<li><b>${index / 2 + 1}.</b><span>${history[index] || ''}</span><span>${history[index + 1] || ''}</span></li>`);
    panel.innerHTML = `<p>${opening ? `${opening.eco} · ${opening.name}` : t.title}</p><ol>${rows.join('') || `<li class="notation-empty">${t.start}</li>`}</ol>`;
  }
  const copy = () => {
    const lang = window.HamleI18n?.language() || 'en';
    return {
      en: { white: 'WHITE TO MOVE', black: 'BLACK TO MOVE', check: 'CHECK', mate: 'CHECKMATE', draw: 'DRAW', choose: 'Choose promotion', legal: 'Legal moves only' },
      tr: { white: 'BEYAZIN HAMLESİ', black: 'SİYAHIN HAMLESİ', check: 'ŞAH', mate: 'ŞAH MAT', draw: 'BERABERE', choose: 'Terfi taşını seç', legal: 'Yalnızca yasal hamleler' },
      de: { white: 'WEISS AM ZUG', black: 'SCHWARZ AM ZUG', check: 'SCHACH', mate: 'SCHACHMATT', draw: 'REMIS', choose: 'Umwandlung wählen', legal: 'Nur legale Züge' },
      fr: { white: 'AUX BLANCS DE JOUER', black: 'AUX NOIRS DE JOUER', check: 'ÉCHEC', mate: 'ÉCHEC ET MAT', draw: 'NULLE', choose: 'Choisir la promotion', legal: 'Coups légaux uniquement' },
      it: { white: 'TOCCA AL BIANCO', black: 'TOCCA AL NERO', check: 'SCACCO', mate: 'SCACCO MATTO', draw: 'PATTA', choose: 'Scegli la promozione', legal: 'Solo mosse legali' }
    }[lang] || {};
  };

  function status() {
    const t = copy();
    if (game.in_checkmate()) return t.mate;
    if (game.in_draw()) return t.draw;
    if (game.in_check()) return `${game.turn() === 'w' ? t.white : t.black} · ${t.check}`;
    return game.turn() === 'w' ? t.white : t.black;
  }

  function rebuildPosition() {
    game.reset();
    timeline.slice(0, cursor).forEach(move => game.move(move));
  }

  function render() {
    const frame = boardNode();
    if (!frame) return;
    const position = game.board();
    frame.querySelectorAll('.board-square').forEach(square => {
      const name = square.dataset.square;
      const file = name.charCodeAt(0) - 97;
      const rank = 8 - Number(name[1]);
      const piece = position[rank][file];
      square.classList.remove('selected', 'legal-move', 'legal-capture', 'marked');
      if (selected === name) square.classList.add('selected');
      const move = legalMoves.find(item => item.to === name);
      if (move) square.classList.add(move.captured || move.flags.includes('e') ? 'legal-capture' : 'legal-move');
      square.innerHTML = piece ? `<img class="staunton-piece" draggable="false" alt="${assetFor(piece)}" src="https://lichess1.org/assets/piece/cburnett/${assetFor(piece)}.svg">` : '';
    });
    const banner = document.querySelector('#analysis .turn-banner span');
    if (banner) banner.textContent = status();
    const history = game.history();
    const line = document.querySelector('#analysis .turn-banner b');
    if (line) line.textContent = opening ? `${opening.name} · ${opening.eco}` : (history.length ? history.slice(-1)[0] : 'Study board · starting position');
    const strip = document.querySelector('#analysis .move-strip span');
    if (strip) strip.innerHTML = history.slice(-6).map(move => `<b>${move}</b>`).join('') || '<b>Start a legal line</b>';
    renderNotation(history);
    const back = document.querySelector('#analysis .move-back');
    const forward = document.querySelector('#analysis .move-forward');
    if (back) back.disabled = cursor === 0;
    if (forward) forward.disabled = cursor >= timeline.length;
  }

  function select(square) {
    const piece = game.get(square);
    if (!piece || piece.color !== game.turn()) { selected = null; legalMoves = []; render(); return; }
    selected = square;
    legalMoves = game.moves({ square, verbose: true });
    render();
  }

  function finishMove(move) {
    timeline = timeline.slice(0, cursor);
    timeline.push(move);
    cursor += 1;
    rebuildPosition();
    selected = null;
    legalMoves = [];
    render();
  }

  function choosePromotion(move) {
    const t = copy();
    promotionSheet.innerHTML = `<section><h3>${t.choose}</h3><div>${['q','r','b','n'].map(piece => `<button data-piece="${piece}"><img src="https://lichess1.org/assets/piece/cburnett/${game.turn()}${pieceName[piece]}.svg" alt="${piece}"></button>`).join('')}</div></section>`;
    promotionSheet.classList.add('open');
    promotionSheet.querySelectorAll('button').forEach(button => button.onclick = () => {
      promotionSheet.classList.remove('open');
      finishMove({ from: move.from, to: move.to, promotion: button.dataset.piece });
    });
  }

  document.addEventListener('click', event => {
    const square = event.target.closest('#analysis .board-frame .board-square');
    if (!square) return;
    event.preventDefault();
    const target = square.dataset.square;
    if (!selected) return select(target);
    const chosen = legalMoves.filter(move => move.to === target);
    if (!chosen.length) return select(target);
    if (chosen.some(move => move.promotion)) return choosePromotion(chosen[0]);
    finishMove({ from: selected, to: target });
  });

  document.querySelector('#reset-board')?.addEventListener('click', () => {
    game.reset(); selected = null; legalMoves = []; opening = null; timeline = []; cursor = 0;
    window.setTimeout(render, 0);
  });
  document.querySelector('#analysis .move-back')?.addEventListener('click', () => {
    if (!cursor) return;
    cursor -= 1; selected = null; legalMoves = []; rebuildPosition(); render();
  });
  document.querySelector('#analysis .move-forward')?.addEventListener('click', () => {
    if (cursor >= timeline.length) return;
    cursor += 1; selected = null; legalMoves = []; rebuildPosition(); render();
  });
  window.addEventListener('hamle:languagechange', render);
  window.resetStudyChess = () => { game.reset(); selected = null; legalMoves = []; opening = null; timeline = []; cursor = 0; render(); };
  window.loadStudyOpening = (name, eco) => {
    const line = openingLines[name];
    if (!line) return;
    game.reset();
    timeline = line.map(move => {
      const played = game.move(move);
      return { from: played.from, to: played.to, promotion: played.promotion };
    });
    cursor = timeline.length;
    rebuildPosition();
    opening = { name, eco };
    selected = null;
    legalMoves = [];
    render();
  };
  render();
})();
