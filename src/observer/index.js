module.exports = (observer) => {
  if (observer === 'scroll') {
    return import('./scroll.js');
  }
  if (observer === 'intersection') {
    return import('./intersection.js');
  }
  throw new Error('opts.observer must be either `scroll` or `intersection`');
};
