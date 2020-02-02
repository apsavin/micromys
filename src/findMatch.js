/**
 * @typedef {import('./SearchFunctionFactory').HighlightRange} HighlightRange
 */

/**
 * @typedef {{ highlights: Array<HighlightRange>, usedWordsNumbers: Array<number> }} MatchResult
 */

/**
 * @param {import('./TreeMaker').Tree} tree
 * @param {string} needle
 * @param {number} index
 * @returns {MatchResult | null}
 */
const findMatchRecursive = (tree, needle, index) => {
  const nodes = tree[needle[index]];

  if (!nodes) {
    return null;
  }
  const nextIndex = index + 1;
  let node = null;
  /** @type {MatchResult | null} */
  let searchResult = null;
  if (nextIndex === needle.length) {
    node = nodes[0]; // eslint-disable-line prefer-destructuring
    searchResult = { highlights: [], usedWordsNumbers: [] };
  } else {
    for (let i = 0; i < nodes.length; i++) {
      node = nodes[i];
      searchResult = findMatchRecursive(node.subTree, needle, nextIndex);
      if (searchResult) {
        break;
      }
    }
  }
  if (!searchResult || !node) {
    return null;
  }

  const highlightInfo = {
    start: node.index,
    end: node.index,
  };

  const { highlights } = searchResult;
  if (typeof node.startOfWordNumber === 'number') {
    searchResult.usedWordsNumbers.unshift(node.startOfWordNumber);
  }

  if (highlights.length && highlights[0].start === (node.index + 1)) {
    highlights[0].start--;
  } else {
    highlights.unshift(highlightInfo);
  }

  return searchResult;
};

/**
 * @param {import('./TreeMaker').Tree } tree
 * @param {string} needle
 * @returns {MatchResult | null}
 */
const findMatch = (tree, needle) => {
  const result = findMatchRecursive(tree, needle, 0);

  if (!result) {
    return null;
  }

  return result;
};

export default findMatch;
