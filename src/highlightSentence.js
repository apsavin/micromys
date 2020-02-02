/**
 * @typedef {import('./SearchFunctionFactory').HighlightRange} HighlightRange
 */

/**
 * @template HighlightedText
 * @param {{
 *   sentence: string,
 *   highlights: Array<HighlightRange>,
 *   highlight: function(string): HighlightedText
 * }} options
 * @returns {Array<string | HighlightedText>}
 */
function highlightSentence({ sentence, highlights, highlight: highlightChunk }) {
  if (!highlights || !highlights.length) {
    return [sentence];
  }

  const result = [];

  const firstHighlight = highlights[0];
  if (firstHighlight.start !== 0) {
    result.push(sentence.slice(0, firstHighlight.start));
  }

  for (let i = 0; i < highlights.length; i++) {
    const highlight = highlights[i];
    const prevHighlight = highlights[i - 1];
    if (prevHighlight) {
      result.push(sentence.slice(prevHighlight.end + 1, highlight.start));
    }
    result.push(highlightChunk(sentence.slice(highlight.start, highlight.end + 1)));
  }

  const lastHighlight = highlights[highlights.length - 1];
  if (lastHighlight) {
    result.push(sentence.slice(lastHighlight.end + 1));
  }

  return result;
}

export default highlightSentence;
