const React = require('react');

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

class CodeSlideImage extends React.Component {
  render() {
    return <img src={this.props.src} style={style} />;
  }
}

module.exports = CodeSlideImage;
