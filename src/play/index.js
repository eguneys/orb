import { lazy } from '../util';
import { dContainer } from '../asprite';

import Debug from './debug';

export default function Play(ctx) {

  let debug = new Debug(this, ctx);

  this.init = data => {
    this.data = data;
    debug.init({});
  };
  
  this.update = delta => {
    debug.update(delta);
  };

  this.container = lazy(() => {
    let container = dContainer();
    container.addChild(debug.container());
    return container;
  });

  this.render = () => {

    debug.render();
    
  };

}
