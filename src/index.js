import createRenderer from './renderer';
import createObserver from './observer';

const init = async (elem, config) => {
  const Renderer = createRenderer();

  let loopStarted = false;

  elem.innerHTML = '';

  let scrollPercentage = 0;

  const canvas = global.document.createElement('canvas');

  let dpr = 1;

  if (config.detectHighDpi) {
    dpr = window.devicePixelRatio;
  }

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const recalculate = () => {
    let { width, height } = elem.getBoundingClientRect();

    height = Math.ceil(height);
    width = Math.ceil(width);
    const initialTop = Math.max(initialTop, 0);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    renderer.render(scrollPercentage);
  };

  window.addEventListener('resize', recalculate);

  elem.appendChild(canvas);

  const renderer = new Renderer(ctx, config.images, config);

  const updateScroll = (passedScrollPercentage) => {
    scrollPercentage = passedScrollPercentage;

    if (scrollPercentage === 0 || scrollPercentage > 100) {
      stopLoop();
      return;
    }

    if (!loopStarted) {
      startLoop();
    }
  }

  const startLoop = () => {
    let requestId = null;
    loopStarted = true;
    let lastScrollPercentage = 0;
    (function loop() {
      if (!loopStarted && requestId) {
        cancelAnimationFrame(requestId);
        return;
      }
      requestId = requestAnimationFrame(() => {
        if (lastScrollPercentage !== scrollPercentage) {
          renderer.render(scrollPercentage);
          lastScrollPercentage = scrollPercentage;
        }
        loop();
      });
    })();
  }

  const stopLoop = () => {
    loopStarted = false;
  }

  renderer.onLoad().then(() => {
    recalculate();
  });

  if (config.update !== false) {
    const observer = await createObserver(config.observer);
    observer(elem, updateScroll);
  }
}

module.exports = (elem, passedConfig) => {
  if (!elem) {
    throw new Error('No element was passed to uberlax');
  }

  const defaultConfig = {
    observer: 'scroll',
    backgroundColor: 'rgba(255, 255, 255, 0)'
  };

  const config = {
    ...defaultConfig,
    ...passedConfig
  }

  init(elem, config);
};
