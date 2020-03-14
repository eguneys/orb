import * as v from '../vec2';
import Phy from '../phy';

import { makeRoundDown } from '../util';

export default function Hero(play, ctx, worms) {

  const { width, height, tileSize } = worms;

  let lastPos = [tileSize, tileSize];

  this.init = data => {

    worms.addHero(lastPos);

  };

  const roundDown = makeRoundDown(tileSize);
  const tiled = v.makeMap(_ => roundDown(_));

  const moveHero = newPos => {
    worms.moveHero(lastPos, newPos);
    v.copy(newPos, lastPos);
  };

  const maybeFall = delta => {
    
  };

  this.update = delta => {

    maybeFall(delta);
    
  };

  this.render = () => {
  };

}
