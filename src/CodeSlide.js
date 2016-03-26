const React = require('react');
const {PropTypes} = React;

const {Slide} = require('spectacle');
const CodeSlideTitle = require('./CodeSlideTitle');
const CodeSlideCode = require('./CodeSlideCode');
const CodeSlideNote = require('./CodeSlideNote');

const clamp = require('lodash.clamp');
const padStart = require('lodash.padstart');
const getHighlightedCodeLines = require('./getHighlightedCodeLines');
const calculateScrollCenter = reuqire('./calculateScrollCenter');

function startOrEnd(index, loc) {
  if (index === loc[0]) {
    return 'start';
  } else if (index - 1 === loc[1]) {
    return 'end';
  } else {
    return null;
  }
}

function calculateOpacity(index, loc) {
  return (loc[0] <= index && loc[1] > index) ? 1 : 0.2;
}

function getLineNumber(index) {
  return '<span class="token comment">' + padStart(index + 1, 3) + '.</span> ';
}

class CodeSlide extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    ranges: PropTypes.arrayOf(PropTypes.shape({
      loc: PropTypes.arrayOf(PropTypes.number).isRequired,
      title: PropTypes.string,
      note: PropTypes.string
    }))
  };

  state = {
    active: 0
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    let prev = this.state.active;
    let active;

    if (e.which === 38) {
      active = prev - 1;
    } else if (e.which === 40) {
      active = prev + 1;
    }

    if (active) {
      e.preventDefault();
      active = clamp(active, 0, this.props.ranges.length);
      this.setState({ active }, this.scrollIntoView);
    }
  };

  scrollIntoView = () => {
    const {container, start, end} = this.refs;
    const scrollTo = calculateScrollCenter(start, end, container);
    scrollToElement(container, 0, scrollTo);
  };

  render() {
    const {code, lang, ranges, ...rest} = this.props;
    const {active} = this.state;

    const range = ranges[active] || {};
    const loc = range.loc || [];

    const lines = getHighlightedCodeLines(code, lang).map((line, index) => {
      return <div
        key={index}
        ref={startOrEnd(index, loc)}
        dangerouslySetInnerHTML={{ __html: getLineNumber(index) + line }}
        style={{ opacity: calculateOpacity(index, loc) }}/>;
    });

    return (
      <Slide {...rest} bgColor="#122b45" margin={1}>
        {range.title && <CodeSlideTitle>{range.title}</CodeSlideTitle>}
        <CodeSlideCode ref="container" code={code} lang={lang} ranges={ranges}/>
        {range.note && <CodeSlideNote>{range.note}</CodeSlideNote>}
      </Slide>
    );
  }
}

module.exports = CodeSlide;
