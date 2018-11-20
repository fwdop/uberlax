# uberlax

![demo]()

A high-performance canvas based parallax library

## Example

```javascript
uberlax(document.getElementById('container'), {
  enableWasm: true, // default: disabled
  images: [{
    src: './images/image.jpeg',
    animation: {
      moveY: 200
    }
  }]
});
```
