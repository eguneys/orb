import { pContainer, dContainer, sprite, tsprite, asprite } from '../asprite';

import Pool from 'poolf';

import Viewport from '../viewport2';
import Worms from '../worms';


export default function Tiles(play, ctx) {
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

  let turtles = new Pool(() => sprite(textures['hud']));
  let viewport = new Viewport({
    vWidth: bs.width,
    vHeight: bs.height,
    getPosition: item => item.position,
    onOn: (item) => {
      let sp = turtles.acquire(_ => {
        _.height = 8;
        _.width = 8;
      });

      container.addChild(sp);

      item.sprite = sp;
    },
    onOff: (item) => {

      turtles.release(item.sprite);
      container.removeChild(item.sprite);

      item.sprite = null;
    },
    onView: (item, visiblePos) => {
      let sp = item.sprite;

      sp.position.x = visiblePos[0];
      sp.position.y = visiblePos[1];
    }
  });
  let worms;

  let tiles;

  this.init = data => {
    let bs = boundsF();
    
    worms = new Worms(0, 0, bs.width, bs.height);

    tiles = [{
      position: [0, 0]
    },{
      position: [bs.width-8, bs.height-8]
    }];

    tiles.forEach(tile => {
      viewport.addChild(tile);
    });

    initContainer();
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    const bs = boundsF();

    container.removeChildren();
  };

  
  this.update = delta => {

    viewport.update(delta);

  };

  this.render = () => {
  };

}
