const React = require('react');

const style = {
  position: 'fixed',
  bottom: '20px',
  width: '100%',
  padding: '20px',
  background: 'black',
  color: 'white',
  fontFamily: 'monospace',
  textAlign: 'left'
};

class CodeSlideNote extends React.Component {
  render() {
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = CodeSlideNote;
