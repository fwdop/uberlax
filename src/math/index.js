module.exports = (enableWasm) => {
  if (enableWasm) {
    return import('./math.rs');
  } else {
    return import('./math.js');
  }
};
