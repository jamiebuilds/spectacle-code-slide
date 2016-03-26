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
            { loc: [ 0, 28], title: 'spectacle-code-slide' },
            { loc: [ 0,  1], note: 'Import the module' },
            { loc: [ 2,  7], note: 'Setup your presentation' },
            { loc: [ 8, 22], note: 'Time to create your first CodeSlide' },
            { loc: [ 9, 10], note: 'Props like "transition" get passed through to Slide' },
            { loc: [10, 11], note: 'Specify a "lang"' },
            { loc: [11, 12], note: 'Pass in your code as a string' },
            { loc: [12, 22], note: 'Now to specify some ranges. They are an array of objects' },
            { loc: [15, 16], note: 'Each one has a "loc" property with a start and an end.' },
            { loc: [13, 14], title: 'You can also add a "title"' },
            { loc: [16, 17], note: 'Or even a "note"' },
            { loc: [ 0, 28], title: 'That\'s all folks!' },
          ]}/>
        </Deck>
      </Spectacle>
    );
  }
}

render(<Presentation/>, document.getElementById("root"));
