import * as v from './vec2';

const { vec2 } = v;

export default function Events(canvas) {

  let state = this.data = {
    touches: {}
  };

  this.update = delta => {
    let { current, wheel } = state;

    if (wheel) {
      if (wheel.handled) {
        delete state.wheel;
      } else {
        wheel.handled = true;
      }
    }

    if (current) {
      current.dpos = v.csub(current.epos, current.start);
      if (current.tapping) {
        if (current.tapping.handled) {
          delete current.tapping;
        } else {
          current.tapping.handled = true;
        }
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
 
  function bindTouch(state) {
    const unbinds = [];

    const onTouchStart = startTouch(state);
    const onTouchEnd = endTouch(state);
    const onTouchMove = moveTouch(state);

    const onWheel = moveWheel(state);

    ['mousedown', 'touchstart'].forEach(_ => 
      unbinds.push(unbindable(document, _, onTouchStart)));

    ['mousemove', 'touchmove'].forEach(_ => 
      unbinds.push(unbindable(document, _, onTouchMove)));

    ['mouseup', 'touchend'].forEach(_ =>
      unbinds.push(unbindable(document, _, onTouchEnd)));

    unbinds.push(unbindable(document, 'wheel', onWheel));

    return () => { unbinds.forEach(_ => _()); };
  };

  function unbindable(el, eventName, callback) {
    el.addEventListener(eventName, callback);
    return () => el.removeEventListener(eventName, callback);
  }

  const moveWheel = (state) => {
    return (e) => {
      state.wheel = { y: Math.sign(e.deltaY) };
    };
  };

  const eventPositionDocument = e => {
    if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY];
    if (e.touches && e.targetTouches[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
    return undefined;
  };

  const eventPosition = e => {
    let edoc = eventPositionDocument(e);
    let { bounds } = canvas;

    return [edoc[0] - bounds.x,
            edoc[1] - bounds.y];
  };

  function startTouch(state) {
    return function(e) {
      const tPos = eventPosition(e);
      state.current = {
        button: e.button,
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
        state.current.epos = tPos;
      }
    };
  }

  function endTouch(state) {
    return function(e) {
      state.current.ending = {};
    };
  }

 
}
