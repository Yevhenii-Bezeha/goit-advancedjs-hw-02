import Notiflix from 'notiflix';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopBtn.disabled = true;

function disableButtons(a, b) {
  startBtn.disabled = a;
  stopBtn.disabled = b;
}

function onStart() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    disableButtons(true, false);
  }, 1000);
}

function onStop() {
  clearInterval(timerId);
  disableButtons(false, true);
  Notiflix.Notify.info(
    `Your color is ${window.getComputedStyle(body).backgroundColor}`,
    {
      timeout: 10000,
    }
  );
}

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
