import TreeMaker from '../src/TreeMaker';
import isLetter from '../src/isLetter';

/**
 * @param {any} pta
 */
export default (pta) => {
  const treeMaker = new TreeMaker(isLetter);

  pta.test('should find camelcased sentences by first letters of words', /** @param {any} t */(t) => {
    const d = [{ index: 4, subTree: {}, startOfWordNumber: 3 }];
    const _ = [{ index: 3, subTree: { d }, startOfWordNumber: 2 }];
    const b = [{
      index: 1,
      startOfWordNumber: 1,
      subTree: {
        c: [{
          index: 2,
          subTree: {
            _,
            d,
          },
        }],
        _,
        d,
      },
    }];
    t.equal(treeMaker.makeTree('aBc_d'), {
      a: [{
        index: 0,
        startOfWordNumber: 0,
        subTree: {
          b,
          _,
          d,
        },
      }],
      b,
      _,
      d,
    });
  });
};
