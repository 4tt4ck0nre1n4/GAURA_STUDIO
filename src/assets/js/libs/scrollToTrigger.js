import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

window.onload = function () {
  ScrollTrigger.create({
    trigger: '#features',
    start: 'top center',
    end: 'bottom top',
    onUpdate: function () {
      if (window.scrollY > 300) {
        gsap.to('#returnToTop', {
          duration: 0.3,
          opacity: 1,
        });
      } else {
        gsap.to('#returnToTop', {
          duration: 0.3,
          opacity: 0,
        });
      }
    },
  });

  document.getElementById('returnToTop').addEventListener('click', () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 0 },
      ease: 'power2.out',
    });
  });
};
