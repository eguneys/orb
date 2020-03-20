export function callUserFunction(f, ...args) {
  if (f) setTimeout(() => f(...args), 1);
}

export function noop() {};

export function makeRoundDown(multiple) {
  return numToRound => {
    if (multiple == 0)
      return numToRound;

    let remainder = numToRound % multiple;
    if (remainder == 0)
      return numToRound;

    return numToRound - remainder;
  };
}

export function throttle(fn, delay = 50) {
  let called = false;
  return (...args) => {
    if (!called) {
      called = true;
      fn(...args);
      setTimeout(() => called = false, delay);
    }
  };
};
