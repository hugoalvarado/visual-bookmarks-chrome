const Ripple = function () {

  let module = {};
  let handlerShow;
  let handlerHide;
  let span;
  let timer;

  function getRipple(target) {

    if (span) {
      clearTimeout(timer);
      target.removeChild(span);
    }

    const rippleEl = Object.assign(document.createElement('span'), {
      'className': 'ripple',
    });
    target.appendChild(rippleEl);
    return rippleEl;
  }
  function showRipple(sel, evt) {
    if (evt.which !== 1) return true;

    const target = evt.target.closest(sel);

    if (!target) return;

    // evt.preventDefault();

    target.classList.add('ripple-container');
    const el = span = getRipple(target);

    const { width, height, left, top } = target.getBoundingClientRect();
    let posX = 0,
      posY = 0;

    posX = evt.pageX - (left + window.pageXOffset);
    posY = evt.pageY - (top + window.pageYOffset);

    const dimmension = Math.max(width, height);
    const bgColor = target.getAttribute('data-ripple-color') || 'rgba(0,0,0, .3)';

    el.style.width = `${dimmension}px`;
    el.style.height = `${dimmension}px`;
    el.style.left = `${posX - dimmension / 2}px`;
    el.style.top = `${posY - dimmension / 2}px`;
    el.style.backgroundColor = bgColor;

    setTimeout(() => {
      el.style.cssText += `transform: scale(3); opacity: 0.5`;
    }, 10);
  }

  function hideRipple(sel, evt) {
    if (evt.type === 'mouseout' && !evt.target.closest(sel)) return true;
    if (evt.type === 'mouseup' && evt.which !== 1) return true;
    if (!span) return true;

    const el = span;
    span.style.opacity = 0;
    span = null;

    timer = setTimeout(() => {
      el.parentNode.removeChild(el);

      timer = null;
    }, 800);
  }

  module.init = function (selector) {
    handlerShow = showRipple.bind(null, selector);
    handlerHide = hideRipple.bind(null, selector);
    document.addEventListener('mousedown', handlerShow);
    document.addEventListener('mouseout', handlerHide);
    document.addEventListener('mouseup', handlerHide);
  };

  return module;
}();

export default Ripple;