import uberlax from './src';

uberlax(document.getElementById('uberlax-container'), {
  enableWasm: false,
  debug: false,
  images: [
    {
      src: require('./images/space/logo.png'),
      scale: 'contain',
      animation: {
        moveY: 400,
        fadeOut: 0
      }
    },
    {
      src: require('./images/space/overlay_1.png'),
      animation: {
        moveY: 200,
        fadeOut: 0
      }
    },
    {
      src: require('./images/space/overlay_2.png'),
      animation: {
        moveY: 400,
        fadeIn: 1
      }
    },
    {
      src: require('./images/space/image_1.jpeg'),
      animation: {
        moveY: 800
      }
    }
  ]
});

uberlax(document.getElementById('uberlax-container-2'), {
  enableWasm: false,
  observer: 'intersection',
  images: [
    {
      src: require('./images/space/logo.png'),
      scale: 'contain',
      animation: {
        moveY: 400,
        fadeIn: 1
      }
    },
    {
      src: require('./images/forrest/bg_4.png'),
      center: false,
      animation: {
        moveY: 100
      }
    },
    {
      src: require('./images/forrest/bg_3.png'),
      center: false,
      animation: {
        moveY: 200
      }
    },
    {
      src: require('./images/forrest/bg_2.png'),
      center: false,
      animation: {
        moveY: 300
      }
    },
    {
      src: require('./images/forrest/bg_1.png'),
      center: false,
      animation: {
        moveY: 400
      }
    },
  ]
});
