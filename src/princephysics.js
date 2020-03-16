import * as v from './vec2';

const { vec2 } = v;

import { WalkDecision, JumpDecision, DashDecision } from './decisions';

export default function PrincePhysics(detectCollision) {

  let pos = vec2(0);

  let vFall = [0, 1],
      vJump = [0, -2],
      vClimb = [0, -1],
      vLeft = [-1, 0],
      vRight = [1, 0];

  let vSs = {
    vFall,
    vJump,
    vClimb,
    vLeft,
    vRight
  };

  this.detectCollision = detectCollision;

  this.left = (on) => {
    this.userLeft = on;
  };
  this.right = (on) => {
    this.userRight = on;
  };
  this.jump = (on) => {
    this.userJump = on;
  };

  this.canMove = newPos => {
    return detectCollision(newPos);
  };

  this.tryMove = newPos => {

    if (this.canMove(newPos)) {
      this.pos(newPos[0], newPos[1]);
      return true;
    } else {
      return false;
    }
  };

  let standDecision = new StandDecision(this, vSs);
  let rightDecision = new WalkDecision(this, 'right', vSs);
  let leftDecision = new WalkDecision(this, 'left', vSs);
  let jumpDecision = new JumpDecision(this, vSs);
  let dashRightDecision = new DashDecision(this, 'right', vSs);
  let dashLeftDecision = new DashDecision(this, 'left', vSs);

  let decision = this.decision = standDecision;

  const iAndU = (decision, immediate) => {
    decision.init();
    if (immediate) {
      decision.update();
    }
  };

  this.decisionJump = (immediate) => {
    decision = jumpDecision;
    iAndU(decision, immediate);
  };

  this.decisionRight = (immediate) => {
    decision = rightDecision;
    iAndU(decision, immediate);
  };

  this.decisionLeft = (immediate) => {
    decision = leftDecision;
    iAndU(decision, immediate);
  };

  this.decisionStand = (immediate) => {
    decision = standDecision;
    iAndU(decision, immediate);
  };

  this.decisionDashLeft = (immediate) => {
    decision = dashLeftDecision;
    iAndU(decision, immediate);
  };

  this.decisionDashRight = (immediate) => {
    decision = dashRightDecision;
    iAndU(decision, immediate);
  };
  
  this.pos = v.makeAttribute(pos);

  this.cpos = () => [pos[0], pos[1]];

  this.update = delta => {
    decision.update(delta);
  };

}

function StandDecision(physics, { vFall }) {

  this.init = () => {
    
  };


  this.update = delta => {
    fall();
  };


  const fall = () => {
    let fallPos = v.cadd(physics.pos(), vFall);

    if (physics.tryMove(fallPos)) {

    } else {
      userInput();
    }
  };

  const userInput = () => {
    if (physics.userLeft) {
      if (physics.userJump) {
        physics.decisionDashLeft();
      } else {
        physics.decisionLeft(true);
      }
    } else if (physics.userRight) {
      if (physics.userJump) {
        physics.decisionDashRight();
      } else {
        physics.decisionRight(true);
      }
    } else if (physics.userJump) {
      physics.decisionJump(true);
    };
  };
}
