import { line } from './dquad/line';

import * as v from './vec2';

const { vec2 } = v;

export default function Graphics() {
  let points = [];

  this.clear = () => points = [];

  this.points = () => points;

  this.line = line => {
    let a = line.A,
        b = line.B,
        direction = v.csub(b, a),
        steps = v.length(direction),
        step = v.cscale(direction, 1/steps);

    let cur = v.copy(a);

    for (let i = 0; i < steps; i++) {
      let point = v.copy(cur);
      point[0] = Math.round(point[0]);
      point[1] = Math.round(point[1]);
      points.push(point);
      v.add(cur, step);
    }
  };

  this.bezier = (cp, cp2, line) => {
    let from = line.A,
        to = line.B;

    let fromX = from[0],
        fromY = from[1],
        toX = to[0],
        toY = to[1],
        cpX = cp[0],
        cpY = cp[1],
        cpX2 = cp2[0],
        cpY2 = cp2[1];

    let n = v.length(v.csub(to, from));

    let dt = 0,
        dt2 = 0,
        dt3 = 0,
        t2 = 0,
        t3 = 0;

    points.push(v.copy(from));

    for (let i = 1, j = 0; i <= n; i++) {
      j = i / n;
      
      dt = (1 - j);
      dt2 = dt * dt;
      dt3 = dt2 * dt;

      t2 = j * j;
      t3 = t2 * j;

      let c0 = (dt3 * fromX) + 
          (3 * dt2 * j * cpX) + 
          (3 * dt * t2 * cpX2) +
          (t3 * toX);
      let c1 = (dt3 * fromY) +
          (3 * dt2 * j * cpY) +
          (3 * dt * t2 * cpY2) +
          (t3 * toY);

      points.push([Math.round(c0), Math.round(c1)]);
    };

  };
}
