import * as v from './vec2';

const { vec2 } = v;

export default function phy(opts) {

  opts = {
    pos: vec2(0),
    vel: vec2(0),
    acc: vec2(0),
    gravity: vec2(0, -10),
    ...opts
  };

  let { pos, vel, acc, gravity } = opts;
  
  this.pos = v.makeAttribute(pos);
  this.vel = v.makeAttribute(vel);
  this.acc = v.makeAttribute(vel);
  this.gravity = v.makeAttribute(gravity);


  this.calculation = (delta, collisions = {}) => {
    const dt = delta;

    let forces = vec2(0),
        newVel = vec2(0),
        newPos = vec2(0);

    v.add(forces, acc, gravity);

    v.add(newVel, vel);
    v.addScale(newVel, forces, dt);

    // collisions

    v.add(newPos, pos);
    v.addScale(newPos, newVel, dt);

    return {
      vel: newVel,
      pos: newPos
    };

  };

}
