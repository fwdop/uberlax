import createRenderer from './renderer';
import createObserver from './observer';

const init = async (passedElem, config) => {
  const Renderer = createRenderer();
  const elem = passedElem;
  let loopStarted = false;

  elem.innerHTML = '';

  let scrollPercentage = 0;

  const canvas = global.document.createElement('canvas');

  let dpr = 1;

  if (config.detectHighDpi) {
    dpr = global.window.devicePixelRatio;
  }

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  elem.appendChild(canvas);

  const renderer = new Renderer(ctx, config.images, config);

  const recalculate = () => {
    let { width, height } = elem.getBoundingClientRect();

    height = Math.ceil(height);
    width = Math.ceil(width);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    renderer.render(scrollPercentage);
  };

  const startLoop = () => {
    let requestId = null;
    loopStarted = true;
    let lastScrollPercentage = 0;
    (function loop() {
      if (!loopStarted && requestId) {
        global.window.cancelAnimationFrame(requestId);
        return;
      }
      requestId = global.window.requestAnimationFrame(() => {
        if (lastScrollPercentage !== scrollPercentage) {
          renderer.render(scrollPercentage);
          lastScrollPercentage = scrollPercentage;
        }
        loop();
      });
    }());
  };

  const stopLoop = () => {
    loopStarted = false;
  };

  global.window.addEventListener('resize', recalculate);


  const updateScroll = (passedScrollPercentage) => {
    scrollPercentage = passedScrollPercentage;

    if (scrollPercentage === 0 || scrollPercentage > 100) {
      stopLoop();
      return;
    }

    if (!loopStarted) {
      startLoop();
    }
  };

  renderer.onLoad().then(() => {
    recalculate();
  });

  if (config.update !== false) {
    const observer = await createObserver(config.observer);
    observer(elem, updateScroll);
  }
};

module.exports = (elem, passedConfig) => {
  if (!elem) {
    throw new Error('No element was passed to uberlax');
  }

  const defaultConfig = {
    observer: 'scroll',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  };

  const config = {
    ...defaultConfig,
    ...passedConfig,
  };

  init(elem, config);
};
