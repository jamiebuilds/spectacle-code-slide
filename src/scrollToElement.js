/**
 * Adapted from scroll-to@0.0.2 (MIT Licensed) https://github.com/component/scroll-to
 */

const Tween = require('component-tween');
const raf = require('component-raf');

function scroll(element) {
  var y = element.scrollTop;
  var x = element.scrollLeft;
  return { top: y, left: x };
}

function scrollToElement(element, x, y, options) {
  options = options || {};

  var start = scroll(element);

  var tween = Tween(start)
    .ease(options.ease || 'out-circ')
    .to({ top: y, left: x })
    .duration(options.duration || 1000);

  tween.update(function(o){
    element.scrollTop = o.top | 0;
    element.scrollLeft = o.left | 0;
  });

  tween.on('end', function(){
    animate = function(){};
  });

  function animate() {
    raf(animate);
    tween.update();
  }

  animate();

  return tween;
}

module.exports = scrollToElement;
