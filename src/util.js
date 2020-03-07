export function noop() {};

export function lazy(fn) {
  let value;

  return () => {
    if (!value) {
      value = fn();
    }
    return value;
  };
};
