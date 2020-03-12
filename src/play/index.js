import { dContainer } from '../asprite';

import Tiles from './tiles';
import Cats from './cats';

export default function Play(ctx) {

  let tiles = new Tiles(this, ctx),
      cats = new Cats(this, ctx);

  this.init = data => {
    this.data = data;
    tiles.init({});
    cats.init({});

    initContainer();
  };
  
  this.update = delta => {
    tiles.update(delta);
    cats.update(delta);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    container.addChild(cats.container);
    container.addChild(tiles.container);
  };

  this.render = () => {
    tiles.render();
    cats.render();
  };

}
