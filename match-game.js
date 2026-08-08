(() => {
  if (typeof Chess === 'undefined') return;

  const copy = {
    en: { kick:'PRACTICE MATCH', finding:'Finding an opponent…', looking:'Looking for a player who wants to practise this position right now.', your:'Your turn', opponentTurn:'Opponent’s turn', preview:'Every move is checked by the chess rules engine.', you:'You', white:'White', black:'Black', online:'Online now', draw:'Offer draw', resign:'Resign', chat:'Game chat', respectful:'Keep the conversation friendly and focused on the game.', placeholder:'Message your opponent…', send:'Send', luck:'Good luck!', good:'Good game!', think:'Nice move!', confirmDraw:'Offer a draw?', drawDetail:'Your opponent can accept or decline. A sent offer cannot be withdrawn.', sendDraw:'Send offer', confirmResign:'Resign this game?', resignDetail:'The game will end immediately and your opponent will win.', confirmResignButton:'Resign game', cancel:'Cancel', drawSent:'Draw offer sent', waiting:'Waiting for your opponent', drawDeclined:'Your opponent declined the draw offer.', gameOver:'Game over', resignedResult:'You resigned · 0–1', close:'Close game', opponentReply:'Thanks — let’s have a good game.', messageLimit:'Messages are limited to 240 characters.', ended:'This game has ended.', check:'Check', checkmate:'Checkmate', stalemate:'Stalemate', rulesDraw:'Draw', won:'You won · 1–0', lost:'You lost · 0–1', drawResult:'Draw · ½–½', promote:'Choose promotion', queen:'Queen', rook:'Rook', bishop:'Bishop', knight:'Knight', illegal:'That move is not legal.' },
    tr: { kick:'PRATİK EŞLEŞMESİ', finding:'Rakip aranıyor…', looking:'Bu pozisyonu şimdi çalışmak isteyen bir oyuncu aranıyor.', your:'Sıra sende', opponentTurn:'Rakibin sırası', preview:'Her hamle satranç kuralları motoruyla kontrol edilir.', you:'Sen', white:'Beyaz', black:'Siyah', online:'Şimdi çevrimiçi', draw:'Beraberlik teklif et', resign:'Terk et', chat:'Oyun sohbeti', respectful:'Sohbeti dostça ve oyunla ilgili tut.', placeholder:'Rakibine mesaj yaz…', send:'Gönder', luck:'İyi oyunlar!', good:'Güzel oyundu!', think:'Güzel hamle!', confirmDraw:'Beraberlik teklif edilsin mi?', drawDetail:'Rakibin kabul veya reddedebilir. Gönderilen teklif geri alınamaz.', sendDraw:'Teklifi gönder', confirmResign:'Oyunu terk etmek istiyor musun?', resignDetail:'Oyun hemen bitecek ve rakibin kazanacak.', confirmResignButton:'Oyunu terk et', cancel:'Vazgeç', drawSent:'Beraberlik teklifi gönderildi', waiting:'Rakibin bekleniyor', drawDeclined:'Rakibin beraberlik teklifini reddetti.', gameOver:'Oyun bitti', resignedResult:'Terk ettin · 0–1', close:'Oyunu kapat', opponentReply:'Teşekkürler — iyi oyunlar.', messageLimit:'Mesajlar 240 karakterle sınırlıdır.', ended:'Bu oyun sona erdi.', check:'Şah', checkmate:'Şah mat', stalemate:'Pat', rulesDraw:'Berabere', won:'Kazandın · 1–0', lost:'Kaybettin · 0–1', drawResult:'Berabere · ½–½', promote:'Terfi taşını seç', queen:'Vezir', rook:'Kale', bishop:'Fil', knight:'At', illegal:'Bu hamle kurallara uygun değil.' },
    de: { kick:'TRAININGSPARTIE', finding:'Gegner wird gesucht…', looking:'Wir suchen einen Spieler, der diese Stellung jetzt trainieren möchte.', your:'Du bist am Zug', opponentTurn:'Gegner ist am Zug', preview:'Jeder Zug wird von der Schachregel-Engine geprüft.', you:'Du', white:'Weiß', black:'Schwarz', online:'Jetzt online', draw:'Remis anbieten', resign:'Aufgeben', chat:'Partiechat', respectful:'Bleib freundlich und beim Spiel.', placeholder:'Nachricht an den Gegner…', send:'Senden', luck:'Viel Glück!', good:'Gute Partie!', think:'Guter Zug!', confirmDraw:'Remis anbieten?', drawDetail:'Der Gegner kann annehmen oder ablehnen. Das Angebot kann nicht zurückgezogen werden.', sendDraw:'Angebot senden', confirmResign:'Partie aufgeben?', resignDetail:'Die Partie endet sofort und dein Gegner gewinnt.', confirmResignButton:'Partie aufgeben', cancel:'Abbrechen', drawSent:'Remisangebot gesendet', waiting:'Warte auf den Gegner', drawDeclined:'Der Gegner hat das Remisangebot abgelehnt.', gameOver:'Partie beendet', resignedResult:'Du hast aufgegeben · 0–1', close:'Partie schließen', opponentReply:'Danke — auf eine gute Partie.', messageLimit:'Nachrichten sind auf 240 Zeichen begrenzt.', ended:'Diese Partie ist beendet.', check:'Schach', checkmate:'Schachmatt', stalemate:'Patt', rulesDraw:'Remis', won:'Du hast gewonnen · 1–0', lost:'Du hast verloren · 0–1', drawResult:'Remis · ½–½', promote:'Umwandlung wählen', queen:'Dame', rook:'Turm', bishop:'Läufer', knight:'Springer', illegal:'Dieser Zug ist nicht legal.' },
    fr: { kick:'PARTIE D’ENTRAÎNEMENT', finding:'Recherche d’un adversaire…', looking:'Recherche d’un joueur souhaitant travailler cette position maintenant.', your:'À vous de jouer', opponentTurn:'Tour de l’adversaire', preview:'Chaque coup est validé par le moteur de règles.', you:'Vous', white:'Blancs', black:'Noirs', online:'En ligne', draw:'Proposer la nulle', resign:'Abandonner', chat:'Chat de partie', respectful:'Restez cordial et concentré sur la partie.', placeholder:'Écrire à votre adversaire…', send:'Envoyer', luck:'Bonne chance !', good:'Belle partie !', think:'Joli coup !', confirmDraw:'Proposer la nulle ?', drawDetail:'Votre adversaire peut accepter ou refuser. L’offre ne peut pas être retirée.', sendDraw:'Envoyer l’offre', confirmResign:'Abandonner la partie ?', resignDetail:'La partie se terminera immédiatement et votre adversaire gagnera.', confirmResignButton:'Abandonner', cancel:'Annuler', drawSent:'Proposition de nulle envoyée', waiting:'En attente de votre adversaire', drawDeclined:'Votre adversaire a refusé la nulle.', gameOver:'Partie terminée', resignedResult:'Vous avez abandonné · 0–1', close:'Fermer la partie', opponentReply:'Merci — bonne partie.', messageLimit:'Les messages sont limités à 240 caractères.', ended:'Cette partie est terminée.', check:'Échec', checkmate:'Échec et mat', stalemate:'Pat', rulesDraw:'Nulle', won:'Vous avez gagné · 1–0', lost:'Vous avez perdu · 0–1', drawResult:'Nulle · ½–½', promote:'Choisir la promotion', queen:'Dame', rook:'Tour', bishop:'Fou', knight:'Cavalier', illegal:'Ce coup n’est pas légal.' },
    it: { kick:'PARTITA DI PRATICA', finding:'Ricerca avversario…', looking:'Cerchiamo un giocatore che vuole esercitarsi su questa posizione ora.', your:'Tocca a te', opponentTurn:'Tocca all’avversario', preview:'Ogni mossa viene verificata dal motore delle regole.', you:'Tu', white:'Bianco', black:'Nero', online:'Online ora', draw:'Offri patta', resign:'Abbandona', chat:'Chat di partita', respectful:'Mantieni la conversazione cordiale e inerente alla partita.', placeholder:'Scrivi al tuo avversario…', send:'Invia', luck:'Buona fortuna!', good:'Bella partita!', think:'Bella mossa!', confirmDraw:'Offrire patta?', drawDetail:'L’avversario può accettare o rifiutare. L’offerta non può essere ritirata.', sendDraw:'Invia offerta', confirmResign:'Abbandonare la partita?', resignDetail:'La partita terminerà subito e il tuo avversario vincerà.', confirmResignButton:'Abbandona partita', cancel:'Annulla', drawSent:'Offerta di patta inviata', waiting:'In attesa dell’avversario', drawDeclined:'L’avversario ha rifiutato la patta.', gameOver:'Partita terminata', resignedResult:'Hai abbandonato · 0–1', close:'Chiudi partita', opponentReply:'Grazie — buona partita.', messageLimit:'I messaggi sono limitati a 240 caratteri.', ended:'Questa partita è terminata.', check:'Scacco', checkmate:'Scacco matto', stalemate:'Stallo', rulesDraw:'Patta', won:'Hai vinto · 1–0', lost:'Hai perso · 0–1', drawResult:'Patta · ½–½', promote:'Scegli la promozione', queen:'Donna', rook:'Torre', bishop:'Alfiere', knight:'Cavallo', illegal:'Questa mossa non è legale.' }
  };

  const positions = {
    lucena: {
      title: { en:'Lucena endgame', tr:'Lucena oyun sonu', de:'Lucena-Endspiel', fr:'Finale de Lucena', it:'Finale di Lucena' },
      fen: '1K6/1P3k2/3R4/8/8/8/r7/8 w - - 0 1'
    },
    minority: {
      title: { en:'Minority attack', tr:'Azınlık hücumu', de:'Minoritätsangriff', fr:'Attaque de minorité', it:'Attacco di minoranza' },
      moves: ['d4','d5','c4','e6','Nc3','Nf6','Bg5','Be7','e3','O-O','Nf3','h6','Bh4','b6','cxd5','exd5']
    },
    attack: {
      title: { en:'Italian: pressure on f7', tr:'İtalyan: f7 baskısı', de:'Italienisch: Druck auf f7', fr:'Italienne : pression sur f7', it:'Italiana: pressione su f7' },
      moves: ['e4','e5','Nf3','Nc6','Bc4','Nf6','d3','Bc5','O-O','d6']
    }
  };
  const players = ['Alex R.','Mia S.','Jordan K.','Noah P.'];
  const overlay = document.createElement('div');
  overlay.className = 'practice-match';
  document.body.appendChild(overlay);

  const language = () => window.HamleI18n?.language?.() || localStorage.getItem('hamle-language') || 'en';
  const text = () => copy[language()] || copy.en;
  const time = () => new Intl.DateTimeFormat(language(), { hour:'2-digit', minute:'2-digit' }).format(new Date());
  const assetFor = piece => `${piece.color}${piece.type.toUpperCase()}`;

  function createPosition(position) {
    const game = new Chess();
    if (position.fen) {
      if (!game.load(position.fen)) throw new Error(`Invalid study FEN: ${position.fen}`);
      return game;
    }
    for (const move of position.moves || []) {
      if (!game.move(move)) throw new Error(`Invalid study move: ${move}`);
    }
    return game;
  }

  function boardMarkup(game, selected, targets, userSide, lastMove) {
    const squares = [];
    for (let rank = 8; rank >= 1; rank -= 1) for (const file of 'abcdefgh') squares.push(`${file}${rank}`);
    if (userSide === 'b') squares.reverse();
    return squares.map(square => {
      const piece = game.get(square);
      const target = targets.find(move => move.to === square);
      const classes = [selected === square ? 'selected' : '', target ? (target.captured || target.flags.includes('e') ? 'legal-capture' : 'legal-move') : '', lastMove?.includes(square) ? 'last-move' : ''].filter(Boolean).join(' ');
      return `<button class="match-square ${classes}" data-square="${square}" aria-label="${square}">${piece ? `<img src="https://lichess1.org/assets/piece/cburnett/${assetFor(piece)}.svg" alt="${assetFor(piece)}">` : ''}</button>`;
    }).join('');
  }

  function render(positionId, opponent, userSide) {
    const t = text();
    const position = positions[positionId] || positions.attack;
    const game = createPosition(position);
    let selected = null;
    let targets = [];
    let ended = false;
    let drawPending = false;
    let opponentThinking = false;
    let opponentTimer = null;
    let lastMove = null;

    overlay.innerHTML = `<section class="match-sheet">
      <header class="match-header"><div><p class="match-kicker">${t.kick}</p><h2>${position.title[language()] || position.title.en}</h2></div><button class="match-close" aria-label="Close">×</button></header>
      <div class="match-layout">
        <div class="match-play">
          <div class="match-players"><span>${t.you}<b>${userSide === 'w' ? t.white : t.black}</b></span><i>vs</i><span>${opponent}<b>${t.online}</b></span></div>
          <p class="match-note">${t.preview}</p><div class="match-board"></div>
          <div class="match-status" aria-live="polite"><b></b><span>10:00 · 10:00</span></div>
          <div class="match-actions"><button class="match-draw"><span>½</span>${t.draw}</button><button class="match-resign"><span>⚑</span>${t.resign}</button></div>
        </div>
        <aside class="match-chat"><header><span><b>${t.chat}</b><small>● ${opponent}</small></span></header><div class="match-chat-log" aria-live="polite"><p class="match-system">${t.respectful}</p></div><div class="quick-chat"><button data-message="${t.luck}">${t.luck}</button><button data-message="${t.good}">${t.good}</button><button data-message="${t.think}">${t.think}</button></div><form class="match-chat-form"><input maxlength="240" autocomplete="off" placeholder="${t.placeholder}" aria-label="${t.placeholder}"><button type="submit">${t.send}</button></form><small class="match-chat-limit">${t.messageLimit}</small></aside>
      </div>
      <div class="match-confirm" role="dialog" aria-modal="true"><div><span class="match-confirm-icon"></span><h3></h3><p></p><div><button class="confirm-cancel">${t.cancel}</button><button class="confirm-action"></button></div></div></div>
      <div class="match-promotion" role="dialog" aria-modal="true"><div><h3>${t.promote}</h3><div class="promotion-options"></div></div></div>
      <div class="match-result" role="dialog" aria-modal="true"><div><span>♔</span><h3>${t.gameOver}</h3><p></p><button>${t.close}</button></div></div>
    </section>`;
    overlay.classList.add('open');

    const chatLog = overlay.querySelector('.match-chat-log');
    const appendMessage = (owner, message, kind = '') => {
      const row = document.createElement('div');
      row.className = `match-message ${owner === 'you' ? 'own' : ''} ${kind}`;
      const bubble = document.createElement('p');
      bubble.textContent = message;
      const stamp = document.createElement('time');
      stamp.textContent = time();
      row.append(bubble, stamp);
      chatLog.appendChild(row);
      chatLog.scrollTop = chatLog.scrollHeight;
    };
    const setStatus = (title, detail = '10:00 · 10:00') => {
      overlay.querySelector('.match-status b').textContent = title;
      overlay.querySelector('.match-status span').textContent = detail;
    };
    const disableGameControls = () => overlay.querySelectorAll('.match-actions button,.match-chat-form input,.match-chat-form button,.quick-chat button').forEach(control => control.disabled = true);
    const finishByRules = () => {
      if (!game.game_over()) return false;
      ended = true;
      opponentThinking = false;
      window.clearTimeout(opponentTimer);
      disableGameControls();
      let label = t.drawResult;
      let heading = game.in_stalemate() ? t.stalemate : t.rulesDraw;
      if (game.in_checkmate()) {
        const userWon = game.turn() !== userSide;
        label = userWon ? t.won : t.lost;
        heading = t.checkmate;
      }
      setStatus(heading, label);
      const result = overlay.querySelector('.match-result');
      result.querySelector('h3').textContent = heading;
      result.querySelector('p').textContent = label;
      window.setTimeout(() => result.classList.add('open'), 350);
      return true;
    };
    const currentStatus = () => {
      if (ended) return;
      const turnLabel = game.turn() === userSide ? t.your : t.opponentTurn;
      setStatus(game.in_check() ? `${turnLabel} · ${t.check}` : turnLabel, game.history().at(-1) || '10:00 · 10:00');
    };
    const paint = () => {
      overlay.querySelector('.match-board').innerHTML = boardMarkup(game, selected, targets, userSide, lastMove);
      overlay.querySelectorAll('.match-square').forEach(cell => cell.onclick = () => handleSquare(cell.dataset.square));
      currentStatus();
    };
    const scheduleOpponent = () => {
      if (ended || game.turn() === userSide) return;
      opponentThinking = true;
      setStatus(t.opponentTurn, '…');
      window.clearTimeout(opponentTimer);
      opponentTimer = window.setTimeout(() => {
        if (ended) return;
        const moves = game.moves({ verbose:true });
        if (!moves.length) return finishByRules();
        const move = moves[Math.floor(Math.random() * moves.length)];
        game.move({ from:move.from, to:move.to, promotion:move.promotion });
        lastMove = [move.from, move.to];
        opponentThinking = false;
        selected = null;
        targets = [];
        paint();
        finishByRules();
      }, 700);
    };
    const completeMove = move => {
      const played = game.move({ from:move.from, to:move.to, promotion:move.promotion });
      if (!played) { appendMessage('system', t.illegal, 'system-message'); selected = null; targets = []; paint(); return; }
      lastMove = [played.from, played.to];
      selected = null;
      targets = [];
      paint();
      if (!finishByRules()) scheduleOpponent();
    };
    const choosePromotion = moves => {
      const promotion = overlay.querySelector('.match-promotion');
      const labels = { q:t.queen, r:t.rook, b:t.bishop, n:t.knight };
      const options = promotion.querySelector('.promotion-options');
      options.innerHTML = '';
      moves.forEach(move => {
        const button = document.createElement('button');
        const piece = { color:userSide, type:move.promotion };
        button.innerHTML = `<img src="https://lichess1.org/assets/piece/cburnett/${assetFor(piece)}.svg" alt=""><span>${labels[move.promotion]}</span>`;
        button.onclick = () => { promotion.classList.remove('open'); completeMove(move); };
        options.appendChild(button);
      });
      promotion.classList.add('open');
    };
    const handleSquare = square => {
      if (ended || opponentThinking || game.turn() !== userSide) return;
      const piece = game.get(square);
      if (!selected) {
        if (piece?.color !== userSide) return;
        selected = square;
        targets = game.moves({ square, verbose:true });
        paint();
        return;
      }
      const candidates = targets.filter(move => move.to === square);
      if (candidates.length) {
        if (candidates.some(move => move.promotion)) choosePromotion(candidates);
        else completeMove(candidates[0]);
        return;
      }
      if (piece?.color === userSide) {
        selected = square;
        targets = game.moves({ square, verbose:true });
      } else {
        selected = null;
        targets = [];
      }
      paint();
    };

    const hideConfirm = () => overlay.querySelector('.match-confirm').classList.remove('open');
    const showConfirm = type => {
      const confirm = overlay.querySelector('.match-confirm');
      const action = confirm.querySelector('.confirm-action');
      confirm.querySelector('.match-confirm-icon').textContent = type === 'draw' ? '½' : '⚑';
      confirm.querySelector('h3').textContent = type === 'draw' ? t.confirmDraw : t.confirmResign;
      confirm.querySelector('p').textContent = type === 'draw' ? t.drawDetail : t.resignDetail;
      action.textContent = type === 'draw' ? t.sendDraw : t.confirmResignButton;
      action.classList.toggle('danger', type === 'resign');
      action.onclick = () => {
        hideConfirm();
        if (type === 'draw') {
          drawPending = true;
          overlay.querySelector('.match-draw').disabled = true;
          setStatus(t.drawSent, t.waiting);
          appendMessage('system', t.drawSent, 'system-message');
          window.setTimeout(() => {
            if (ended || !drawPending) return;
            drawPending = false;
            overlay.querySelector('.match-draw').disabled = false;
            currentStatus();
            appendMessage('system', t.drawDeclined, 'system-message');
          }, 1800);
          return;
        }
        ended = true;
        window.clearTimeout(opponentTimer);
        disableGameControls();
        setStatus(t.gameOver, '0–1');
        appendMessage('system', t.ended, 'system-message');
        const result = overlay.querySelector('.match-result');
        result.querySelector('p').textContent = t.resignedResult;
        result.classList.add('open');
      };
      confirm.classList.add('open');
    };

    overlay.querySelector('.match-close').onclick = () => { window.clearTimeout(opponentTimer); overlay.classList.remove('open'); };
    overlay.querySelector('.match-draw').onclick = () => !drawPending && !ended && showConfirm('draw');
    overlay.querySelector('.match-resign').onclick = () => !ended && showConfirm('resign');
    overlay.querySelector('.confirm-cancel').onclick = hideConfirm;
    overlay.querySelector('.match-result button').onclick = () => overlay.classList.remove('open');
    overlay.querySelectorAll('.quick-chat button').forEach(button => button.onclick = () => { const input = overlay.querySelector('.match-chat-form input'); input.value = button.dataset.message; input.focus(); });
    overlay.querySelector('.match-chat-form').onsubmit = event => {
      event.preventDefault();
      if (ended) return;
      const input = event.currentTarget.querySelector('input');
      const message = input.value.trim();
      if (!message) return;
      appendMessage('you', message);
      input.value = '';
      window.setTimeout(() => !ended && appendMessage('opponent', t.opponentReply), 700);
    };
    paint();
    finishByRules() || scheduleOpponent();
  }

  window.startPracticeMatch = (positionId, requestedSide = 'w') => {
    const opponent = players[Math.floor(Math.random() * players.length)];
    const userSide = requestedSide === 'random' ? (Math.random() < .5 ? 'w' : 'b') : requestedSide;
    const t = text();
    overlay.innerHTML = `<section class="matching-sheet"><span class="matching-pulse"></span><p class="match-kicker">${t.kick}</p><h2>${t.finding}</h2><p>${t.looking}</p></section>`;
    overlay.classList.add('open');
    window.setTimeout(() => render(positionId, opponent, userSide), 900);
  };

  document.addEventListener('click', event => {
    const action = event.target.closest('.position-action');
    if (!action) return;
    event.stopPropagation();
    const card = action.closest('.study-position-card');
    const choices = [...card.querySelectorAll('.side-choice button')];
    const selectedChoice = choices.findIndex(button => button.classList.contains('selected'));
    const side = selectedChoice === 1 ? 'random' : selectedChoice === 2 ? 'b' : 'w';
    window.startPracticeMatch(card.dataset.position, side);
  });
})();
