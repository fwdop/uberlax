# uberlax

A canvas based parallax library with experimental wasm feature.

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
