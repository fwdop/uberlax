module.exports = (elem, callback) => {
  function buildThresholdList() {
    const thresholds = [];
    const numSteps = 10000;

    for (let i = 1.0; i <= numSteps; i++) {
      const ratio = i / numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }

  function handleIntersect(entries) {
    const { top } = elem.getBoundingClientRect();
    if (top > 0) {
      callback(0);
      return;
    }
    entries.forEach((entry) => {
      callback(100 - (entry.intersectionRatio * 100));
    });
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList(),
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(elem);
};
