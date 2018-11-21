import math from '../util/math';

module.exports = (elem, callback) => {
  window.addEventListener('scroll', () => {
    const { top, height } = elem.getBoundingClientRect();
    callback(math.calculateScrollPercentage(Math.ceil(height), top))
  });
}
