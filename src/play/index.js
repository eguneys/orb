import { lazy } from '../util';
import { dContainer } from '../asprite';

import Debug from './debug';
import Menu from './menu';

export default function Play(ctx) {

  let menu = new Menu(this, ctx);
  let debug = new Debug(this, ctx);

  this.init = data => {
    this.data = data;
    debug.init({});
    menu.init({});
  };
  
  this.update = delta => {
    debug.update(delta);
    menu.update(delta);
  };

  this.container = lazy(() => {
    let container = dContainer();
    container.addChild(debug.container());
    // container.addChild(menu.container());
    return container;
  });

  this.render = () => {
    debug.render();
    menu.render();    
  };

}
