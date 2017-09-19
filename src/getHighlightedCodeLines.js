const memoize = require('lodash.memoize');
const Prism = require('prismjs')

function highlightCode(code, lang) {
  return Prism.highlight(code, Prism.languages[lang])
}

function getHighlightedCodeLines(code, lang) {
  return highlightCode(code, lang).split('\n');
}

module.exports = memoize(getHighlightedCodeLines);
