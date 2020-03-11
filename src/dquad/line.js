export default function Line(a, b) {
  this.A = a;
  this.B = b;
}

export function line(a, b) {
  return new Line(a, b);
}
