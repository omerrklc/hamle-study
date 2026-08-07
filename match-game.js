(() => {
  const copy = {
    en: {
      kick: 'PRACTICE MATCH', finding: 'Finding an opponent…', looking: 'Looking for a player who wants to practise this position right now.',
      your: 'Your turn', preview: 'Local practice preview — live matchmaking will use this same flow.', you: 'You', white: 'White', online: 'Online now',
      draw: 'Offer draw', resign: 'Resign', chat: 'Game chat', respectful: 'Keep the conversation friendly and focused on the game.',
      placeholder: 'Message your opponent…', send: 'Send', luck: 'Good luck!', game: 'Good game!', think: 'Nice move!',
      confirmDraw: 'Offer a draw?', drawDetail: 'Your opponent can accept or decline. A sent offer cannot be withdrawn.', sendDraw: 'Send offer',
      confirmResign: 'Resign this game?', resignDetail: 'The game will end immediately and your opponent will win.', confirmResignButton: 'Resign game', cancel: 'Cancel',
      drawSent: 'Draw offer sent', waiting: 'Waiting for your opponent', drawDeclined: 'Your opponent declined the draw offer.',
      resigned: 'Game over', resignedResult: 'You resigned · 0–1', close: 'Close game', opponentReply: 'Thanks — let’s have a good game.',
      messageLimit: 'Messages are limited to 240 characters.', ended: 'This game has ended.'
    },
    tr: {
      kick: 'PRATİK EŞLEŞMESİ', finding: 'Rakip aranıyor…', looking: 'Bu pozisyonu şimdi çalışmak isteyen bir oyuncu aranıyor.',
      your: 'Sıra sende', preview: 'Yerel pratik önizlemesi — canlı eşleşme aynı akışı kullanacak.', you: 'Sen', white: 'Beyaz', online: 'Şimdi çevrimiçi',
      draw: 'Beraberlik teklif et', resign: 'Terk et', chat: 'Oyun sohbeti', respectful: 'Sohbeti dostça ve oyunla ilgili tut.',
      placeholder: 'Rakibine mesaj yaz…', send: 'Gönder', luck: 'İyi oyunlar!', game: 'Güzel oyundu!', think: 'Güzel hamle!',
      confirmDraw: 'Beraberlik teklif edilsin mi?', drawDetail: 'Rakibin kabul veya reddedebilir. Gönderilen teklif geri alınamaz.', sendDraw: 'Teklifi gönder',
      confirmResign: 'Oyunu terk etmek istiyor musun?', resignDetail: 'Oyun hemen bitecek ve rakibin kazanacak.', confirmResignButton: 'Oyunu terk et', cancel: 'Vazgeç',
      drawSent: 'Beraberlik teklifi gönderildi', waiting: 'Rakibin bekleniyor', drawDeclined: 'Rakibin beraberlik teklifini reddetti.',
      resigned: 'Oyun bitti', resignedResult: 'Terk ettin · 0–1', close: 'Oyunu kapat', opponentReply: 'Teşekkürler — iyi oyunlar.',
      messageLimit: 'Mesajlar 240 karakterle sınırlıdır.', ended: 'Bu oyun sona erdi.'
    },
    de: {
      kick: 'TRAININGSPARTIE', finding: 'Gegner wird gesucht…', looking: 'Wir suchen einen Spieler, der diese Stellung jetzt trainieren möchte.',
      your: 'Du bist am Zug', preview: 'Lokale Trainingsvorschau — das Live-Matching nutzt denselben Ablauf.', you: 'Du', white: 'Weiß', online: 'Jetzt online',
      draw: 'Remis anbieten', resign: 'Aufgeben', chat: 'Partiechat', respectful: 'Bleib freundlich und beim Spiel.',
      placeholder: 'Nachricht an den Gegner…', send: 'Senden', luck: 'Viel Glück!', game: 'Gute Partie!', think: 'Guter Zug!',
      confirmDraw: 'Remis anbieten?', drawDetail: 'Der Gegner kann annehmen oder ablehnen. Das Angebot kann nicht zurückgezogen werden.', sendDraw: 'Angebot senden',
      confirmResign: 'Partie aufgeben?', resignDetail: 'Die Partie endet sofort und dein Gegner gewinnt.', confirmResignButton: 'Partie aufgeben', cancel: 'Abbrechen',
      drawSent: 'Remisangebot gesendet', waiting: 'Warte auf den Gegner', drawDeclined: 'Der Gegner hat das Remisangebot abgelehnt.',
      resigned: 'Partie beendet', resignedResult: 'Du hast aufgegeben · 0–1', close: 'Partie schließen', opponentReply: 'Danke — auf eine gute Partie.',
      messageLimit: 'Nachrichten sind auf 240 Zeichen begrenzt.', ended: 'Diese Partie ist beendet.'
    },
    fr: {
      kick: 'PARTIE D’ENTRAÎNEMENT', finding: 'Recherche d’un adversaire…', looking: 'Recherche d’un joueur souhaitant travailler cette position maintenant.',
      your: 'À vous de jouer', preview: 'Aperçu local — le matchmaking en direct utilisera ce même parcours.', you: 'Vous', white: 'Blancs', online: 'En ligne',
      draw: 'Proposer la nulle', resign: 'Abandonner', chat: 'Chat de partie', respectful: 'Restez cordial et concentré sur la partie.',
      placeholder: 'Écrire à votre adversaire…', send: 'Envoyer', luck: 'Bonne chance !', game: 'Belle partie !', think: 'Joli coup !',
      confirmDraw: 'Proposer la nulle ?', drawDetail: 'Votre adversaire peut accepter ou refuser. L’offre ne peut pas être retirée.', sendDraw: 'Envoyer l’offre',
      confirmResign: 'Abandonner la partie ?', resignDetail: 'La partie se terminera immédiatement et votre adversaire gagnera.', confirmResignButton: 'Abandonner', cancel: 'Annuler',
      drawSent: 'Proposition de nulle envoyée', waiting: 'En attente de votre adversaire', drawDeclined: 'Votre adversaire a refusé la nulle.',
      resigned: 'Partie terminée', resignedResult: 'Vous avez abandonné · 0–1', close: 'Fermer la partie', opponentReply: 'Merci — bonne partie.',
      messageLimit: 'Les messages sont limités à 240 caractères.', ended: 'Cette partie est terminée.'
    },
    it: {
      kick: 'PARTITA DI PRATICA', finding: 'Ricerca avversario…', looking: 'Cerchiamo un giocatore che vuole esercitarsi su questa posizione ora.',
      your: 'Tocca a te', preview: 'Anteprima locale — il matchmaking live userà lo stesso flusso.', you: 'Tu', white: 'Bianco', online: 'Online ora',
      draw: 'Offri patta', resign: 'Abbandona', chat: 'Chat di partita', respectful: 'Mantieni la conversazione cordiale e inerente alla partita.',
      placeholder: 'Scrivi al tuo avversario…', send: 'Invia', luck: 'Buona fortuna!', game: 'Bella partita!', think: 'Bella mossa!',
      confirmDraw: 'Offrire patta?', drawDetail: 'L’avversario può accettare o rifiutare. L’offerta non può essere ritirata.', sendDraw: 'Invia offerta',
      confirmResign: 'Abbandonare la partita?', resignDetail: 'La partita terminerà subito e il tuo avversario vincerà.', confirmResignButton: 'Abbandona partita', cancel: 'Annulla',
      drawSent: 'Offerta di patta inviata', waiting: 'In attesa dell’avversario', drawDeclined: 'L’avversario ha rifiutato la patta.',
      resigned: 'Partita terminata', resignedResult: 'Hai abbandonato · 0–1', close: 'Chiudi partita', opponentReply: 'Grazie — buona partita.',
      messageLimit: 'I messaggi sono limitati a 240 caratteri.', ended: 'Questa partita è terminata.'
    }
  };

  const language = () => window.HamleI18n?.language?.() || localStorage.getItem('hamle-language') || 'en';
  const text = () => copy[language()] || copy.en;
  const positions = {
    lucena: { title: 'Lucena endgame', pieces: { a8:'bR',f8:'bK',c7:'wK',a7:'wP',f7:'wR' } },
    minority: { title: 'Minority attack', pieces: { a8:'bR',d8:'bQ',g8:'bK',c6:'bN',d5:'bP',e5:'bP',a2:'wR',d1:'wQ',g1:'wK',c3:'wN',c4:'wP',d4:'wP' } },
    attack: { title: 'Italian: pressure on f7', pieces: { g8:'bK',f6:'bN',d5:'bP',e4:'wP',c4:'wB',f3:'wN',d1:'wQ',g1:'wK' } }
  };
  const players = ['Alex R.','Mia S.','Jordan K.','Noah P.'];
  const overlay = document.createElement('div');
  overlay.className = 'practice-match';
  document.body.appendChild(overlay);
  const square = (file, rank) => `${'abcdefgh'[file]}${8-rank}`;
  const board = (state, selected) => Array.from({length:64},(_,index)=>{
    const key = square(index % 8, Math.floor(index / 8));
    const piece = state[key];
    return `<button class="match-square ${selected === key ? 'selected' : ''}" data-square="${key}" aria-label="${key}">${piece ? `<img src="https://lichess1.org/assets/piece/cburnett/${piece}.svg" alt="">` : ''}</button>`;
  }).join('');
  const time = () => new Intl.DateTimeFormat(language(), { hour:'2-digit', minute:'2-digit' }).format(new Date());

  function render(positionId, opponent) {
    const t = text();
    const position = positions[positionId];
    const state = { ...position.pieces };
    let selected = null;
    let ended = false;
    let drawPending = false;

    overlay.innerHTML = `<section class="match-sheet">
      <header class="match-header"><div><p class="match-kicker">${t.kick}</p><h2>${position.title}</h2></div><button class="match-close" aria-label="Close">×</button></header>
      <div class="match-layout">
        <div class="match-play">
          <div class="match-players"><span>${t.you}<b>${t.white}</b></span><i>vs</i><span>${opponent}<b>${t.online}</b></span></div>
          <p class="match-note">${t.preview}</p><div class="match-board"></div>
          <div class="match-status" aria-live="polite"><b>${t.your}</b><span>10:00 · 10:00</span></div>
          <div class="match-actions"><button class="match-draw"><span>½</span>${t.draw}</button><button class="match-resign"><span>⚑</span>${t.resign}</button></div>
        </div>
        <aside class="match-chat">
          <header><span><b>${t.chat}</b><small>● ${opponent}</small></span></header>
          <div class="match-chat-log" aria-live="polite"><p class="match-system">${t.respectful}</p></div>
          <div class="quick-chat"><button data-message="${t.luck}">${t.luck}</button><button data-message="${t.game}">${t.game}</button><button data-message="${t.think}">${t.think}</button></div>
          <form class="match-chat-form"><input maxlength="240" autocomplete="off" placeholder="${t.placeholder}" aria-label="${t.placeholder}"><button type="submit">${t.send}</button></form>
          <small class="match-chat-limit">${t.messageLimit}</small>
        </aside>
      </div>
      <div class="match-confirm" role="dialog" aria-modal="true"><div><span class="match-confirm-icon"></span><h3></h3><p></p><div><button class="confirm-cancel">${t.cancel}</button><button class="confirm-action"></button></div></div></div>
      <div class="match-result" role="dialog" aria-modal="true"><div><span>⚑</span><h3>${t.resigned}</h3><p>${t.resignedResult}</p><button>${t.close}</button></div></div>
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
    const paint = () => {
      overlay.querySelector('.match-board').innerHTML = board(state, selected);
      overlay.querySelectorAll('.match-square').forEach(cell => cell.onclick = () => {
        if (ended) return;
        const key = cell.dataset.square;
        if (!selected && state[key]?.startsWith('w')) { selected = key; paint(); return; }
        if (selected) { state[key] = state[selected]; delete state[selected]; selected = null; paint(); }
      });
    };
    const setStatus = (title, detail = '10:00 · 10:00') => {
      overlay.querySelector('.match-status b').textContent = title;
      overlay.querySelector('.match-status span').textContent = detail;
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
            setStatus(t.your);
            appendMessage('system', t.drawDeclined, 'system-message');
          }, 1800);
          return;
        }
        ended = true;
        overlay.querySelectorAll('.match-actions button,.match-chat-form input,.match-chat-form button,.quick-chat button').forEach(control => control.disabled = true);
        setStatus(t.resigned, '0–1');
        appendMessage('system', t.ended, 'system-message');
        overlay.querySelector('.match-result').classList.add('open');
      };
      confirm.classList.add('open');
    };

    overlay.querySelector('.match-close').onclick = () => overlay.classList.remove('open');
    overlay.querySelector('.match-draw').onclick = () => !drawPending && !ended && showConfirm('draw');
    overlay.querySelector('.match-resign').onclick = () => !ended && showConfirm('resign');
    overlay.querySelector('.confirm-cancel').onclick = hideConfirm;
    overlay.querySelector('.match-result button').onclick = () => overlay.classList.remove('open');
    overlay.querySelectorAll('.quick-chat button').forEach(button => button.onclick = () => {
      const input = overlay.querySelector('.match-chat-form input');
      input.value = button.dataset.message;
      input.focus();
    });
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
  }

  window.startPracticeMatch = positionId => {
    const opponent = players[Math.floor(Math.random() * players.length)];
    const t = text();
    overlay.innerHTML = `<section class="matching-sheet"><span class="matching-pulse"></span><p class="match-kicker">${t.kick}</p><h2>${t.finding}</h2><p>${t.looking}</p></section>`;
    overlay.classList.add('open');
    window.setTimeout(() => render(positionId, opponent), 900);
  };
  document.addEventListener('click', event => {
    const action = event.target.closest('.position-action');
    if (!action) return;
    event.stopPropagation();
    window.startPracticeMatch(action.closest('.study-position-card').dataset.position);
  });
})();
