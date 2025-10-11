// navメニュー遷移,

document.addEventListener('DOMContentLoaded', () => {
  const features = document.querySelector("a[href='#features']");
  const recruit = document.querySelector("a[href='#recruit']");
  const faq = document.querySelector("a[href='#faq']");

  if (features) {
    features.addEventListener('click', function (e) {
      e.preventDefault();
      let js_features = document.querySelector(this.getAttribute('href')).offsetTop;
      js_features -= 80;
      window.scrollTo({
        top: js_features,
        behavior: 'smooth',
      });
    });
  }

  if (recruit) {
    recruit.addEventListener('click', function (e) {
      e.preventDefault();
      let js_recruit = document.querySelector(this.getAttribute('href')).offsetTop;
      js_recruit -= 100;
      window.scrollTo({
        top: js_recruit,
        behavior: 'smooth',
      });
    });
  }

  if (faq) {
    faq.addEventListener('click', function (e) {
      e.preventDefault();
      let js_faq = document.querySelector(this.getAttribute('href')).offsetTop;
      js_faq -= 80;
      window.scrollTo({
        top: js_faq,
        behavior: 'smooth',
      });
    });
  }
});
