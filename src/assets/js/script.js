const circularProgressBar = document.querySelector('#circularProgressBar');
const circularProgressBarNumber = document.querySelector(
  '#circularProgressBar .progress-value'
);
const buttonTypePomodoro = document.querySelector('#buttonTypePomodoro');
const buttonTypeShortBreak = document.querySelector('#buttonTypeShortBreak');
const buttonTypeLongBreak = document.querySelector('#buttonTypeLongBreak');

//menu

//time-minutes
let pomodoroTimerInSeconds = 1500; // 60s * 5min
let shortBreakTimerInSeconds = 5;
let longBreakTimerInSeconds = 900;
const val = document.getElementById('pomodoro-timer');
const short = document.getElementById('short-timer');
const long = document.getElementById('long-timer');
const num = document.querySelector('.progress-value');

const TIMER_TYPE_POMODORO = 'POMODORO';
let progressInterval; // for setInterval
let pomodoroType = TIMER_TYPE_POMODORO;
let timerValue = pomodoroTimerInSeconds;

let multiplierFactor = 360 / timerValue;
const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK';
const TIMER_TYPE_LONG_BREAK = 'LONGBREAK';

const inputVal = document.querySelector('.input-val');

const pomodoroSet = document.querySelector('.pomodoro');
pomodoroSet.querySelectorAll('.btns').forEach((item) => {
  item.querySelector('.btn-incrise').addEventListener('click', () => {
    val.stepUp();
    val.click();
  });

  item.querySelector('.btn-decrise').addEventListener('click', () => {
    val.stepDown();
    val.click();
  });
});
val.addEventListener('click', (e) => {
  const { value } = e.target;

  num.innerHTML = formatNumberInStringMinute(value * 60);

  pomodoroTimerInSeconds = value * 60;
  resetTimer();
});

const shortSet = document.querySelector('.short');
shortSet.querySelectorAll('.btns').forEach((item) => {
  item.querySelector('.btn-incrise').addEventListener('click', () => {
    short.stepUp();
    short.click();
  });

  item.querySelector('.btn-decrise').addEventListener('click', () => {
    short.stepDown();
    short.click();
  });
});
short.addEventListener('click', (el) => {
  const { value } = el.target;

  num.innerHTML = formatNumberInStringMinute(value * 60);

  shortBreakTimerInSeconds = value * 60;

  resetTimer();
});

const longSet = document.querySelector('.long');
longSet.querySelectorAll('.btns').forEach((item) => {
  item.querySelector('.btn-incrise').addEventListener('click', () => {
    long.stepUp();
    long.click();
  });

  item.querySelector('.btn-decrise').addEventListener('click', () => {
    long.stepDown();
    long.click();
  });
});
long.addEventListener('click', (elem) => {
  const { value } = elem.target;

  num.innerHTML = formatNumberInStringMinute(value * 60);

  longBreakTimerInSeconds = value * 60;

  resetTimer();
});

function formatNumberInStringMinute(number) {
  const minutes = Math.trunc(number / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.trunc(number % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

const startTimer = () => {
  progressInterval = setInterval(() => {
    timerValue--;
    setInfoCircularProgressBar();
  }, 1000);
};

const stopTimer = () => {
  clearInterval(progressInterval);
};

const resetTimer = () => {
  clearInterval(progressInterval);

  if (pomodoroType === TIMER_TYPE_SHORT_BREAK) {
    timerValue = shortBreakTimerInSeconds;
  } else if (pomodoroType === TIMER_TYPE_LONG_BREAK) {
    timerValue = longBreakTimerInSeconds;
  } else if (pomodoroType === TIMER_TYPE_POMODORO) {
    timerValue = pomodoroTimerInSeconds;
  }

  multiplierFactor = 360 / timerValue;
  setInfoCircularProgressBar();
};
const audio = new Audio('../sounds/devil.mp3');
function setInfoCircularProgressBar() {
  if (timerValue === 0) {
    stopTimer();
    // audio.play();

    reset.classList.remove('hide');
    stoped.classList.add('hide');
  }

  circularProgressBarNumber.textContent = `${formatNumberInStringMinute(
    timerValue
  )}`;

  circularProgressBar.style.background = `conic-gradient( var(--color-r) ${
    timerValue * multiplierFactor
  }deg, #4f4f4f44 0deg)`;
}

const setPomomodoroType = (type) => {
  pomodoroType = type;

  if (type === TIMER_TYPE_POMODORO) {
    buttonTypeShortBreak.classList.remove('active');
    buttonTypeLongBreak.classList.remove('active');
    buttonTypePomodoro.classList.add('active');
  }
  if (type === TIMER_TYPE_SHORT_BREAK) {
    buttonTypePomodoro.classList.remove('active');
    buttonTypeLongBreak.classList.remove('active');
    buttonTypeShortBreak.classList.add('active');
  }
  if (type === TIMER_TYPE_LONG_BREAK) {
    buttonTypePomodoro.classList.remove('active');
    buttonTypeShortBreak.classList.remove('active');
    buttonTypeLongBreak.classList.add('active');
  }

  resetTimer();
};

//buttons start stop reset
const start = document.getElementById('start');
const stoped = document.getElementById('stop');
const reset = document.getElementById('reset');

start.onclick = function () {
  startTimer();
  start.classList.add('hide');
  stoped.classList.remove('hide');
};

stoped.onclick = function () {
  stopTimer();
  stoped.classList.add('hide');
  start.classList.remove('hide');
  start.classList.toggle('second-stop');
};
//

reset.onclick = function () {
  resetTimer();
  stoped.classList.remove('hide');
  start.classList.add('hide');
  reset.classList.add('hide');
  startTimer();
};

// font
function onBtnActive(event) {
  let btnActive = document.querySelectorAll('.active__font');
  btnActive.forEach((btn) => {
    btn.className = btn.className.replace('active__font', '');
  });
  event.target.className += ' active__font';
}

const btnSFont = document.querySelector('.menu-font-btns');
btnSFont.addEventListener('click', onBtnActive, false);

const kumbh = document.getElementById('font-kumbh');
const roboto = document.getElementById('font-roboto');
const mono = document.getElementById('font-mono');

const fontFamilys = document.querySelector('.container');
fontFamilys.querySelectorAll('.font__btn').forEach(function (el) {
  el.addEventListener('click', function () {
    fontFamilys.querySelector('.card').style.fontFamily = this.value;
  });
});

//bg
let colors;
const targetColor = () => {
  fontFamilys.querySelectorAll('.color__btn').forEach(function (el) {
    el.addEventListener('click', function (event) {
      const { value } = event.target;
      colors = value;

      fontFamilys.querySelector('.card').style.setProperty('--color-r', colors);
    });
  });
};
targetColor();

const check = document.querySelector('.check');

//open-close menu
const menu = document.querySelector('.setting-hide');
const openBtn = document.querySelector('.settings__btn');

openBtn.addEventListener('click', () => {
  menu.classList.remove('hide');
  openBtn.disabled = true;
  openBtn.classList.add('open-block');
});

const apply = document.querySelector('.setting__btn-apply');
apply.addEventListener('click', () => {
  menu.classList.add('hide');
  openBtn.disabled = false;
  openBtn.classList.remove('open-block');
});
