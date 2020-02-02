/**
 * @typedef {{ start: number, end: number }} HighlightRange
 */

/**
 * @template Data
 * @template MatchResult
 * @typedef {{ sentence: string, data: Data } & MatchResult} SearchResult
 */

/**
 * @template {{}} Index
 * @template {{ highlights: Array<HighlightRange> }} MatchResult
 */
class SearchFunctionFactory {
  /**
   * @template Data
   * @typedef {Array<{ sentence: string, index: Index, data: Data }>} IndexedHaystack
   */

  /**
   * @typedef {function({ sentence: string } & MatchResult, { sentence: string } & MatchResult): number} CompareResults
   */

  /**
   * @param {function(string): Index} makeIndex
   * @param {function(Index, string): MatchResult | null} findMatch
   * @param {CompareResults} compareResults
   */
  constructor(makeIndex, findMatch, compareResults) {
    this.getIndex = makeIndex;
    this.findMatch = findMatch;
    this.compareResults = compareResults;
  }

  /**
   * @template Data
   * @param {Array<{ sentence: string, data: Data }>} haystack
   * @returns {function(string): Array<SearchResult<Data, MatchResult>>}
   */
  createSearchFunction(haystack) {
    const indexedHaystack = this.indexHaystack(haystack);
    return (needle) => this.getSearchResults(indexedHaystack, needle);
  }

  /**
   * @template Data
   * @param {IndexedHaystack<Data>} indexedHaystack
   * @param {string} needle
   * @returns {Array<SearchResult<Data, MatchResult>>}
   */
  getSearchResults(indexedHaystack, needle) {
    const lowerCasedNeedle = needle.toLowerCase();
    return indexedHaystack
      .reduce((/** @type {Array<SearchResult<Data, MatchResult>>} */acc, { sentence, index, data }) => {
        const match = this.findMatch(index, lowerCasedNeedle);
        if (match) {
          acc.push({ sentence, data, ...match });
        }
        return acc;
      }, [])
      .sort(this.compareResults);
  }

  /**
   * @template Data
   * @param {Array<{ sentence: string, data: Data }>} haystack
   * @returns {IndexedHaystack<Data>}
   */
  indexHaystack(haystack) {
    return haystack.map(({ sentence, data }) => ({ sentence, data, index: this.getIndex(sentence) }));
  }
}

export default SearchFunctionFactory;
