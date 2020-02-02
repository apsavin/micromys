
/**
 * @typedef {{ index: number,  subTree: Tree, startOfWordNumber?: number }} Node
 */

/**
 * @typedef {Object<string, Array<Node>>} Tree
 */

/**
 * @typedef {{ loweredLetter: string, node: Node }} WordHead
 */

class TreeMaker {
  /**
   * @param {function(string): boolean} isLetter
   */
  constructor(isLetter) {
    this.isLetter = isLetter;
  }

  /**
   * @param {string} sentence
   * @returns {Tree}
   */
  makeTree(sentence) {
    /** @type {Array<WordHead>} */
    const words = [];
    let wordHead = null;

    for (let i = sentence.length - 1; i >= 0; i--) {
      const letter = sentence[i];
      const loweredLetter = letter.toLowerCase();
      /** @type {Node} */
      const node = { index: i, subTree: {} };
      if (wordHead && !words.includes(wordHead)) {
        this.addWordToTree(node.subTree, wordHead);
      }
      wordHead = { node, loweredLetter };
      this.addWordsToTree(node.subTree, words);
      if (this.isStartOfWord({ i, sentence, letter, loweredLetter })) {
        words.unshift(wordHead);
      }
    }

    this.countWords(words);

    return this.addWordsToTree({}, words);
  }

  /**
   * @param {Tree} tree
   * @param {WordHead} word
   * @returns {Tree}
   */
  addWordToTree(tree, word) { // eslint-disable-line class-methods-use-this
    const { loweredLetter, node } = word;
    tree[loweredLetter] = tree[loweredLetter] || []; // eslint-disable-line no-param-reassign
    tree[loweredLetter].push(node);
    return tree;
  }

  /**
   * @param {Tree} tree
   * @param {Array<WordHead>} words
   * @returns {Tree}
   */
  addWordsToTree(tree, words) {
    for (let i = 0; i < words.length; i++) {
      this.addWordToTree(tree, words[i]);
    }
    return tree;
  }

  /**
   * @param {{ i: number, letter: string, loweredLetter: string, sentence: string }} params
   * @returns {boolean}
   */
  isStartOfWord({ i, letter, loweredLetter, sentence }) {
    return i === 0 // start of the sentence is the start of a word
      || !this.isLetter(sentence[i - 1]) // for `a_b` `b` is the start of a word, because there's `_` before `b`
      || (loweredLetter !== letter) // support for camelCase
      || !this.isLetter(sentence[i]); // for `a__b` we treat every `_` as a separate word
  }

  /**
   * @param {Array<WordHead>} words
   */
  countWords(words) { // eslint-disable-line class-methods-use-this
    for (let i = 0; i < words.length; i++) {
      words[i].node.startOfWordNumber = i; // eslint-disable-line no-param-reassign
    }
  }
}

export default TreeMaker;
