module.exports = (elem, math, callback) => {
  window.addEventListener('scroll', () => {
    const { top, height } = elem.getBoundingClientRect();
    callback(math.calculateScrollPercentage(Math.ceil(height), top))
  });
}
