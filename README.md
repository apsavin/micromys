# Micromys

A tiny tool that helps to find strings in pre-defined dictionary by user input. 
It uses algorithm similar to one that IDEs use when user looks for a file by some parts of the file's name. 
For example, it finds string `aTinyTool` when input is `att`.

## Installation

`yarn add micromys` or `npm install micromys`

## Usage

### Basic

```js
import { createSearchFunction } from 'micromys';

const search = createSearchFunction(['myFavoriteFile', 'i_love_underscores']);

const searchResults = search('ilo');
console.log(searchResults); 
// [{ 
//   sentence: 'i_love_underscores', 
//   highlights: [
//     { start: 0, end: 0 },
//     { start: 2, end: 3 },
//   ], 
// }]
```

### Advanced

You can think of this module as of a constructor.
Feel free to import any parts of `micromys` and to build something new from them.
You can start from `createSearchFunction.js` - the place that wires all the sub parts. 
For example, you can provide your own custom `isLetter` function in order to add support for languages with non-latin alphabets.

### Highlighting

In order to simplify highlighting implementation there is `highlightSentence` function.

```js
import { highlightSentence } from 'micromys/src/highlightSentence';

const highlighted = highlightSentence({ 
  sentence: 'some words',
  highlights: [{ start: 0, end: 3 }],
  highlight: (text) => `<b>${text}</b>`,
}).join('');

console.log(highlighted); // '<b>some</b> words'
```

### CommonJS support

If you need to `require` instead of `import`, use `require('micromys/cjs');`

## Limitations

By default `micromys` supports only latin alphabet. If you need more, see `Advanced` section above.
