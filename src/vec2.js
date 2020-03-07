export function vec2(a = 0, b = a) {
  return [a, b];
}

export function copy(v1) {
  return [v1[0], v1[1]];
}

export function makeAttribute(v) {
  return (a = v[0], b = v[1]) => {
    v[0] = a;
    v[1] = b;
    return v;
  };
}

export function add(v0, v1) {
  v0[0] += v1[0];
  v0[1] += v1[1];
  return v0;
}

export function sub(v0, v1) {
  v0[0] -= v1[0];
  v0[1] -= v1[1];
  return v0;
}

export function mul(v0, v1) {
  v0[0] *= v1[0];
  v0[1] *= v1[1];
  return v0;
}

export function div(v0, v1) {
  v0[0] /= v1[0];
  v0[1] /= v1[1];
  return v0;
}

export function scale(v0, s) {
  v0[0] *= s;
  v0[1] *= s;
  return v0;
}

export function setScale(v0, v1, s) {
  v0[0] = v1[0] * s;
  v0[1] = v1[1] * s;
}

export function addScale(v0, v1, s) {
  v0[0] += v1[0] * s;
  v0[1] += v1[1] * s;
  return v0;
}

export function csub(v0, v1) {
  return sub(copy(v0), v1);
}

export function cadd(v0, v1) {
  return add(copy(v0), v1);
}
