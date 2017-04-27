const React = require('react');
const {PropTypes} = React;

const {Slide} = require('spectacle');
const CodeSlideTitle = require('./CodeSlideTitle');
const CodeSlideNote = require('./CodeSlideNote');
const CodeSlideImage = require('./CodeSlideImage');

const clamp = require('lodash.clamp');
const padStart = require('lodash.padstart');
const getHighlightedCodeLines = require('./getHighlightedCodeLines');
const calculateScrollCenter = require('./calculateScrollCenter');
const scrollToElement = require('./scrollToElement');
const getComputedCodeStyle = require('./getComputedCodeStyle');

function startOrEnd(index, loc) {
  if (index === loc[0]) {
    return 'start';
  } else if (index === loc[1]) {
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

const computedCodeStyle = getComputedCodeStyle();
const defaultBgColor = computedCodeStyle.backgroundColor || "#122b45";
const defaultColor = computedCodeStyle.color || "white";

const style = {
  position: 'relative',
  textAlign: 'center',
  overflow: 'hidden',
  color: defaultColor,
  height: '646px',
  margin: 0,
  padding: '40% 0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word'
};

class CodeSlide extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    ranges: PropTypes.arrayOf(PropTypes.shape({
      loc: PropTypes.arrayOf(PropTypes.number).isRequired,
      title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      note: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    })),
    showLineNumbers: PropTypes.bool
  };

  static defaultProps = {
    showLineNumbers: true
  };

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
    updateNotes: React.PropTypes.func
  };

  state = {
    active: this.getStorageItem() || 0
  };

  componentWillMount() {
    this.updateNotes();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('storage', this.onStorage);
    window.addEventListener('resize', this.onResize);
    this.scrollActiveIntoView(true);

    requestAnimationFrame(() => {
      this.scrollActiveIntoView(true);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('storage', this.onStorage);
    window.removeEventListener('resize', this.onResize);
  }

  componentWillEnter(cb) {
    this.refs.slide.componentWillEnter(cb)
  }

  componentWillAppear(cb) {
    this.refs.slide.componentWillAppear(cb)
  }

  componentWillLeave(cb) {
    this.refs.slide.componentWillLeave(cb)
  }

  getStorageId() {
    return 'code-slide:' + this.props.slideIndex;
  }

  getStorageItem() {
    return +localStorage.getItem(this.getStorageId());
  }

  setStorageItem(value) {
    return localStorage.setItem(this.getStorageId(), '' + value);
  }

  isSlideActive() {
    const slide = this.context.store.getState().route.slide;
    return this.props.slideIndex === parseInt(slide);
  }

  goTo(active, skipLocalStorage) {
    this.setState({ active }, this.scrollActiveIntoView);
    this.updateNotes();

    if (!skipLocalStorage) {
      this.setStorageItem(active);
    }
  }

  scrollActiveIntoView = (skipAnimation) => {
    const {container, start, end} = this.refs;
    const scrollTo = calculateScrollCenter(start, end, container);
    scrollToElement(container, 0, scrollTo, {
      duration: skipAnimation ? 1 : 1000
    });
  };

  onResize = () => {
    this.scrollActiveIntoView(true);
  };

  onKeyDown = e => {
    if (!this.isSlideActive()) {
      return;
    }

    let prev = this.state.active;
    let active = null;

    if (e.which === 38) {
      active = prev - 1;
    } else if (e.which === 40) {
      active = prev + 1;
    }

    if (active !== null) {
      e.preventDefault();
      active = clamp(active, 0, this.props.ranges.length - 1);
      this.goTo(active);
    }
  };

  onStorage = e => {
    if (e.key === this.getStorageId()) {
      this.goTo(+e.newValue, true);
    }
  };

  updateNotes() {
    if (
      !this.isSlideActive() ||
      !this.context.updateNotes
    ) {
      return;
    }

    const {ranges, notes} = this.props;
    const {active} = this.state;

    const range = ranges[active] || {};
    const rangeNotes = range.notes;

    this.context.updateNotes(rangeNotes || notes);
  }

  render() {
    const {code, lang, ranges, color, bgColor, notes, showLineNumbers, ...rest} = this.props;
    const {active} = this.state;

    const range = ranges[active] || {};
    const loc = range.loc || [];
    const slideBg = bgColor || defaultBgColor;

    style.color = color || style.color;

    const lines = getHighlightedCodeLines(code, lang).map((line, index) => {
      return <div
        key={index}
        ref={startOrEnd(index, loc)}
        dangerouslySetInnerHTML={{
          __html: showLineNumbers
            ? getLineNumber(index) + line
            : line
        }}
        style={{ opacity: calculateOpacity(index, loc) }}/>;
    });

    return (
      <Slide ref='slide' bgColor={slideBg} margin={1} {...rest}>
        {range.title && <CodeSlideTitle>{range.title}</CodeSlideTitle>}

        <pre ref="container" style={style}>
          <code style={{ display: "inline-block", textAlign: "left" }}>{lines}</code>
        </pre>

        {range.note && <CodeSlideNote>{range.note}</CodeSlideNote>}

        {range.image && <CodeSlideImage src={range.image}/>}
      </Slide>
    );
  }
}

module.exports = CodeSlide;
