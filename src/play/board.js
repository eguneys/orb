import { dContainer } from '../asprite';

import Tiles from './tiles';
import Cats from './cats';

export default function Board(play, ctx) {

  let tiles = new Tiles(this, ctx),
      cats = new Cats(this, ctx);

  this.init = data => {
    this.data = data;
    tiles.init({});
    cats.init({});
  };

  this.visibles = tiles.visibles;
  
  this.update = delta => {
    tiles.update(delta);
    cats.update(delta);
  };

  const container = this.container = dContainer();
  
  const initContainer = () => {
    container.addChild(cats.container);
    container.addChild(tiles.container);
  };

  initContainer();

  this.render = () => {
    tiles.render();
    cats.render();
  };

}
