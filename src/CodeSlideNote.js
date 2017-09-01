const React = require('react');

const style = {
  position: 'absolute',
  bottom: '20px',
  width: '75%',
  padding: '20px',
  margin: '20px 12.5%',
  background: 'black',
  color: 'white',
  fontFamily: 'monospace',
  textAlign: 'left',
};

class CodeSlideNote extends React.Component {
  render() {
    return <div style={style}>{this.props.children}</div>;
  }
}

module.exports = CodeSlideNote;
