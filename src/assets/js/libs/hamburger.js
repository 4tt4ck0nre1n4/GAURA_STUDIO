'use strict';

// ハンバーガーメニュー
// 開閉操作,
// tabキー操作,
// ウィンドウサイズ,
// escapeキー終了
document.addEventListener('DOMContentLoaded', () => {
  function configHamburgers() {
    const hamburger = document.getElementById('js-button__hamburger');
    const glNav = document.getElementById('js-header__nav');
    const focusTrap = document.getElementById('js-focus__trap');
    const glNav_link = document.querySelectorAll('#js-header__nav .header__menu_link');
    const overlay = document.getElementById('js-hamburger__overlay');
    let position;

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        const openHamburger = hamburger.getAttribute('aria-label') === 'メニューを開く';

        if (!expanded) {
          hamburger.setAttribute('aria-expanded', 'true');

          if (glNav) {
            glNav.setAttribute('aria-hidden', 'false');
          }
          position = window.scrollY;
          document.body.classList.add('js-fixed');
          document.body.style.top = `-${position}px`;
          if (overlay) {
            overlay.classList.add('nav__open');
          }
        } else {
          hamburger.setAttribute('aria-expanded', 'false');
          glNav.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('js-fixed');
          document.body.style.top = `${0}px`;
          overlay.classList.remove('nav__open');
        }

        if (!openHamburger) {
          hamburger.setAttribute('aria-label', 'メニューを閉じる');
        } else {
          hamburger.setAttribute('aria-label', 'メニューを開く');
        }
      });

      if (focusTrap) {
        focusTrap.addEventListener('focusin', () => {
          hamburger.focus();
        });
      }

      glNav_link.forEach((link) => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 480) {
            hamburger.click();
          }
        });
      });

      if (overlay) {
        overlay.addEventListener('click', () => {
          hamburger.click();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          hamburger.click();
        }
      });
    }
  }

  configHamburgers();
});
