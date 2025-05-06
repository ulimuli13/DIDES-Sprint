let canvasInstance;
let textsMoved = false;

function startAnimation() {
  if (!textsMoved) {
    moveTexts();
    playSong();
  }
}

function moveTexts() {
  textsMoved = true;
  const titel = document.getElementById('Titel');
  const hozier = document.getElementById('Hozier');

  titel.style.top = '10px';
  titel.style.transform = 'translate(-50%, 0)';
  hozier.style.top = 'unset';
  hozier.style.bottom = '10px';
  hozier.style.transform = 'translate(-50%, 0)';

  setTimeout(() => {
    canvasInstance.start();
  }, 8560);
}

function playSong() {
  const audio = document.getElementById("Song");
  audio.play();

  audio.onended = function () {
    canvasInstance.stop();
    resetTexts();
  };
}

function resetTexts() {
  const titel = document.getElementById('Titel');
  const hozier = document.getElementById('Hozier');

  titel.style.top = '45%';
  titel.style.transform = 'translate(-50%, -50%)';
  hozier.style.bottom = '45%';
  hozier.style.transform = 'translate(-50%, -50%)';
  textsMoved = false;
}

window.onload = () => {
  canvasInstance = new DottedCircleCanvas("canvas-container");
};