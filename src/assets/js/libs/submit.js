'use strict';

const form = document.getElementById('form');
const submitBtn = document.getElementById('js-submit__button');

form.addEventListener('input', update);
form.addEventListener('textarea', update);

function update() {
  const isRequired = form.checkValidity();

  if (isRequired) {
    submitBtn.setAttribute('aria-disabled', false);
    submitBtn.style.opacity = 1;
    submitBtn.style.cursor = 'pointer';
    return;
  }
}
