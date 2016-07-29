var multiverse = {};
multiverse.eventlistener = function (evt , obj , listener) {
   if (typeof document.addEventListener === 'function') {
       obj.addEventListener(evt, listener, false);
    } else if (typeof document.attachEvent === 'function') {
      obj.attachEvent('on' + evt, listener);
    } else {
       obj['on' + evt] = listener;
    }

};
multiverse.cancelevent = function (e) {
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
  if (typeof e.cancelBubble !== 'undefined') {
    e.cancelBubble = true;
  }
  if (typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof e.returnValue !== 'undefined') {
    e.returnValue = false;
  }
};
