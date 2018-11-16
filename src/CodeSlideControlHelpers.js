const React = require('react');

const blinkAnimation = 'code-slide-control-helpers-blink';
const shakeAnimation = 'code-slide-control-helpers-shake';

const getContainerTransform = (extraTransform = '') => `translate(-100%, -100%) ${extraTransform}`

const styles = {
  container: {
    position: 'fixed',
    bottom: '-15%',
    transform: getContainerTransform()
  },
  controlKey: {
    height: '50px',
    width: '50px',
    backgroundColor: 'white',
    color: 'black',
    margin: '15px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: 'solid 1px rgba(0, 0, 0, 0.4)',
    opacity: 0.3
  },
  controlKeyActive: {
    animation: `2.5s ease-in-out infinite alternate ${blinkAnimation} `
  },
  containerPristine: {
    animation: `2.5s ease-in-out infinite 1s alternate ${shakeAnimation}`
  }
};

class CodeSlideControlHelpers extends React.Component {
  render() {
    const { hasNextRange, pristine } = this.props;
    return (
      <div style={{position: 'relative'}}>
        <div style={{position: 'absolute', left: '99%'}}>
          <div 
              style={{
                ...styles.container, 
                ...pristine ? styles.containerPristine : {}
              }}
          >
            <style>{`
              @keyframes ${blinkAnimation} {
                0%, 35% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.5;
                }
                65%, 100% {
                  opacity: 1;
                }
              }
              @keyframes ${shakeAnimation} {
                0%, 40% {
                  transform: ${getContainerTransform()};
                }
                45% {
                  transform: ${getContainerTransform('translateX(3px)')};
                }
                50% {
                  transform: ${getContainerTransform('translateX(-5px)')};
                }
                55% {
                  transform: ${getContainerTransform('translateX(4px)')};
                }
                60%, 100% {
                  transform: ${getContainerTransform()};
                }
              }
            `}</style>
            <div style={styles.controls}>
              <div style={styles.controlKey}>
                ↑
              </div>
              <div
                style={{
                  ...styles.controlKey,
                  ...hasNextRange ? styles.controlKeyActive : {},
                }}
              >
                ↓
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = CodeSlideControlHelpers;
