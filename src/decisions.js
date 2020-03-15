import * as v from './vec2';

const moveDirection = (physics, vMove) => {
  let movePos = v.cadd(physics.pos(), vMove);
  return physics.tryMove(movePos);
};

export function WalkDecision(physics, sDirection, { vLeft, vRight }) {

  let frame;

  let vWalk = sDirection==='left'?vLeft:vRight;

  this.init = () => {
    frame = 0;
  };

  this.update = delta => {
    if (frame === 0) {
      walk0();
    } else {
      endWalk();
    }
  };

  const walk0 = () => {
    if (moveDirection(physics, vWalk)) {
    } else {
      stand();
    }
    frame = 1;
  };

  const endWalk = () => {
    stand();
  };

  const dash = () => {
    if (sDirection === 'left') {
      physics.decisionDashLeft();
    } else {
      physics.decisionDashRight();
    }
    stand();
  };

  const stand = () => {
    physics.decisionStand();
  };
}

export function JumpDecision(physics, { vJump }) {
  let frame;
  
  this.init = () => {
    frame = 0;
  };

  this.update = delta => {
    switch (frame) {
    case 0:
      jump0();
      break;
    case 1:
      jump0();
    default:
      stand();
    };
    frame++;
  };

  const jump0 = () => {
    if (moveDirection(physics, vJump)) {
      
    } else {
      stand();
    }
  };

  const jump1 = () => {
    
  };

  const stand = () => {
    physics.decisionStand();
  };

}

export function DashDecision(physics, sDirection, 
                             { vJump,
                               vLeft,
                               vRight,
                               vFall }) {

  let vDash = sDirection==='left'?vLeft:vRight;

  let frame;

  this.init = () => {
    frame = 0;
  };

  this.update = delta => {
    if (frame === 0) {
      dash0();
    } else if (frame === 1 || frame === 2) {
      dash1();
    } else if (frame === 3 || frame === 4) {
      dash2();
    } else if (frame === 5) {
      dash3();
    } else if (frame === 6) {
      dashFall();
    } else {
      endDash();
    }
  };

  const dash0 = () => {
    frame++;
  };

  const dash1 = () => {
    if (moveDirection(physics, vJump)) {
      if (moveDirection(physics, vDash)) {

      }else {
        endDash();
      }
    } else {
      stand();
    }
    frame++;
  };

  const dash2 = () => {
    if (moveDirection(physics, vJump)) {
      if (moveDirection(physics, vDash)) {
        
      } else {
        endDash();
      }
    } else {
      endDash();
    }
    frame++;
  };

  const dash3 = () => {
    if (moveDirection(physics, vDash)) {
    } else {
      endDash();
    }    
    frame++;
  };

  const dashFall = () => {
    if (moveDirection(physics, vFall)) {
      if (moveDirection(physics, vDash)) {
        
      } else {
        endDash();
      }
    } else {
      endDash();
    }
    frame++;
  };

  const endDash = () => {
    stand();
    frame++;
  };

  const stand = () => {
    physics.decisionStand();
  };
}
