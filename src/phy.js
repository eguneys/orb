import * as v from './vec2';

const { vec2 } = v;

export default function Phy({
  pos = vec2(0),
  vel = vec2(0),
  acc = vec2(0),
  gravity = vec2(0, -10),
  friction = 0.9
}) {
  
  this.pos = v.makeAttribute(pos);
  this.vel = v.makeAttribute(vel);
  this.acc = v.makeAttribute(acc);
  this.gravity = v.makeAttribute(gravity);

  this.cpos = () => [pos[0], pos[1]];

  this.addVel = a => {
    v.add(vel, a);
  };

  this.addForce = force => {
    v.add(acc, force);
  };

  this.setVelX = x => {
    vel[0] = x;
  };
  this.setVelY = y => {
    vel[1] = y;
  };


  this.calculation = (delta) => {
    const dt = delta;

    let forces = vec2(0),
        newVelX = vel[0],
        newVelY = vel[1],
        newPosX = pos[0],
        newPosY = pos[1];

    newVelX *= friction;
    newVelY *= friction;

    v.add(forces, acc, gravity);

    // collisions

    newVelX += forces[0] * dt;
    newVelY += forces[1] * dt;

    newPosX += newVelX * dt;
    newPosY += newVelY * dt;

    return {
      velX: newVelX,
      posX: newPosX,
      velY: newVelY,
      posY: newPosY
    };
  };

  const applyCalculationX = ({ posX, velX }) => {
    this.vel(velX, vel[1]);
    this.pos(posX, pos[1]);
  };

  const applyCalculationY = ({ posY, velY }) => {
    this.vel(vel[0], velY);
    this.pos(pos[0], posY);    
  };

  this.update = (delta) => {
    let { velX, posX, velY, posY } = this.calculation(delta);

    applyCalculationX({ posX, velX });
    applyCalculationY({ posY, velY });
  };

  this.updateWithCollision = (delta, detectCollision) => {
    let { velX, posX, velY, posY } = this.calculation(delta);

    if (detectCollision([posX, pos[1]],
                         [velX, vel[1]])) {
      applyCalculationX({ posX, velX });
    }

    if (detectCollision([pos[0], posY],
                         [vel[0], velY])) {
      applyCalculationY({ posY, velY });
    }
  };

}
