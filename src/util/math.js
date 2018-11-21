const ratios = {
  cover(wRatio, hRatio) {
    return Math.max(wRatio, hRatio);
  },

  contain(wRatio, hRatio) {
    return Math.min(wRatio, hRatio);
  },

  stretch(wRatio, hRatio) {
    return { width: wRatio, height: hRatio };
  },
};

module.exports = {
  getImageSize: (options) => {
    const r = ratios[options.scale](
      options.container.width / options.image.width,
      options.container.height / options.image.height,
    );

    return {
      width: options.image.width * (r.width || r),
      height: options.image.height * (r.height || r),
    };
  },
  calculatePositionByPercentage: (start, moveTo, percentage) => (
    (moveTo * percentage / 100.0) + start
  ),
  calculateScrollPercentage: (elementHeight, elementTop) => {
    if (elementTop >= 0) {
      return 0;
    }
    const absElementTop = Math.abs(elementTop);
    const visibleHeight = elementHeight - absElementTop;
    const percentage = (visibleHeight * 100 / elementHeight);

    return Math.abs(percentage - 100);
  },
  calculateFadeOutOpacity(fadeOut, percentage) {
    return (1 - fadeOut) / (100 / (100 - percentage));
  },
  calculateFadeInOpacity(fadeIn, percentage) {
    return (fadeIn) / (100 / (percentage));
  },
};
