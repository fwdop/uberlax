module.exports = {
  calculateWidthToCover: (elementWidth, elementHeight, canvasHeight) => {
    const scalePercent = canvasHeight * 100.0 / elementHeight;
    return elementWidth * scalePercent / 100.0;
  },
  calculateHeightToCover: (elementWidth, elementHeight, canvasWidth) => {
    const scalePercent = canvasWidth * 100.0 / elementWidth;
    return elementHeight * scalePercent / 100.0;
  },
  calculatePositionByPercentage: (start, moveTo, percentage) => {
    return (moveTo * percentage / 100.0) + start;
  },
  calculateScrollPercentage: (elementHeight, elementTop) => {
    if (elementTop >= 0) {
      return 0;
    }
    const absElementTop = Math.abs(elementTop);
    const visibleHeight = elementHeight - absElementTop;
    const percentage = (visibleHeight * 100 / elementHeight);

    return Math.abs(percentage - 100);
  }
}
