import { pContainer, dContainer, sprite, tsprite, asprite, graphics } from '../asprite';

import Pool from 'poolf';

import { Light } from '../cats';

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

  let catsPool = new Pool(() => new Cat(this, ctx, tS), {
    name: 'Cats',
    warnLeak: 10000
  });

  let heroLight = new Light();

  this.init = data => {

    heroLight.init({ radius: 6 }); 

  };

  const initContainer = () => {
    const bs = boundsF();
  };

  const container = this.container = dContainer();
  initContainer();
  
  this.update = delta => {

    heroLight.update(delta);

    let { hero: heroVPos } = play.visibles();

    heroLight.move(heroVPos[0] / tS, heroVPos[1] / tS);

    catsPool.each(_ => container.removeChild(_.container));
    catsPool.releaseAll();

    heroLight.bigPoints.each(addCats);
    heroLight.smallPoints.each(addCats);
  };

  const addCats = ({ x, y, color }) => {
    let cat = catsPool.acquire(_ => _.init({ x, y, color }));
    container.addChild(cat.container);
  };


  this.render = () => {
  };

}

function Cat(play, ctx, tS) {

  const { textures } = ctx;

  let d;

  let x, y;
  let color;

  this.init = data => {
    x = data.x;
    y = data.y;
    color = data.color;

    d.position.set(x * tS, y * tS);

    if (color === 'small') {
      d.texture = textures['white'];
    } else {
      d.texture = textures['yellow'];
    }

  };
  
  this.update = delta => {
  };

  let container = this.container = dContainer();

  const initContainer = () => {
    d = sprite(textures['hud']);
    d.width = tS;
    d.height = tS;
    container.addChild(d);
  };

  initContainer();

  this.render = () => {
  };

}
