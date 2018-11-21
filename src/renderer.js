import {
  getImageSize,
  calculatePositionByPercentage,
  calculateFadeOutOpacity,
  calculateFadeInOpacity,
} from './util/math';

export default () => {
  class ImageComponent {
    constructor(path, opts) {
      this._image = new Image();
      this._image.src = path;
      this.width = 0;
      this.height = 0;

      this._opts = {
        center: true,
        scale: 'cover',
        padding: 0,
        ...opts,
        animation: {
          moveX: 0,
          moveY: 0,
          ...opts.animation,
        },
      };

      this.startX = 0;
      this.startY = 0;

      this._loadPromise = new Promise((resolve) => {
        this._image.addEventListener('load', resolve, false);
      });

      this._loadPromise.then(() => {
        this.width = this._image.width;
        this.height = this._image.height;
      });
    }

    get dimensions() {
      return {
        x: this.width,
        y: this.height,
      };
    }

    calculateSize(canvasWidth, canvasHeight) {
      const { x: width, y: height } = this.dimensions;

      if (['contain', 'cover', 'stretch'].indexOf(this._opts.scale) === -1) {
        throw new Error('`scale` must be either `cover`, `contain` or `stretch`');
      }

      return getImageSize({
        scale: this._opts.scale,
        container: {
          width: canvasWidth,
          height: canvasHeight,
        },
        image: { width, height },
      });
    }

    onLoad() {
      return this._loadPromise;
    }

    request(canvasHeight, canvasWidth, scrollPercentage = 0) {
      const { width, height } = this.calculateSize(canvasWidth, canvasHeight);
      const { animation, center } = this._opts;
      const {
        moveY, moveX, fadeOut, fadeIn,
      } = animation;
      let {
        startY: newPosY,
        startX: newPosX,
      } = this;
      let offsetY = 0;
      let offsetX = 0;
      let opacity = 1;

      if (center) {
        offsetY = -((height - canvasHeight) / 2);
        offsetX = -((width - canvasWidth) / 2);
      }

      newPosY = calculatePositionByPercentage(newPosY + offsetY, moveY, scrollPercentage);
      newPosX = calculatePositionByPercentage(newPosX + offsetX, moveX, scrollPercentage);

      if (fadeOut < 1) {
        opacity = calculateFadeOutOpacity(fadeOut, scrollPercentage);
      }

      if (fadeIn <= 1) {
        opacity = calculateFadeInOpacity(fadeIn, scrollPercentage);
      }

      return {
        x: newPosX,
        y: newPosY,
        width,
        height,
        opacity,
      };
    }

    render(ctx, scrollPercentage = 0, debug = false) {
      const canvasHeight = ctx.canvas.height;
      const canvasWidth = ctx.canvas.width;

      const {
        x, y, width, height, opacity,
      } = this.request(
        canvasHeight, canvasWidth, scrollPercentage,
      );

      if (opacity < 1) {
        ctx.globalAlpha = opacity;
      }

      ctx.drawImage(
        this._image, x, y, width, height,
      );

      if (opacity < 1) {
        ctx.globalAlpha = 1;
      }

      if (debug) {
        ctx.strokeStyle = 'rgb(200, 0, 0)';
        ctx.strokeRect(x, y, width, height);
      }
    }
  }

  return class Renderer {
    constructor(ctx, images, opts) {
      this._ctx = ctx;
      this._opts = opts;
      this._debug = opts.debug || false;
      this._components = images.map((image) => {
        if (!image.src) {
          throw new Error('Image does not have a `src` property');
        }
        return new ImageComponent(image.src, image);
      }).reverse();

      this._loadPromise = Promise.all(this._components.map(image => image.onLoad()));
    }

    onLoad() {
      return this._loadPromise;
    }

    _clearCanvas() {
      this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }

    _paintBaseLayer() {
      this._ctx.fillStyle = this._opts.backgroundColor;
      this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }

    render(scrollPercentage = 0) {
      this._clearCanvas();
      this._paintBaseLayer();
      this._components.forEach(
        element => element.render(this._ctx, scrollPercentage, this._debug),
      );
    }
  };
};
