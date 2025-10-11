import Swiper from 'swiper/bundle';

// Swiper要素が存在する場合のみ初期化
document.addEventListener('DOMContentLoaded', () => {
  const swiperElement = document.querySelector('.swiper');

  if (swiperElement) {
    // Swiperインスタンスを初期化（変数として保持する必要がある場合は使用）
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.swiper', {
      loop: true,
      loopAdditionalSlides: 1,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      speed: 2500,
      grabCursor: true,
      centeredSlides: true,
      breakpoints: {
        0: {
          slidesPerView: 1.4,
          spaceBetween: 24,
        },
        501: {
          slidesPerView: 'auto',
          spaceBetween: 32,
        },
        701: {
          slidesPerView: 'auto',
          spaceBetween: 48,
        },
      },
      mousewheel: {
        forceToAxis: true,
      },
      allowTouchMove: true,
    });
  }
});
