import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
  // スムーススクロール機能
  function initSmoothScroll() {
    const menuLinks = document.querySelectorAll('.header__menu_link[href^="#"]');
    
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // スムーススクロールでターゲット要素に移動
          gsap.to(window, {
            duration: 1.2,
            scrollTo: {
              y: targetElement,
              offsetY: 80, // ヘッダーの高さ分オフセット
            },
            ease: 'power2.inOut',
          });
        } else {
          console.warn(`Target element not found: ${targetId}`);
        }
      });
    });
  }
  
  initSmoothScroll();
});
