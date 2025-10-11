export * from '@js/libs/hamburger';
export * from '@js/libs/accordion';
export * from '@js/libs/scrollToTrigger';
export * from '@js/libs/configParticles';
export * from '@js/libs/screenTransition';
export * from '@js/libs/buttonTransition';
export * from '@js/libs/submit';
export * from '@js/libs/formData';
export * from '@js/libs/optionSwiper';

import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    mirror: true,
    duration: 1500,
    disable: function () {
      return window.innerWidth < 480;
    },
  });
});
