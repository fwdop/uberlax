export default ({
  calculateWidthToCover,
  calculateHeightToCover,
  calculatePositionByPercentage
}) => {
  class ImageComponent {
    constructor(path, opts) {
      this._image = new Image();
      this._image.src = path;
      this.width = 0;
      this.height = 0;

      this._opts = {
        moveX: 0,
        moveY: 0,
        center: true,
        ...opts
      };

      this.startX = 0;
      this.startY = 0;

      this._loadPromise = new Promise((resolve) => {
        this._image.addEventListener("load", resolve, false);
      });

      this._loadPromise.then(() => {
        this.width = this._image.width;
        this.height = this._image.height;
      });
    }

    calculateSizeToCover(canvasWidth, canvasHeight) {
      let { width, height } = this;
      // performance todo: cache scaled width and height

      if (width >= height) {
        return {
          width: calculateWidthToCover(width, height, canvasHeight),
          height: canvasHeight
        }
      }

      return {
        width: canvasWidth,
        height: calculateHeightToCover(width, height, canvasWidth)
      }
    }

    onLoad() {
      return this._loadPromise;
    }

    render(ctx, scrollPercentage = 0) {
      const canvasHeight = ctx.canvas.height;
      const canvasWidth = ctx.canvas.width;

      const { width, height } = this.calculateSizeToCover(canvasWidth, canvasHeight);
      const { moveY, center } = this._opts;
      let { startY: newPosY } = this;
      let newPosX = 0;

      if (moveY > 0) {
        newPosY = calculatePositionByPercentage(newPosY, moveY, scrollPercentage);
      }

      if (center && width > canvasWidth) {
        newPosX = -((width - canvasWidth) / 2);
      }

      ctx.drawImage(
        this._image, newPosX, newPosY, width, height
      );
    }
  }

  return class Renderer {
    constructor(ctx, images, opts) {
      this._ctx = ctx;
      this._opts = opts;
      this._components = images.map((image) => {
        if (!image.src) {
          throw new Error('Image does not have a `src` property');
        }
        return new ImageComponent(image.src, image.animation);
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
        element => element.render(this._ctx, scrollPercentage)
      );
    }
  }
}
