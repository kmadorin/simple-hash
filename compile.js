const { compile } = require('@waves/ride-js');
const btoa = require('btoa');

const bufferToBase64 = (buf) => {
  const binstr = Array.prototype.map.call(buf, (ch) => String.fromCharCode(ch)).join('');
  return btoa(binstr)
}

const cmpl = (code) => {
  const r = compile(code);

  if (r.error) {
    throw new Error(r.error);
  }

  return r.result.base64;
}

module.exports = cmpl

