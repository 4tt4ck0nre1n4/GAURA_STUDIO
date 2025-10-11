'use strict';

// アコーディオンメニュー
document.addEventListener('DOMContentLoaded', () => {
  const questionBtn = document.querySelectorAll('.js-question__button');

  for (let i = 0; i < questionBtn.length; i++) {
    questionBtn[i].addEventListener('click', function () {
      this.classList.toggle('is_active');
      this.nextElementSibling.classList.toggle('is_open');
    });
  }
});
