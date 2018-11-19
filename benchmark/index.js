import mathJs from '../src/math/math.js';
import mathRs from '../src/math/math.rs';

var iterations = 10000000;
console.time('JavaScript');
for (var i = 0; i < iterations; i++) {
  mathJs.calculatePositionByPercentage(1000, 500, 2000);
};
console.timeEnd('JavaScript')

console.time('Rust (WASM)');
for (var i = 0; i < iterations; i++) {
  mathRs.calculatePositionByPercentage(1000, 500, 2000);
};
console.timeEnd('Rust (WASM)')
