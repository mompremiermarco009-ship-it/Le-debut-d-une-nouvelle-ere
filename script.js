/* ===========================================
   LES SOUVENIRS QUI RESTENT
   Script principal – version optimisée
=========================================== */

// --- Éléments DOM ---
const loader       = document.getElementById('loader');
const book         = document.getElementById('book');
const title        = document.getElementById('chapter-title');
const quote        = document.getElementById('chapter-quote');
const content      = document.getElementById('chapter-content');
const image        = document.getElementById('chapter-image');
const progressBar  = document.getElementById('progressBar');
const prevBtn      = document.getElementById('prev');
const nextBtn      = document.getElementById('next');
const music        = document.getElementById('musicPlayer');
const musicBtn     = document.getElementById('musicButton');

// --- État ---
let currentChapter = 0;

// ===============================================
//  AFFICHAGE D'UN CHAPITRE
// ===============================================
function displayChapter(index) {
  const ch = chapters[index];

  title.textContent = ch.title;
  quote.textContent = `« ${ch.quote} »`;
  content.innerHTML = ch.content;
  image.src = ch.image;
  image.alt = ch.title;

  // Barre de progression
  progressBar.style.width = `${((index + 1) / chapters.length) * 100}%`;

  // Animation de fondu
  content.style.opacity = '0';
  image.style.opacity = '0';
  setTimeout(() => {
    content.style.opacity = '1';
    image.style.opacity = '1';
  }, 300);

  // Boutons
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === chapters.length - 1;

  // Sauvegarde automatique
  localStorage.setItem('souvenirs-current-chapter', index);

  // Scroll haut
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===============================================
//  REPRISE AUTOMATIQUE
// ===============================================
function loadProgress() {
  const saved = localStorage.getItem('souvenirs-current-chapter');
  if (saved !== null) {
    currentChapter = parseInt(saved, 10);
  }
  displayChapter(currentChapter);
}

// ===============================================
//  ÉCOUTEURS DE NAVIGATION
// ===============================================
nextBtn.addEventListener('click', () => {
  if (currentChapter < chapters.length - 1) {
    currentChapter++;
    displayChapter(currentChapter);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentChapter > 0) {
    currentChapter--;
    displayChapter(currentChapter);
  }
});

// Clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentChapter < chapters.length - 1) {
    currentChapter++;
    displayChapter(currentChapter);
  }
  if (e.key === 'ArrowLeft' && currentChapter > 0) {
    currentChapter--;
    displayChapter(currentChapter);
  }
});

// Swipe tactile
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', (e) => {
  const delta = e.changedTouches[0].screenX - touchStartX;
  if (delta < -80 && currentChapter < chapters.length - 1) {
    currentChapter++;
    displayChapter(currentChapter);
  } else if (delta > 80 && currentChapter > 0) {
    currentChapter--;
    displayChapter(currentChapter);
  }
});

// ===============================================
//  CHARGEMENT INITIAL
// ===============================================
window.addEventListener('load', () => {
  // Transition du loader
  loader.style.transition = 'opacity 0.8s ease';
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
    book.classList.remove('hidden');
    loadProgress();
  }, 800);
});

// ===============================================
//  MUSIQUE DE FOND
// ===============================================
if (music && musicBtn) {
  music.volume = 0.35;
  musicBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      musicBtn.innerHTML = '🔊';
      musicBtn.style.background = 'var(--primary)';
    } else {
      music.pause();
      musicBtn.innerHTML = '🔈';
      musicBtn.style.background = 'rgba(255,255,255,.12)';
    }
  });
}

// ===============================================
//  PLUIE DE CŒURS
// ===============================================
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
  heart.style.fontSize = (Math.random() * 15 + 18) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 9000);
}
setInterval(createHeart, 1200);

// ===============================================
//  MESSAGE FINAL (après le dernier chapitre)
// ===============================================
function showFinalMessage() {
  if (currentChapter !== chapters.length - 1) return;

  const box = document.createElement('div');
  box.className = 'final-message';
  box.innerHTML = `
    <h2>❤️ Merci ❤️</h2>
    <p>Si tu es arrivée jusqu'ici...</p>
    <p>Merci d'avoir pris le temps de lire chacun de ces souvenirs.</p>
    <p>Ce livre n'avait qu'un seul objectif : te montrer avec sincérité ce que j'ai ressenti depuis notre rencontre.</p>
    <p>J'espère simplement que ce n'est pas la fin de notre histoire, mais le début d'une nouvelle ère.</p>
    <p style="margin-top:25px;font-weight:bold;">— Marco</p>
  `;

  box.style.cssText = `
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(5,5,16,0.92);
    backdrop-filter: blur(12px);
    color: white;
    text-align: center;
    z-index: 10000;
    font-family: var(--font-text);
    padding: 30px;
    line-height: 1.8;
  `;
  document.body.appendChild(box);

  box.addEventListener('click', () => box.remove());
}

nextBtn.addEventListener('click', () => {
  if (currentChapter === chapters.length - 1) {
    showFinalMessage();
  }
});

// ===============================================
//  PRÉCHARGEMENT DES IMAGES
// ===============================================
chapters.forEach(ch => {
  const img = new Image();
  img.src = ch.image;
});

// ===============================================
//  TRANSITION DE LA BARRE DE PROGRESSION
// ===============================================
progressBar.style.transition = 'width 0.6s ease';

// ===============================================
//  CONSOLE
// ===============================================
console.log('%cLes souvenirs qui restent ❤️', 'color:#ff4d6d;font-size:22px;font-weight:bold;');
console.log('Développé avec amour par Marco.');
