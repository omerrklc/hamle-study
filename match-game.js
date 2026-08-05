(() => {
  const copy = {
    en:{kick:'PRACTICE MATCH',finding:'Finding an opponent…',looking:'Looking for a player who wants to practise this position right now.',your:'Your turn',leave:'Leave practice',preview:'Local practice preview — live matchmaking will use this same flow.'},
    tr:{kick:'PRATİK EŞLEŞMESİ',finding:'Rakip aranıyor…',looking:'Bu pozisyonu şimdi çalışmak isteyen bir oyuncu aranıyor.',your:'Sıra sende',leave:'Pratikten ayrıl',preview:'Yerel pratik önizlemesi — canlı eşleşme aynı akışı kullanacak.'},
    de:{kick:'TRAININGSPARTIE',finding:'Gegner wird gesucht…',looking:'Wir suchen einen Spieler, der diese Stellung jetzt trainieren möchte.',your:'Du bist am Zug',leave:'Training verlassen',preview:'Lokale Trainingsvorschau — das Live-Matching nutzt denselben Ablauf.'},
    fr:{kick:'PARTIE D’ENTRAÎNEMENT',finding:'Recherche d’un adversaire…',looking:'Recherche d’un joueur souhaitant travailler cette position maintenant.',your:'À vous de jouer',leave:'Quitter l’entraînement',preview:'Aperçu local — le matchmaking en direct utilisera ce même parcours.'},
    it:{kick:'PARTITA DI PRATICA',finding:'Ricerca avversario…',looking:'Cerchiamo un giocatore che vuole esercitarsi su questa posizione ora.',your:'Tocca a te',leave:'Esci dalla pratica',preview:'Anteprima locale — il matchmaking live userà lo stesso flusso.'}
  };
  const language=()=>localStorage.getItem('hamle-language')||'en';
  const positions = {
    lucena: { title: 'Lucena endgame', pieces: { a8:'bR',f8:'bK',c7:'wK',a7:'wP',f7:'wR' } },
    minority: { title: 'Minority attack', pieces: { a8:'bR',d8:'bQ',g8:'bK',c6:'bN',d5:'bP',e5:'bP',a2:'wR',d1:'wQ',g1:'wK',c3:'wN',c4:'wP',d4:'wP' } },
    attack: { title: 'Italian: pressure on f7', pieces: { g8:'bK',f6:'bN',d5:'bP',e4:'wP',c4:'wB',f3:'wN',d1:'wQ',g1:'wK' } }
  };
  const players = ['Alex R.','Mia S.','Jordan K.','Noah P.'];
  const overlay = document.createElement('div'); overlay.className = 'practice-match'; document.body.appendChild(overlay);
  const square = (file, rank) => `${'abcdefgh'[file]}${8-rank}`;
  const board = (state, selected) => Array.from({length:64},(_,i)=>{const key=square(i%8,Math.floor(i/8)),piece=state[key];return `<button class="match-square ${selected===key?'selected':''}" data-square="${key}">${piece?`<img src="https://lichess1.org/assets/piece/cburnett/${piece}.svg" alt="">`:''}</button>`}).join('');
  function render(positionId, opponent) {
    const t=copy[language()]||copy.en;
    const position=positions[positionId], state={...position.pieces}; let selected=null;
    const paint=()=>{overlay.querySelector('.match-board').innerHTML=board(state,selected); overlay.querySelectorAll('.match-square').forEach(cell=>cell.onclick=()=>{const key=cell.dataset.square;if(!selected&&state[key]?.startsWith('w')){selected=key;paint();return}if(selected){state[key]=state[selected];delete state[selected];selected=null;paint()}})};
    overlay.innerHTML=`<section class="match-sheet"><button class="match-close" aria-label="Close">×</button><p class="match-kicker">${t.kick}</p><h2>${position.title}</h2><div class="match-players"><span>You <b>White</b></span><i>vs</i><span>${opponent} <b>Online now</b></span></div><p class="match-note">${t.preview}</p><div class="match-board"></div><div class="match-status"><b>${t.your}</b><span>10:00 · 10:00</span></div><button class="match-resign">${t.leave}</button></section>`;
    overlay.classList.add('open'); paint(); overlay.querySelector('.match-close').onclick=()=>overlay.classList.remove('open'); overlay.querySelector('.match-resign').onclick=()=>overlay.classList.remove('open');
  }
  window.startPracticeMatch = positionId => { const opponent=players[Math.floor(Math.random()*players.length)],t=copy[language()]||copy.en; overlay.innerHTML=`<section class="matching-sheet"><span class="matching-pulse"></span><p class="match-kicker">${t.kick}</p><h2>${t.finding}</h2><p>${t.looking}</p></section>`; overlay.classList.add('open'); setTimeout(()=>render(positionId,opponent),900); };
  document.addEventListener('click',event=>{const action=event.target.closest('.position-action');if(action){event.stopPropagation();window.startPracticeMatch(action.closest('.study-position-card').dataset.position)}});
})();
