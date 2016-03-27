const React = require('react');
const {render} = require('react-dom');
const {Deck, Slide, Spectacle} = require('spectacle');
const createTheme = require('spectacle/lib/themes/default')['default'];

const CodeSlide = require('spectacle-code-slide');
const code = require('./code');

const theme = createTheme({
  primary: 'white',
  quartenary: '#122b45'
});

class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={[]} transitionDuration={0} progress="bar">
          <CodeSlide transition={[]} lang="js" code={code} ranges={[
            { loc: [ 0, 31], title: 'spectacle-code-slide', note: 'Navigate with your up and down arrow keys' },
            { loc: [ 0,  1], note: 'Import the module' },
            { loc: [ 2,  9], note: 'Setup your presentation' },
            { loc: [10, 26], note: 'Time to create your first CodeSlide' },
            { loc: [11, 12], note: 'Props like "transition" get passed through to Slide' },
            { loc: [12, 13], note: 'Specify a "lang"' },
            { loc: [13, 14], note: 'Pass in your code as a string' },
            { loc: [14, 26], note: 'Now to specify some ranges. They are an array of objects' },
            { loc: [18, 19], note: 'Each one has a "loc" property with a start and an end.' },
            { loc: [16, 17], title: 'You can also add a "title"' },
            { loc: [20, 21], note: 'Or even a "note"' },
            { loc: [ 0, 31], title: 'That\'s all folks!', note: (
              <span>Git repo here: <a href="https://github.com/thejameskyle/spectacle-code-slide">thejameskyle/spectacle-code-slide</a></span>
            ) },
          ]}/>
        </Deck>
      </Spectacle>
    );
  }
}

render(<Presentation/>, document.getElementById("root"));
