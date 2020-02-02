/**
 * @param {{ usedWordsNumbers: Array<number> }} a
 * @param {{ usedWordsNumbers: Array<number> }} b
 * @returns {number}
 */
const compareResults = (a, b) => {
  const first = a.usedWordsNumbers.join('');
  const second = b.usedWordsNumbers.join('');
  if (first === second) {
    return 0;
  }

  return first > second ? 1 : -1;
};

export default compareResults;
