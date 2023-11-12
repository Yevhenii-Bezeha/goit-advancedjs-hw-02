import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
let intervalId = null;
let initDate;
let finalDate;

button.addEventListener('click', onStart);

button.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const inputCurrentDate = new Date();
    if (selectedDates[0] <= inputCurrentDate) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 5000,
      });
      clearInterval(intervalId);
    } else {
      button.disabled = false;
      intervalId = null;
      initDate = selectedDates[0];
    }
  },
};

flatpickr(input, options);

function startCountDown(finalDate) {
  input.disabled = true;
  button.disabled = true;
  const currentDate = Date.now();
  const diff = finalDate - currentDate;

  if (diff > 0) {
    const remainingTime = convertMs(diff);
    daysField.textContent = addLeadingZero(remainingTime.days);
    hoursField.textContent = addLeadingZero(remainingTime.hours);
    minutesField.textContent = addLeadingZero(remainingTime.minutes);
    secondsField.textContent = addLeadingZero(remainingTime.seconds);
  } else {
    clearInterval(intervalId);
    daysField.textContent = '00';
    hoursField.textContent = '00';
    minutesField.textContent = '00';
    secondsField.textContent = '00';
    return Notiflix.Confirm.show(
      'The bomb exploded!',
      'Why did you destroy humanity?',
      'They deserve it',
      'I don`t know',
      function okCb() {
        return Notiflix.Notify.failure(
          '😡 NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!',
          {
            timeout: 5000,
          }
        );
      },
      function cancelCb() {
        return Notiflix.Notify.warning(
          '😪 That is not funny !!! How dare you ? You don`t even know the reason why you did it !',
          {
            timeout: 5000,
          }
        );
      },
      {
        width: '320px',
        borderRadius: '8px',
      }
    );
  }
}

function onStart() {
  if (initDate) {
    finalDate = initDate.getTime();
    if (intervalId === null || intervalId === undefined) {
      Notiflix.Notify.warning(
        'The bomb has been planted! Move to the shelter!',
        {
          timeout: 5000,
        }
      );
      startCountDown(finalDate);
      intervalId = setInterval(() => startCountDown(finalDate), 1000);
    }
  }
}

// ==================== 2nd variant ======================= //

// function startTimer() {

//     finalDate = initDate.getTime();
//     intervalId = setInterval(() => {
//     const currentDate = new Date().getTime();
//     const remainingTime = finalDate - currentDate;

//     if (remainingTime <= 0) {
//       clearInterval(intervalId);
//       intervalId = null;
//       return;
//     }

//     const { days, hours, minutes, seconds } = convertMs(remainingTime);

//     daysField.textContent = addLeadingZero(days);
//     hoursField.textContent = addLeadingZero(hours);
//     minutesField.textContent = addLeadingZero(minutes);
//     secondsField.textContent = addLeadingZero(seconds);
//   }, 1000);
// }

// button.addEventListener('click', startTimer);

// ====================== 1st variant ========================= //
