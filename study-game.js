(() => {
  if (typeof Chess === 'undefined') return;

  const game = new Chess();
  const pieceName = { p: 'P', n: 'N', b: 'B', r: 'R', q: 'Q', k: 'K' };
  let selected = null;
  let legalMoves = [];
  const promotionSheet = document.createElement('div');
  promotionSheet.className = 'promotion-sheet';
  document.body.appendChild(promotionSheet);

  const boardNode = () => document.querySelector('#analysis .board-frame');
  const squareNode = square => boardNode()?.querySelector(`[data-square="${square}"]`);
  const assetFor = piece => `${piece.color}${pieceName[piece.type]}`;
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
    const line = document.querySelector('#analysis .turn-banner b');
    if (line) line.textContent = game.history().length ? game.history().slice(-1)[0] : 'Study board · starting position';
    const strip = document.querySelector('#analysis .move-strip span');
    if (strip) strip.innerHTML = game.history().slice(-6).map(move => `<b>${move}</b>`).join('') || '<b>Start a legal line</b>';
  }

  function select(square) {
    const piece = game.get(square);
    if (!piece || piece.color !== game.turn()) { selected = null; legalMoves = []; render(); return; }
    selected = square;
    legalMoves = game.moves({ square, verbose: true });
    render();
  }

  function finishMove(move) {
    game.move(move);
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
    game.reset(); selected = null; legalMoves = [];
    window.setTimeout(render, 0);
  });
  window.addEventListener('hamle:languagechange', render);
  window.resetStudyChess = () => { game.reset(); selected = null; legalMoves = []; render(); };
  render();
})();
