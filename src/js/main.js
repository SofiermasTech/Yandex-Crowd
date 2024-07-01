// Слайдер для секции section-players

// Обертка слайдера
const sliderLinePlayers = document.querySelector('.slider__wrapper');
// Отдельный слайд
const slidePlayer = document.querySelector('.slider__slide');
// Все слайды
const slideLengthPlayers = document.querySelectorAll('.slider__slide');
// Кнопки слайдера десктоп + мобайл
const btnPrev = document.querySelectorAll('.slider-btn__prev--players');
const btnNext = document.querySelectorAll('.slider-btn__next--players');
// Счетчик текущего слайда
const currentNumber = document.querySelector('.slider-btn__count-current');

let widthPlayers;
let countPlayers = 0;
let currentCountNumber = 3;

// Шаг слайдера
function rollSliderPlayers() {
   sliderLinePlayers.style.transform = 'translate(-' + countPlayers * (widthPlayers + 20) + 'px)';
}

function checkDisabled(buttons) {
   buttons.forEach(btn => {
      if (btn.classList.contains('btn-disable') && btn.hasAttribute('disabled')) {
         btn.classList.remove('btn-disable');
         btn.removeAttribute('disabled');
      }
   })
}

function initPlayers() {
   // Вычисление ширины  окна сладера и его длины
   widthPlayers = slidePlayer.offsetWidth;
   sliderLinePlayers.style.width = widthPlayers * slideLengthPlayers.length + 'px';

   // Присвоение ширины каждому слайду
   slideLengthPlayers.forEach(item => {
      if (document.documentElement.clientWidth < 992) {
         item.style.width = (widthPlayers + 5) + 'px';
      } else if (document.documentElement.clientWidth > 992) {
         item.style.width = (widthPlayers + 10) + 'px';
      } else {
         slideLengthPlayers.forEach(item => {
            item.style.width = widthPlayers;
         })
      }
   })

   rollSliderPlayers();
}

initPlayers();

// Слушатели для кнопок
btnPrev.forEach(btn => {
   btn.addEventListener('click', function () {
      countPlayers--;

      // Изменение счетчика -1
      currentCountNumber -= 1;
      currentNumber.textContent = currentCountNumber;

      // Проверка оставшихся шагов
      if (countPlayers <= 0) {
         btn.classList.add('btn-disable');
         btn.setAttribute('disabled', true);
      }

      rollSliderPlayers();
      checkDisabled(btnNext);
   })
})

btnNext.forEach(btn => {
   btn.addEventListener('click', function () {
      countPlayers++;

      // Изменение счетчика +1
      currentCountNumber += 1;
      currentNumber.textContent = currentCountNumber;

      // Проверка оставшихся шагов
      if (document.documentElement.clientWidth < 992) {
         if (countPlayers === (slideLengthPlayers.length - 1)) {
            btn.classList.add('btn-disable');
            btn.setAttribute('disabled', true);
         }
      } else {
         if (countPlayers === (slideLengthPlayers.length - 3)) {
            btn.classList.add('btn-disable');
            btn.setAttribute('disabled', true);
         }
      }

      rollSliderPlayers();
      checkDisabled(btnPrev);
   })
})


// Второй слайдер на мобилках 'section-steps'

const sliderLineStep = document.querySelector('.section-steps__list'); // slider-wrap
const sliderLenght = document.querySelectorAll('.section-steps__item'); // All slider-slide
const slider = document.querySelector('.section-steps__cards'); // slider
// Кнопки слайдера
const btnPrevSteps = document.querySelector('.slider-btn__prev--steps');
const btnNextSteps = document.querySelector('.slider-btn__next--steps');
const paginationArea = document.querySelector('.slider-btn__paginations');

let widthStep;
let countSteps = 0;

// Создание пагинации слайдера с кружками
const paginationCircles = [];

function createPaginationCircle(index) {
   if (index < sliderLenght.length - 2) {
      const circle = document.createElement('span');
      circle.className = 'slider-btn__pagination-circle';
      paginationArea.appendChild(circle);
      paginationCircles.push(circle);
   }
}

function addPagination() {
   sliderLenght.forEach((item, index) => createPaginationCircle(index));
   paginationCircles[0].classList.add('active-slide');
}

function addActiveClass() {
   paginationCircles[countSteps].classList.add('active-slide');
}

function removeActiveClass() {
   paginationCircles[countSteps].classList.remove('active-slide');
}

// Шаг слайдера
function rollSliderSteps() {
   sliderLineStep.style.transform = 'translate(-' + countSteps * (widthStep - 6) + 'px)';
}

// Проверка для включения кнопок
function checkDisabledSecond(btn) {
   if (btn.classList.contains('btn-disable') && btn.hasAttribute('disabled')) {
      btn.classList.remove('btn-disable');
      btn.removeAttribute('disabled');
   }
}

function listenerResizeSteps() {
   if (document.documentElement.clientWidth < 560) {

      function initSteps() {
         // Вычисление ширины  окна сладера и его длины
         widthStep = slider.offsetWidth;
         sliderLineStep.style.width = widthStep * (sliderLenght.length - 2) + 'px';

         // Присвоение ширины каждому слайду
         sliderLenght.forEach(item => {
            item.style.width = (widthStep - 40) + 'px';
         })

         rollSliderSteps();
      }

      initSteps();

      // Слушатели для кнопок слайдера
      btnPrevSteps.addEventListener('click', function () {
         removeActiveClass()
         countSteps--;

         // Проверка оставшихся шагов
         if (countSteps <= 0) {
            btnPrevSteps.classList.add('btn-disable');
            btnPrevSteps.setAttribute('disabled', true);
         }

         rollSliderSteps();
         checkDisabledSecond(btnNextSteps);
         addActiveClass();
      })

      btnNextSteps.addEventListener('click', function () {
         removeActiveClass()
         countSteps++;

         if (countSteps === (sliderLenght.length - 3)) {
            btnNextSteps.classList.add('btn-disable');
            btnNextSteps.setAttribute('disabled', true);
         }

         rollSliderSteps();
         checkDisabledSecond(btnPrevSteps);
         addActiveClass();
      })

   } else {
      sliderLineStep.style.width = '100%';
      sliderLineStep.style.transform = 'translate(0)';
      sliderLenght.forEach(item => {
         item.style.width = 'auto';
      })
   }
}

addPagination();
listenerResizeSteps();
window.addEventListener('resize', listenerResizeSteps, initPlayers)