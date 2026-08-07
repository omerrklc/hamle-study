(() => {
  if (typeof Chess === 'undefined') return;

  const game = new Chess();
  const pieceName = { p: 'P', n: 'N', b: 'B', r: 'R', q: 'Q', k: 'K' };
  const opponents = ['Alex R.', 'Mia S.', 'Jordan K.', 'Noah P.'];
  let selected = null;
  let legalMoves = [];
  let opening = null;
  let timeline = [];
  let cursor = 0;
  let onlineGame = false;
  let gameEnded = false;
  let opponentThinking = false;
  let drawPending = false;
  let opponentTimer = null;
  let opponent = '';
  let chatMessages = [];

  const promotionSheet = document.createElement('div');
  promotionSheet.className = 'promotion-sheet';
  document.body.appendChild(promotionSheet);

  const language = () => window.HamleI18n?.language?.() || localStorage.getItem('hamle-language') || 'en';
  const boardNode = () => document.querySelector('#analysis .board-frame');
  const assetFor = piece => `${piece.color}${pieceName[piece.type]}`;
  const time = () => new Intl.DateTimeFormat(language(), { hour: '2-digit', minute: '2-digit' }).format(new Date());
  const ui = () => ({
    en: { exit:'Exit focus', notation:'Move notation', start:'Starting position', white:'WHITE TO MOVE', black:'BLACK TO MOVE', check:'CHECK', mate:'CHECKMATE', drawn:'DRAW', choose:'Choose promotion', play:'Play random', resume:'Resume game', newGame:'New random game', playSub:'Get paired instantly and play a legal game', online:'Online now', live:'LIVE GAME', you:'You', draw:'Offer draw', resign:'Resign', chat:'Game chat', placeholder:'Message your opponent…', send:'Send', luck:'Good luck!', nice:'Nice move!', good:'Good game!', thinking:'Opponent is thinking…', confirmDraw:'Offer a draw?', drawDetail:'Your opponent can accept or decline. A sent offer cannot be withdrawn.', sendDraw:'Send offer', confirmResign:'Resign this game?', resignDetail:'The game ends immediately and your opponent wins.', resignNow:'Resign game', cancel:'Cancel', drawSent:'Draw offer sent', drawDeclined:'Your opponent declined the draw offer.', resigned:'You resigned · 0–1', ended:'Game over', reply:'Thanks — good luck!', local:'Random practice opponent' },
    tr: { exit:'Odaktan çık', notation:'Hamle notasyonu', start:'Başlangıç konumu', white:'BEYAZIN HAMLESİ', black:'SİYAHIN HAMLESİ', check:'ŞAH', mate:'ŞAH MAT', drawn:'BERABERE', choose:'Terfi taşını seç', play:'Rastgele oyna', resume:'Oyuna dön', newGame:'Yeni rastgele oyun', playSub:'Anında eşleş ve kurallara uygun bir oyun oyna', online:'Şimdi çevrimiçi', live:'CANLI OYUN', you:'Sen', draw:'Beraberlik teklif et', resign:'Terk et', chat:'Oyun sohbeti', placeholder:'Rakibine mesaj yaz…', send:'Gönder', luck:'İyi oyunlar!', nice:'Güzel hamle!', good:'Güzel oyundu!', thinking:'Rakip düşünüyor…', confirmDraw:'Beraberlik teklif edilsin mi?', drawDetail:'Rakibin kabul veya reddedebilir. Gönderilen teklif geri alınamaz.', sendDraw:'Teklifi gönder', confirmResign:'Oyunu terk etmek istiyor musun?', resignDetail:'Oyun hemen biter ve rakibin kazanır.', resignNow:'Oyunu terk et', cancel:'Vazgeç', drawSent:'Beraberlik teklifi gönderildi', drawDeclined:'Rakibin beraberlik teklifini reddetti.', resigned:'Terk ettin · 0–1', ended:'Oyun bitti', reply:'Teşekkürler — iyi oyunlar!', local:'Rastgele pratik rakibi' },
    de: { exit:'Fokus verlassen', notation:'Zugnotation', start:'Ausgangsstellung', white:'WEISS AM ZUG', black:'SCHWARZ AM ZUG', check:'SCHACH', mate:'SCHACHMATT', drawn:'REMIS', choose:'Umwandlung wählen', play:'Zufällig spielen', resume:'Partie fortsetzen', newGame:'Neue Zufallspartie', playSub:'Sofort paaren und eine regelgerechte Partie spielen', online:'Jetzt online', live:'LIVE-PARTIE', you:'Du', draw:'Remis anbieten', resign:'Aufgeben', chat:'Partiechat', placeholder:'Nachricht an den Gegner…', send:'Senden', luck:'Viel Glück!', nice:'Guter Zug!', good:'Gute Partie!', thinking:'Gegner denkt nach…', confirmDraw:'Remis anbieten?', drawDetail:'Der Gegner kann annehmen oder ablehnen. Das Angebot kann nicht zurückgezogen werden.', sendDraw:'Angebot senden', confirmResign:'Partie aufgeben?', resignDetail:'Die Partie endet sofort und dein Gegner gewinnt.', resignNow:'Partie aufgeben', cancel:'Abbrechen', drawSent:'Remisangebot gesendet', drawDeclined:'Der Gegner hat das Remisangebot abgelehnt.', resigned:'Du hast aufgegeben · 0–1', ended:'Partie beendet', reply:'Danke — viel Glück!', local:'Zufälliger Trainingsgegner' },
    fr: { exit:'Quitter le focus', notation:'Notation des coups', start:'Position initiale', white:'AUX BLANCS DE JOUER', black:'AUX NOIRS DE JOUER', check:'ÉCHEC', mate:'ÉCHEC ET MAT', drawn:'NULLE', choose:'Choisir la promotion', play:'Jouer au hasard', resume:'Reprendre la partie', newGame:'Nouvelle partie', playSub:'Être associé immédiatement et jouer une partie légale', online:'En ligne', live:'PARTIE EN DIRECT', you:'Vous', draw:'Proposer la nulle', resign:'Abandonner', chat:'Chat de partie', placeholder:'Écrire à votre adversaire…', send:'Envoyer', luck:'Bonne chance !', nice:'Joli coup !', good:'Belle partie !', thinking:'L’adversaire réfléchit…', confirmDraw:'Proposer la nulle ?', drawDetail:'Votre adversaire peut accepter ou refuser. L’offre ne peut pas être retirée.', sendDraw:'Envoyer l’offre', confirmResign:'Abandonner la partie ?', resignDetail:'La partie se termine immédiatement et votre adversaire gagne.', resignNow:'Abandonner', cancel:'Annuler', drawSent:'Proposition de nulle envoyée', drawDeclined:'Votre adversaire a refusé la nulle.', resigned:'Vous avez abandonné · 0–1', ended:'Partie terminée', reply:'Merci — bonne chance !', local:'Adversaire aléatoire' },
    it: { exit:'Esci dalla modalità focus', notation:'Notazione mosse', start:'Posizione iniziale', white:'TOCCA AL BIANCO', black:'TOCCA AL NERO', check:'SCACCO', mate:'SCACCO MATTO', drawn:'PATTA', choose:'Scegli la promozione', play:'Gioca casuale', resume:'Riprendi partita', newGame:'Nuova partita casuale', playSub:'Abbinamento immediato e partita secondo le regole', online:'Online ora', live:'PARTITA LIVE', you:'Tu', draw:'Offri patta', resign:'Abbandona', chat:'Chat di partita', placeholder:'Scrivi al tuo avversario…', send:'Invia', luck:'Buona fortuna!', nice:'Bella mossa!', good:'Bella partita!', thinking:'L’avversario sta pensando…', confirmDraw:'Offrire patta?', drawDetail:'L’avversario può accettare o rifiutare. L’offerta non può essere ritirata.', sendDraw:'Invia offerta', confirmResign:'Abbandonare la partita?', resignDetail:'La partita termina subito e il tuo avversario vince.', resignNow:'Abbandona partita', cancel:'Annulla', drawSent:'Offerta di patta inviata', drawDeclined:'L’avversario ha rifiutato la patta.', resigned:'Hai abbandonato · 0–1', ended:'Partita terminata', reply:'Grazie — buona fortuna!', local:'Avversario casuale' }
  }[language()] || {});

  const openingLines = {
    'Italian Game': ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'], 'Sicilian Defense': ['e4', 'c5'],
    'Queen’s Gambit': ['d4', 'd5', 'c4'], 'Queenâ€™s Gambit': ['d4', 'd5', 'c4'],
    'Ruy Lopez': ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'], 'Caro-Kann': ['e4', 'c6', 'd4', 'd5'],
    'King’s Indian': ['d4', 'Nf6', 'c4', 'g6'], 'Kingâ€™s Indian': ['d4', 'Nf6', 'c4', 'g6']
  };

  function focusButton() {
    let button = document.querySelector('#analysis .study-focus-exit');
    if (!button) {
      button = document.createElement('button');
      button.className = 'study-focus-exit';
      button.type = 'button';
      button.innerHTML = '<span aria-hidden="true">×</span><b></b>';
      button.onclick = () => document.body.classList.remove('study-focus-mode');
      document.querySelector('#analysis')?.appendChild(button);
    }
    button.querySelector('b').textContent = ui().exit;
    button.setAttribute('aria-label', ui().exit);
    return button;
  }

  function playButton() {
    let button = document.querySelector('#board-study .study-random-play');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'study-random-play';
      button.innerHTML = '<span>▶</span><span><b></b><small></small></span><i>→</i>';
      button.onclick = () => onlineGame && !gameEnded ? enterFocusMode() : startRandomGame();
      document.querySelector('#board-study .turn-banner')?.before(button);
    }
    const t = ui();
    button.querySelector('b').textContent = onlineGame ? (gameEnded ? t.newGame : t.resume) : t.play;
    button.querySelector('small').textContent = t.playSub;
    return button;
  }

  function enterFocusMode() {
    document.body.classList.add('study-focus-mode');
    focusButton();
  }

  function notationPanel() {
    let panel = document.querySelector('#analysis .notation-panel');
    if (panel) return panel;
    const frame = boardNode();
    if (!frame) return null;
    const workspace = document.createElement('div');
    workspace.className = 'study-workspace';
    const side = document.createElement('div');
    side.className = 'study-side-panel';
    panel = document.createElement('aside');
    panel.className = 'notation-panel';
    const live = document.createElement('aside');
    live.className = 'study-live-panel';
    frame.before(workspace);
    side.append(panel, live);
    workspace.append(frame, side);
    return panel;
  }

  function timelineNotation() {
    const replay = new Chess();
    return timeline.map(move => replay.move(move)?.san || '');
  }

  function renderNotation(history) {
    const panel = notationPanel();
    if (!panel) return;
    const t = ui();
    const rows = [];
    for (let index = 0; index < history.length; index += 2) {
      rows.push(`<li><b>${index / 2 + 1}.</b><button class="notation-move ${cursor === index + 1 ? 'active' : ''}" data-ply="${index + 1}">${history[index] || ''}</button><button class="notation-move ${cursor === index + 2 ? 'active' : ''}" data-ply="${index + 2}" ${history[index + 1] ? '' : 'disabled'}>${history[index + 1] || ''}</button></li>`);
    }
    panel.innerHTML = `<p>${opening ? `${opening.eco} · ${opening.name}` : t.notation}</p><ol>${rows.join('') || `<li class="notation-empty">${t.start}</li>`}</ol>`;
    panel.querySelectorAll('.notation-move').forEach(button => button.onclick = () => {
      if (onlineGame && !gameEnded) return;
      cursor = Number(button.dataset.ply);
      selected = null;
      legalMoves = [];
      rebuildPosition();
      render();
    });
  }

  function appendChat(owner, message, system = false) {
    chatMessages.push({ owner, message, system, at: time() });
    renderLivePanel();
  }

  function renderLivePanel() {
    const panel = document.querySelector('#analysis .study-live-panel');
    if (!panel || !onlineGame) {
      if (panel) panel.innerHTML = '';
      return;
    }
    const t = ui();
    panel.innerHTML = `<header><span><small>${t.live}</small><b>${opponent}</b><i>● ${t.online}</i></span><strong>10:00</strong></header><div class="study-game-actions"><button class="study-draw" ${drawPending || gameEnded ? 'disabled' : ''}><span>½</span>${t.draw}</button><button class="study-resign" ${gameEnded ? 'disabled' : ''}><span>⚑</span>${t.resign}</button></div><div class="study-chat-title"><b>${t.chat}</b><small>${gameEnded ? t.ended : t.local}</small></div><div class="study-chat-log" aria-live="polite"></div><div class="study-quick-chat"><button data-message="${t.luck}" ${gameEnded ? 'disabled' : ''}>${t.luck}</button><button data-message="${t.nice}" ${gameEnded ? 'disabled' : ''}>${t.nice}</button><button data-message="${t.good}" ${gameEnded ? 'disabled' : ''}>${t.good}</button></div><form class="study-chat-form"><input maxlength="240" autocomplete="off" placeholder="${t.placeholder}" aria-label="${t.placeholder}" ${gameEnded ? 'disabled' : ''}><button ${gameEnded ? 'disabled' : ''}>${t.send}</button></form>${gameEnded ? `<p class="study-game-result">${t.resigned}</p>` : ''}`;
    const log = panel.querySelector('.study-chat-log');
    chatMessages.forEach(item => {
      const row = document.createElement('div');
      row.className = `study-chat-message ${item.owner === 'you' ? 'own' : ''} ${item.system ? 'system' : ''}`;
      const bubble = document.createElement('p');
      bubble.textContent = item.message;
      const stamp = document.createElement('time');
      stamp.textContent = item.at;
      row.append(bubble, stamp);
      log.appendChild(row);
    });
    log.scrollTop = log.scrollHeight;
    panel.querySelector('.study-draw')?.addEventListener('click', () => showActionDialog('draw'));
    panel.querySelector('.study-resign')?.addEventListener('click', () => showActionDialog('resign'));
    panel.querySelectorAll('.study-quick-chat button').forEach(button => button.onclick = () => {
      const input = panel.querySelector('input');
      input.value = button.dataset.message;
      input.focus();
    });
    panel.querySelector('form').onsubmit = event => {
      event.preventDefault();
      if (gameEnded) return;
      const input = event.currentTarget.querySelector('input');
      const message = input.value.trim();
      if (!message) return;
      input.value = '';
      appendChat('you', message);
      window.setTimeout(() => !gameEnded && appendChat('opponent', t.reply), 650);
    };
  }

  function showActionDialog(type) {
    if (gameEnded || (type === 'draw' && drawPending)) return;
    document.querySelector('.study-action-dialog')?.remove();
    const t = ui();
    const dialog = document.createElement('div');
    dialog.className = 'study-action-dialog';
    dialog.innerHTML = `<section role="dialog" aria-modal="true"><span>${type === 'draw' ? '½' : '⚑'}</span><h3>${type === 'draw' ? t.confirmDraw : t.confirmResign}</h3><p>${type === 'draw' ? t.drawDetail : t.resignDetail}</p><div><button class="study-cancel">${t.cancel}</button><button class="study-confirm ${type === 'resign' ? 'danger' : ''}">${type === 'draw' ? t.sendDraw : t.resignNow}</button></div></section>`;
    document.body.appendChild(dialog);
    dialog.querySelector('.study-cancel').onclick = () => dialog.remove();
    dialog.onclick = event => { if (event.target === dialog) dialog.remove(); };
    dialog.querySelector('.study-confirm').onclick = () => {
      dialog.remove();
      if (type === 'resign') {
        gameEnded = true;
        opponentThinking = false;
        window.clearTimeout(opponentTimer);
        appendChat('system', t.resigned, true);
        render();
        return;
      }
      drawPending = true;
      appendChat('system', t.drawSent, true);
      render();
      window.setTimeout(() => {
        if (gameEnded || !drawPending) return;
        drawPending = false;
        appendChat('system', t.drawDeclined, true);
        render();
      }, 1800);
    };
  }

  function status() {
    const t = ui();
    if (gameEnded) return t.ended;
    if (opponentThinking) return t.thinking;
    if (game.in_checkmate()) return t.mate;
    if (game.in_draw()) return t.drawn;
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
    if (line) line.textContent = onlineGame ? `${ui().you} vs ${opponent}` : opening ? `${opening.name} · ${opening.eco}` : (history.at(-1) || `${ui().notation} · ${ui().start}`);
    const strip = document.querySelector('#analysis .move-strip span');
    if (strip) strip.innerHTML = history.slice(-6).map(move => `<b>${move}</b>`).join('') || `<b>${ui().start}</b>`;
    renderNotation(timelineNotation());
    renderLivePanel();
    const locked = onlineGame && !gameEnded;
    const back = document.querySelector('#analysis .move-back');
    const forward = document.querySelector('#analysis .move-forward');
    if (back) back.disabled = locked || cursor === 0;
    if (forward) forward.disabled = locked || cursor >= timeline.length;
    focusButton();
    playButton();
  }

  function select(square) {
    if (gameEnded || opponentThinking || (onlineGame && game.turn() !== 'w')) return;
    const piece = game.get(square);
    if (!piece || piece.color !== game.turn()) { selected = null; legalMoves = []; render(); return; }
    selected = square;
    legalMoves = game.moves({ square, verbose: true });
    render();
  }

  function scheduleOpponentMove() {
    if (!onlineGame || gameEnded || game.turn() !== 'b') return;
    opponentThinking = true;
    render();
    window.clearTimeout(opponentTimer);
    opponentTimer = window.setTimeout(() => {
      if (!onlineGame || gameEnded) return;
      rebuildPosition();
      const moves = game.moves({ verbose: true });
      if (!moves.length) { gameEnded = true; opponentThinking = false; render(); return; }
      const chosen = moves[Math.floor(Math.random() * moves.length)];
      timeline = timeline.slice(0, cursor);
      timeline.push({ from: chosen.from, to: chosen.to, promotion: chosen.promotion });
      cursor += 1;
      rebuildPosition();
      opponentThinking = false;
      if (game.game_over()) gameEnded = true;
      render();
    }, 700);
  }

  function finishMove(move) {
    timeline = timeline.slice(0, cursor);
    timeline.push(move);
    cursor += 1;
    rebuildPosition();
    selected = null;
    legalMoves = [];
    if (game.game_over()) gameEnded = true;
    enterFocusMode();
    render();
    scheduleOpponentMove();
  }

  function choosePromotion(move) {
    const t = ui();
    promotionSheet.innerHTML = `<section><h3>${t.choose}</h3><div>${['q','r','b','n'].map(piece => `<button data-piece="${piece}"><img src="https://lichess1.org/assets/piece/cburnett/${game.turn()}${pieceName[piece]}.svg" alt="${piece}"></button>`).join('')}</div></section>`;
    promotionSheet.classList.add('open');
    promotionSheet.querySelectorAll('button').forEach(button => button.onclick = () => {
      promotionSheet.classList.remove('open');
      finishMove({ from: move.from, to: move.to, promotion: button.dataset.piece });
    });
  }

  function stopOnlineGame() {
    window.clearTimeout(opponentTimer);
    onlineGame = false;
    gameEnded = false;
    opponentThinking = false;
    drawPending = false;
    chatMessages = [];
    document.body.classList.remove('study-game-active');
    document.querySelector('.study-action-dialog')?.remove();
  }

  function startRandomGame() {
    stopOnlineGame();
    game.reset();
    selected = null;
    legalMoves = [];
    opening = null;
    timeline = [];
    cursor = 0;
    onlineGame = true;
    opponent = opponents[Math.floor(Math.random() * opponents.length)];
    chatMessages = [{ owner: 'system', message: ui().local, system: true, at: time() }];
    document.body.classList.add('study-game-active');
    enterFocusMode();
    render();
  }

  document.addEventListener('click', event => {
    const square = event.target.closest('#analysis .board-frame .board-square');
    if (!square) return;
    event.preventDefault();
    if (gameEnded || opponentThinking || (onlineGame && game.turn() !== 'w')) return;
    const target = square.dataset.square;
    if (!selected) return select(target);
    const chosen = legalMoves.filter(move => move.to === target);
    if (!chosen.length) return select(target);
    if (chosen.some(move => move.promotion)) return choosePromotion(chosen[0]);
    finishMove({ from: selected, to: target });
  });

  document.querySelector('#reset-board')?.addEventListener('click', () => {
    stopOnlineGame();
    game.reset(); selected = null; legalMoves = []; opening = null; timeline = []; cursor = 0;
    window.setTimeout(render, 0);
  });
  document.querySelector('#analysis .move-back')?.addEventListener('click', () => {
    if (!cursor || (onlineGame && !gameEnded)) return;
    cursor -= 1; selected = null; legalMoves = []; rebuildPosition(); render();
  });
  document.querySelector('#analysis .move-forward')?.addEventListener('click', () => {
    if (cursor >= timeline.length || (onlineGame && !gameEnded)) return;
    cursor += 1; selected = null; legalMoves = []; rebuildPosition(); render();
  });
  window.addEventListener('hamle:languagechange', render);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') document.body.classList.remove('study-focus-mode'); });
  document.addEventListener('click', event => {
    const navItem = event.target.closest('.bottom-nav .nav-item');
    if (navItem && navItem.dataset.target !== 'analysis') document.body.classList.remove('study-focus-mode');
  });
  window.resetStudyChess = () => { stopOnlineGame(); game.reset(); selected = null; legalMoves = []; opening = null; timeline = []; cursor = 0; render(); };
  window.loadStudyOpening = (name, eco) => {
    const line = openingLines[name];
    if (!line) return;
    stopOnlineGame();
    game.reset();
    timeline = line.map(move => { const played = game.move(move); return { from: played.from, to: played.to, promotion: played.promotion }; });
    cursor = timeline.length;
    rebuildPosition();
    opening = { name, eco };
    selected = null;
    legalMoves = [];
    enterFocusMode();
    render();
  };
  window.enterStudyFocus = enterFocusMode;
  render();
})();
