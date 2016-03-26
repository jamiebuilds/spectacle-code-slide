const React = require('react');

const styles = {
  position: 'relative',
  textAlign: 'left',
  overflow: 'auto',
  color: 'white',
  height: '646px',
  margin: 0,
  padding: '40% 0'
};

class CodeSlideTitle extends React.Component {
  render() {
    return (
      <pre style={styles}>
        <code>{this.props.children}</code>
      </pre>
    );
  }
}

module.exports = CodeSlideTitle;
