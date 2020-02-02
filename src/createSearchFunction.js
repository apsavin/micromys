import TreeMaker from './TreeMaker';
import isLetter from './isLetter';
import findMatch from './findMatch';
import SearchFunctionFactory from './SearchFunctionFactory';
import compareResults from './compareResults';

const treeMaker = new TreeMaker(isLetter);

/**
 * @param {string} sentence
 * @returns {import('./TreeMaker').Tree}
 */
const makeIndex = (sentence) => treeMaker.makeTree(sentence);
const searchFunctionFactory = new SearchFunctionFactory(makeIndex, findMatch, compareResults);

/**
 * @typedef {import('./findMatch').MatchResult} MatchResult
 */

/**
 * @template Data
 * @param {Array<{ sentence: string, data: Data }>} haystack
 * @returns {function(string): Array<import('./SearchFunctionFactory').SearchResult<Data, MatchResult>>}
 */
function createSearchFunction(haystack) {
  return searchFunctionFactory.createSearchFunction(haystack);
}

export default createSearchFunction;
