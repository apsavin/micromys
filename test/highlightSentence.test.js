import highlightSentence from '../src/highlightSentence';

/**
 * @param {any} pta
 */
export default (pta) => {
  pta.test('should highlight text in sentence', /** @param {any} t */(t) => {
    /**
     * @param {string} text
     * @returns {{text: string}}
     */
    const highlight = (text) => ({ text });
    t.equal(highlightSentence({ sentence: 'aBc_d', highlights: [{ start: 1, end: 2 }], highlight }), [
      'a',
      { text: 'Bc' },
      '_d',
    ]);
    t.equal(highlightSentence({ sentence: 'aBc_d', highlights: [{ start: 0, end: 0 }], highlight }), [
      { text: 'a' },
      'Bc_d',
    ]);
    t.equal(highlightSentence({ sentence: 'aBc_d', highlights: [], highlight }), [
      'aBc_d',
    ]);
  });
};
