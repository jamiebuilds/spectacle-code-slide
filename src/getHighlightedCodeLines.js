const memoize = require('lodash.memoize');

function highlightCode(code, lang) {
  if (window.Prism) {
    return window.Prism.highlight(code, window.Prism.languages[lang])
  } else {
    return code;
  }
}

function getHighlightedCodeLines(code, lang) {
  return highlightCode(code, lang).split('\n');
}

module.exports = memoize(getHighlightedCodeLines);
