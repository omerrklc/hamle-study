const quickFlip = document.createElement('button');
quickFlip.className = 'quick-flip'; quickFlip.title = 'Flip board'; quickFlip.setAttribute('aria-label', 'Flip board'); quickFlip.textContent = '↕';
document.querySelector('.turn-banner').insertBefore(quickFlip, document.querySelector('.turn-banner small'));
quickFlip.onclick = () => document.querySelector('.proper-board').classList.toggle('flipped');
