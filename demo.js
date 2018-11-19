import uberlax from './src';

uberlax(document.getElementById('uberlax-container'), {
  enableWasm: false,
  images: [
    {
      src: require('./images/logo.png'),
      animation: {
        moveY: 400
      }
    },
    {
      src: require('./images/overlay_1.png'),
      animation: {
        moveY: 200,
        fadeOut: 0
      }
    },
    {
      src: require('./images/overlay_2.png'),
      animation: {
        moveY: 400
      }
    },
    {
      src: require('./images/image_1.jpeg'),
      animation: {
        moveY: 800
      }
    }
  ]
});

uberlax(document.getElementById('uberlax-container-2'), {
  enableWasm: false,
  images: [{
    src: require('./images/image_1_vertical.jpeg'),
    animation: {
      moveY: 200,
      center: false
    }
  }]
});
