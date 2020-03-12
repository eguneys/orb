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
