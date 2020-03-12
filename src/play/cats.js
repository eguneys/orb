import { pContainer, dContainer, sprite, tsprite, asprite } from '../asprite';

import Pool from 'poolf';

import Cats from '../cats';

export default function CatsView(play, ctx) {

  const { canvas, textures, events, config } = ctx;

  let boundsF = canvas.responsiveBounds(({ width, height }) => {
    return {
      width,
      height
    };
  });

  canvas.addResizeListener(() => {
    initContainer();
  });

  let bs = boundsF();

  let tS = 4;

  let catsPool = new Pool(() => {
    let res = sprite(textures['hud']);
    res.width = tS;
    res.height = tS;
    return res;
  }, {
    name: 'Cats',
    warnLeak: 1000
  });

  let cats;

  this.init = data => {

    cats = new Cats();

    cats.cat(0, 0);

  };

  const container = this.container = dContainer();

  const initContainer = () => {
    const bs = boundsF();

    container.removeChildren();
  };
  
  this.update = delta => {

    catsPool.each(_ => container.removeChild(_));
    catsPool.releaseAll();

    cats.update(delta);

    cats.cats.forEach(cat => {

      let points = cat.points();

      points.forEach(([x, y]) => {
        catsPool.acquire(_ => {
          _.position.set(x * tS, y * tS);
          container.addChild(_);
        });
      });
      
    });

  };


  this.render = () => {
  };

}
