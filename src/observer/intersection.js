module.exports = (elem, callback) => {
  function buildThresholdList() {
    var thresholds = [];
    var numSteps = 10000;

    for (var i = 1.0; i <= numSteps; i++) {
      var ratio = i / numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }

  function handleIntersect(entries) {
    const { top } = elem.getBoundingClientRect();
    if (top > 0) {
      return callback(0);
    }
    entries.forEach(function (entry) {
      callback(100 - (entry.intersectionRatio * 100));
    });
  }

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(elem);
}
