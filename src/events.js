import * as v from './vec2';

const { vec2 } = v;

export default function Events() {

  let state = this.data = {
    touches: {}
  };

  this.update = delta => {
    let { current } = state;

    if (current) {
      if (current.moving) {
        current.moving = false;
      } else {
        delete current.dpos;
      }
      if (current.ending) {
        if (current.ending.handled) {
          delete state.current;
        } else {
          current.ending.handled = true;
        }
      }
    }

  };  

  this.bindTouch = () => bindTouch(this.data);
  
}

export function bindTouch(state) {
  const unbinds = [];

  const onTouchStart = startTouch(state);
  const onTouchEnd = endTouch(state);
  const onTouchMove = moveTouch(state);

  ['mousedown', 'touchstart'].forEach(_ => 
    unbinds.push(unbindable(document, _, onTouchStart)));

  ['mousemove', 'touchmove'].forEach(_ => 
    unbinds.push(unbindable(document, _, onTouchMove)));

  ['mouseup', 'touchend'].forEach(_ =>
    unbinds.push(unbindable(document, _, onTouchEnd)));

  return () => { unbinds.forEach(_ => _()); };
};

function unbindable(el, eventName, callback) {
  el.addEventListener(eventName, callback);
  return () => el.removeEventListener(eventName, callback);
}

export const eventPosition = e => {
  if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY];
  if (e.touches && e.targetTouches[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  return undefined;
};

function startTouch(state) {
  return function(e) {
    const tPos = eventPosition(e);
    state.current = {
      tapping: {},
      start: tPos,
      epos: tPos,
      dpos: vec2(0)
    };
  };
}

function moveTouch(state) {
  return function(e) {
    if (state.current) {
      const tPos = eventPosition(e);
      state.current.moving = true;
      state.current.dpos = v.sub(v.copy(state.current.epos), tPos);
      state.current.epos = tPos;
    }
  };
}

function endTouch(state) {
  return function(e) {
    state.current.ending = {};
  };
}
