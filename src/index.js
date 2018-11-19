import createRenderer from './renderer';
import createMath from './math';

export default async (elem, passedConfig) => {
  const defaultConfig = {
    enableWasm: false
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
    ...(config.canvas || {}),
    backgroundColor: 'rgba(255, 255, 255, 0)'
  });

  const updateScroll = () => {
    const { top } = elem.getBoundingClientRect();
    scrollPercentage = math.calculateScrollPercentage(height, top);

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

  if (config.update !== false) {
    window.addEventListener('scroll', () => updateScroll());
  }

  renderer.onLoad().then(() => {
    updateScroll();
    renderer.render(scrollPercentage);
  });
};
