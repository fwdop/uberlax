#[no_mangle]
pub fn calculateWidthToCover(elementWidth: f32, elementHeight: f32, canvasHeight: f32) -> f32 {
  let scalePercent: f32 = canvasHeight * 100.0 / elementHeight;
  let newWidth: f32 = elementWidth * scalePercent / 100.0;

  return newWidth;
}

#[no_mangle]
pub fn calculateHeightToCover(elementWidth: f32, elementHeight: f32, canvasWidth: f32) -> f32 {
  let scalePercent: f32 = canvasWidth * 100.0 / elementWidth;
  let newHeight: f32 = elementHeight * scalePercent / 100.0;

  return newHeight;
}

#[no_mangle]
pub fn calculatePositionByPercentage(start: f32, moveTo: f32, percentage: f32) -> f32 {
  let newPos: f32 = (moveTo * percentage / 100.0) + start;
  return newPos;
}

#[no_mangle]
pub fn calculateScrollPercentage(elementHeight: f32, elementTop: f32) -> f32 {
  if elementTop >= 0.0 {
    return 0.0;
  }

  let absElementTop = (elementTop).abs();
  let visibleHeight = elementHeight - absElementTop;
  let percentage = (visibleHeight * 100.0 / elementHeight);

  return (percentage - 100.0).abs();
}
