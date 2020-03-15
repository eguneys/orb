
export default function interpolator(a, b = a) {
  let v = 0;

  const value = () => a + (b - a) * v;

  const settle = () => v = 1;
  const reset = () => v = 0;
  const resetIfDifferent = () => {
    if (a !== b) {
      reset();
    } else {
      settle();
    }
  };

  return {
    update(dt) {
      v += dt;
      if (v > 1) {
        v = 1;
      }
    },
    settled(threshold = 1) {
      return v >= threshold;
    },
    progress(max = 1) {
      return v;
    },
    both(x, y = x) {
      a = x;
      b = y;
      resetIfDifferent();
    },
    target(x) {
      if (x) {
        b = x;
        resetIfDifferent();
      }
      return b;
    },
    value(x) {
      if (x) {
        a = x;
        resetIfDifferent();
      }
      return value();
    }
  };
}

export function interpolate(a, b, dt = 0.2) {
  return a + (b - a) * dt;
}
