import queryString from 'query-string';
import uberlax from '../src';

const parsed = queryString.parse(location.search);

if (!parsed.d) {
  throw new Error('uberlax data must be supplied via query param `d`');
}

let data;

try {
  data = JSON.parse(parsed.d);
} catch (e) {
  throw new Error('uberlax data is not valid JSON');
}

uberlax(document.getElementById('uberlax-container'), data);

