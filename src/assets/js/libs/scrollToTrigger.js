import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

window.onload = function () {
  const returnToTopBtn = document.getElementById('returnToTop');

  // スクロール位置に応じてボタンの表示/非表示を制御
  function updateReturnToTopButton() {
    const scrollY = window.scrollY;

    if (scrollY > 300) {
      // スクロール位置が300pxを超えたらボタンを表示
      gsap.to(returnToTopBtn, {
        duration: 0.3,
        opacity: 1,
        ease: 'power2.out',
      });
    } else if (scrollY <= 100) {
      // スクロール位置が100px以下になったらボタンを非表示
      gsap.to(returnToTopBtn, {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.in',
      });
    }
  }

  // ScrollTriggerでスクロールイベントを監視
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: updateReturnToTopButton,
  });

  // 手動でスクロールイベントも監視（ScrollTriggerの補完として）
  window.addEventListener('scroll', updateReturnToTopButton);

  // トップへ戻るボタンのクリックイベント
  returnToTopBtn.addEventListener('click', () => {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: 0 },
      ease: 'power2.inOut',
      onComplete: () => {
        // アニメーション完了後にボタンを非表示
        gsap.to(returnToTopBtn, {
          duration: 0.6,
          opacity: 0,
          ease: 'power2.in',
        });
      },
    });
  });
};
