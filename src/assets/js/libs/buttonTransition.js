// お問い合わせボタン遷移

document.addEventListener(
  'DOMContentLoaded',
  () => {
    function buttonClick() {
      const contactElement = document.getElementById('contact');
      const contactRect = contactElement.getBoundingClientRect();
      const contactTop = window.scrollY + contactRect.top;

      const scrollPosition = contactTop - 50;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }

    const buttons = document.getElementsByClassName('js-button');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', buttonClick, false);
    }
  },
  false,
);
