'use strict';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('form').addEventListener('submit', function (e) {
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();

    xhr.open(
      'POST',
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLScv04pfDdu6EBM48I5CAP_duO4Wu21cRrMG7OgenzrXzcI9Sw/formResponse',
      true
    );
    xhr.onload = function () {
      if (xhr.status === 0) {
        window.location.href = 'thanks.html';
      }
      // xhr.status === 200 の場合は何もしない（正常終了）
    };
    xhr.send(formData);
    e.preventDefault();
  });
});
