import createSearchFunction from '../src/createSearchFunction';

/**
 * @param {any} pta
 */
export default (pta) => {
  const search = createSearchFunction([
    { sentence: 'camelCasedSentence', data: 1 },
    { sentence: 'anotherCamelCasedSentence', data: 2 },
    { sentence: 'UpperCamelCasedSentence', data: 3 },
    { sentence: 'UpperGamelGasedSentence', data: 4 },
    { sentence: 'snake_case_sentence', data: 5 },
  ]);

  pta.test('should find camelcased sentences by first letters of words', /** @param {any} t */(t) => {
    t.equal(search('ccs'), [
      {
        sentence: 'camelCasedSentence',
        highlights: [{ start: 0, end: 0 }, { start: 5, end: 5 }, { start: 10, end: 10 }],
        data: 1,
        usedWordsNumbers: [0, 1, 2],
      },
      {
        sentence: 'anotherCamelCasedSentence',
        highlights: [{ start: 7, end: 7 }, { start: 12, end: 12 }, { start: 17, end: 17 }],
        data: 2,
        usedWordsNumbers: [1, 2, 3],
      },
      {
        sentence: 'UpperCamelCasedSentence',
        highlights: [{ start: 5, end: 5 }, { start: 10, end: 10 }, { start: 15, end: 15 }],
        data: 3,
        usedWordsNumbers: [1, 2, 3],
      },
    ]);
    t.equal(search('gamegs'), [{
      sentence: 'UpperGamelGasedSentence',
      highlights: [{ start: 5, end: 8 }, { start: 10, end: 10 }, { start: 15, end: 15 }],
      data: 4,
      usedWordsNumbers: [1, 2, 3],
    }]);
    t.equal(search('sna_casent'), [{
      sentence: 'snake_case_sentence',
      highlights: [{ start: 0, end: 2 }, { start: 5, end: 7 }, { start: 11, end: 14 }],
      data: 5,
      usedWordsNumbers: [0, 1, 2, 4],
    }]);
  });

  const search2 = createSearchFunction([
    { sentence: 'createSearchFunction', data: 1 },
    { sentence: 'findMatch', data: 2 },
    { sentence: 'isLetter', data: 3 },
    { sentence: 'searchFunctionFactory', data: 4 },
    { sentence: 'TreeMaker', data: 5 },
  ]);

  pta.test('should sort results', /** @param {any} t */(t) => {
    t.equal(search2('seaf'), [
      {
        data: 4,
        highlights: [{ start: 0, end: 2 }, { start: 6, end: 6 }],
        sentence: 'searchFunctionFactory',
        usedWordsNumbers: [0, 1],
      },
      {
        data: 1,
        highlights: [{ end: 8, start: 6 }, { end: 12, start: 12 }],
        sentence: 'createSearchFunction',
        usedWordsNumbers: [1, 2],
      },
    ]);
  });
};
