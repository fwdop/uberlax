# uberlax

![demo](https://github.com/fwdop/uberlax/raw/master/images/uberlax-demo.gif)

A high-performance canvas based parallax library

## Features
- high-performance
- Supported transitions: `moveX`, `moveY`, `fadeIn`, `fadeOut`
- `<iframe>` support with `IntersectionObserver`

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
