/* global particlesJS */
import 'particles.js';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    Object.deepExtend = function deepExtendFunction(destination, source) {
      for (const property in source) {
        if (
          source[property] &&
          source[property].constructor &&
          source[property].constructor === Object
        ) {
          destination[property] = destination[property] || {};
          deepExtendFunction(destination[property], source[property]);
        } else {
          destination[property] = source[property];
        }
      }
      return destination;
    };

    particlesJS('particles', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        color: {
          value: [
            '#402717', //茶系$gradation_ver2
            '#00005d', //青系$bg_formColor
            '#ab0f50', //赤系$gradation_ver1
            '#dc8ba7', //ピンク系
            '#6e5064', //紫系
            '#f29b30', //黄系
            '#cc0000', //赤系
          ],
        },
        shape: {
          type: 'polygon',
          stroke: {
            width: 0,
            color: '#000000',
          },
          polygon: {
            nb_sides: 3,
          },
          image: {
            src: 'img/github.svg',
            width: 800,
            height: 800,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 30,
            opacity_min: 0,
            sync: false,
          },
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: true,
            speed: 20,
            size_min: 0.3,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'bottom-right',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 900,
            rotateY: 900,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'bubble',
          },
          onclick: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
            speed: 3,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  },
  false,
);
