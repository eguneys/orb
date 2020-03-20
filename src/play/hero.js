import * as v from '../vec2';
import PrincePhysics from '../princephysics';

import { throttle, makeRoundDown } from '../util';

export default function Hero(play, ctx) {

  let lastPos;

  let phy = new PrincePhysics(detectCollision);

  let worms;

  this.init = data => {
    worms = data.worms;

    lastPos = [2, 2];
    worms.addHero(lastPos);
    phy.pos(lastPos[0], lastPos[1]);
  };

  const roundDown = makeRoundDown(1);
  const tiled = v.makeMap(_ => roundDown(_));

  const moveHero = newPos => {
    worms.moveHero(lastPos, newPos);
    v.copy(newPos, lastPos);
  };

  const pos = this.pos = () => worms.heroPos(lastPos);

  this.move = throttle(({ up, left, right, down }) => {

    phy.jump(up);
    phy.left(left);
    phy.right(right);

  }, 50);

  function detectCollision(pos) {
    let { legs } = worms.heroPos(pos);

    const { entity } = worms.getPos(legs);

    return !(entity && !entity.hero && entity.name);
  };

  this.update = delta => {

    let newPos = tiled(phy.cpos());
    moveHero(newPos);

    phy.update(delta);
  };

  this.render = () => {
  };

}
