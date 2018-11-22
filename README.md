# uberlax
[![Build Status](https://travis-ci.org/fwdop/uberlax.svg?branch=master)](https://travis-ci.org/fwdop/uberlax)

A high-performance canvas based parallax library

![demo](https://github.com/fwdop/uberlax/raw/master/images/uberlax-demo.gif)

## Features
- high-performance
- Supported transitions: `moveX`, `moveY`, `fadeIn`, `fadeOut`
- `<iframe>` support with `IntersectionObserver`

## Demo
A demo displaying some of the features can be [found here](https://uberlax.fwdop.cloud/0.0.2/demo/index.html)

## Example

```javascript
uberlax(document.getElementById('container'), {
  images: [{
    src: './images/image.jpeg',
    animation: {
      moveY: 200
    }
  }]
});
```
