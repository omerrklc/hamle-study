// Board pieces use code points and a dedicated Staunton SVG set, so text encoding cannot affect them.
const chessGlyph = Object.fromEntries([
  ['bK', 0x265A], ['bQ', 0x265B], ['bR', 0x265C], ['bB', 0x265D], ['bN', 0x265E], ['bP', 0x265F],
  ['wK', 0x2654], ['wQ', 0x2655], ['wR', 0x2656], ['wB', 0x2657], ['wN', 0x2658], ['wP', 0x2659]
].map(([key, code]) => [key, String.fromCodePoint(code)]));
const pieceAsset = Object.fromEntries(Object.entries(chessGlyph).map(([name, glyph]) => [glyph, name]));
const classicPosition = Array(64).fill('');
['bR','bN','bB','bQ','bK','bB','bN','bR'].forEach((piece, index) => classicPosition[index] = chessGlyph[piece]);
for (let index = 8; index < 16; index += 1) classicPosition[index] = chessGlyph.bP;
for (let index = 48; index < 56; index += 1) classicPosition[index] = chessGlyph.wP;
['wR','wN','wB','wQ','wK','wB','wN','wR'].forEach((piece, index) => classicPosition[56 + index] = chessGlyph[piece]);
function buildClassicBoard() {
  const board = document.createElement('div'); board.className = 'proper-board';
  classicPosition.forEach((piece, index) => {
    const square = document.createElement('button');
    square.className = `board-square ${(Math.floor(index / 8) + index) % 2 ? 'dark-square' : 'light-square'}`;
    square.dataset.square = `${'abcdefgh'[index % 8]}${8 - Math.floor(index / 8)}`;
    const asset = piece ? pieceAsset[piece] : '';
    square.innerHTML = asset ? `<img class="staunton-piece" draggable="false" alt="${asset}" src="https://lichess1.org/assets/piece/cburnett/${asset}.svg">` : '';
    square.onclick = () => square.classList.toggle('marked'); board.appendChild(square);
  }); return board;
}
function buildFrame() {
  const frame = document.createElement('div'); frame.className = 'board-frame'; frame.appendChild(buildClassicBoard());
  '87654321'.split('').forEach((label, index) => { const item = document.createElement('i'); item.className = 'fixed-rank'; item.style.setProperty('--index', index); item.textContent = label; frame.appendChild(item); });
  'abcdefgh'.split('').forEach((label, index) => { const item = document.createElement('i'); item.className = 'fixed-file'; item.style.setProperty('--index', index); item.textContent = label; frame.appendChild(item); });
  return frame;
}
window.buildBoardFrame = buildFrame;
const brokenBoard = document.querySelector('.proper-board');
if (brokenBoard) brokenBoard.replaceWith(buildFrame());
