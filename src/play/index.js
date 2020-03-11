import { dContainer } from '../asprite';

import Tiles from './tiles';
import Debug from './debug';
import Menu from './menu';

export default function Play(ctx) {

  let menu = new Menu(this, ctx);
  let debug = new Debug(this, ctx);
  let tiles = new Tiles(this, ctx);

  this.init = data => {
    this.data = data;
    debug.init({});
    menu.init({});
    tiles.init({});

    initContainer();
  };
  
  this.update = delta => {
    tiles.update(delta);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    container.addChild(tiles.container);
  };

  this.render = () => {
    tiles.render();
  };

}
