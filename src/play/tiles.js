import { objMap } from '../util2';
import { pContainer, dContainer, sprite, tsprite, asprite } from '../asprite';

import genWorms from '../gen';

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

  let turtles = new Pool(() => sprite(textures['hud']), {
    name: 'Turtles',
    warnLeak: 10000
  });
  let viewport = new Viewport({
    vWidth: bs.width,
    vHeight: bs.height,
    getPosition: ({ worm }) => worm.pos,
    onOn: (item) => {
      let sp = turtles.acquire(_ => {
        _.height = 8;
        _.width = 8;
      });

      container.addChild(sp);

      item.dO = sp;
    },
    onOff: (item) => {

      turtles.release(item.dO);
      container.removeChild(item.dO);

      delete item.dO;
    },
    onView: ({ dO, worm }, visiblePos) => {
      let { entity, collision: { visible } } = worm.data();

      if (visible) {
        dO.visible = true;
      } else {
        dO.visible = false;
      }

      if (entity) {
        let { part } = entity;

        dO.visible = true;
      }

      dO.position.x = visiblePos[0];
      dO.position.y = visiblePos[1];
    }
  });
  let worms;

  let tiles;

  this.init = data => {
    let bs = boundsF();
    
    worms = new Worms(0, 0, bs.width, bs.height);

    genWorms(worms);

    worms.addHero([10, 10]);

    objMap(worms.tiles, (key, worm) => {
      viewport.addChild({ worm });
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
