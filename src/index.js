import createRenderer from './renderer';
import createMath from './math';
import createObserver from './observer';

export default async (elem, passedConfig) => {
  const defaultConfig = {
    enableWasm: false,
    observer: 'scroll'
  };

  const config = {
    ...defaultConfig,
    ...passedConfig
  }

  const math = await createMath(config.enableWasm);

  const Renderer = createRenderer(math);

  let loopStarted = false;

  elem.innerHTML = '';

  let scrollPercentage = 0;

  const canvas = global.document.createElement('canvas');

  let { width, height, top: initialTop } = elem.getBoundingClientRect();

  height = Math.ceil(height);
  width = Math.ceil(width);
  initialTop = Math.max(initialTop, 0);

  canvas.height = height;
  canvas.width = width;

  const ctx = canvas.getContext('2d');

  elem.appendChild(canvas);

  const renderer = new Renderer(ctx, config.images, {
    ...(config || {}),
    backgroundColor: 'rgba(255, 255, 255, 0)'
  });

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
    updateScroll(1);
    renderer.render(scrollPercentage);
  });

  if (config.update !== false) {
    const observer = await createObserver(config.observer);
    observer(elem, math, updateScroll);
  }
};
