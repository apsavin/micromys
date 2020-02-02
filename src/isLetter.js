/**
 * @param {string} symbol
 * @returns {boolean}
 */
function isLetter(symbol) {
  return /[a-z]/i.test(symbol);
}

export default isLetter;
