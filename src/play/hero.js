import * as v from '../vec2';
import Phy from '../phy';

import { makeRoundDown } from '../util';

export default function Hero(play, ctx, worms) {

  const { width, height, tileSize } = worms;

  let lastPos;


  this.init = data => {
    lastPos = [1, 1];
    worms.addHero(lastPos);

  };

  const roundDown = makeRoundDown(tileSize);
  const tiled = v.makeMap(_ => roundDown(_));

  const moveHero = newPos => {
    worms.moveHero(lastPos, newPos);
    v.copy(newPos, lastPos);
  };

  const pos = this.pos = () => worms.heroPos(lastPos);

  const maybeFall = delta => {
    let { fall, torso } = pos();

    let visible = worms.visible(fall);

    if (!visible) {
      moveHero(torso);
    }

  };

  this.move = dir => {
    let { armsLeft, armsRight, 
          legsLeft, legsRight,
          left, right,
          leftUp, rightUp } = pos();
    if (dir === 'left') {
      let visible = worms.visible(legsLeft);
      if (!visible) {
        moveHero(left);
      } else {
        visible = worms.visible(armsLeft);
        if (!visible) {
          moveHero(leftUp);
        }
      }
    } else {
      let visible = worms.visible(legsRight);
      if (!visible) {
        moveHero(right);
      } else {
        visible = worms.visible(armsRight);
        if (!visible) {
          moveHero(rightUp);
        }        
      }
    }
  };

  this.update = delta => {

    maybeFall(delta);
    
  };

  this.render = () => {
  };

}
