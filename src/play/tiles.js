import { objMap } from '../util2';
import { pContainer, dContainer, sprite, tsprite, asprite } from '../asprite';

import * as v from '../vec2';

import genWorms from '../gen';

import Pool from 'poolf';

import Viewport from '../viewport2';
import Worms from '../worms';

import Hero from './hero';

export default function Tiles(play, ctx) {
  const { canvas, textures, events, keyboard, config } = ctx;

  let boundsF = canvas.responsiveBounds(({ width, height }) => {
    return {
      width,
      height,
      tileSize: 8,
      smallTileSize: 4
    };
  });

  let bs = boundsF();

  let visibleHeroPos;

  let turtles = new Pool(() => sprite(textures['floor']), {
    name: 'Turtles',
    warnLeak: 20000
  });
  let viewport = new Viewport({
    vWidth: bs.width,
    vHeight: bs.height,
    getPosition: ({ worm }) => {
      return v.cscale(worm.pos, bs.tileSize);
    },
    onOn: (item) => {
      let sp = turtles.acquire(_ => {
        _.height = bs.tileSize;
        _.width = bs.tileSize;
      });

      container.addChild(sp);

      let { worm: { entity } } = item;

      if (entity && entity.hero) {
        sp.texture = textures['black'];
      }

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

      if (entity && entity.hero) {
        let { part } = entity;

        dO.visible = true;

        visibleHeroPos = visiblePos;
      } else {

      }

      dO.position.x = visiblePos[0];
      dO.position.y = visiblePos[1];
    }
  });

  let worms = new Worms(0, 0, bs.width / (bs.tileSize / 2), bs.height / bs.tileSize);

  let hero = new Hero(play, ctx);

  this.init = data => {
    let bs = boundsF();

    genWorms(worms);

    hero.init({ worms });

    objMap(worms.tiles, (key, worm) => {
      viewport.addChild({ worm });
    });
  };

  this.visibles = () => {
    return {
      hero: visibleHeroPos
    };
  };

  const initContainer = () => {
  };

  const container = this.container = dContainer();
  initContainer();
  
  const maybeMove = delta => {
    hero.move(keyboard.data);
  };

  const maybeCenterViewport = delta => {
    const { head } = hero.pos();
    
    viewport.follow(v.scale(head, bs.tileSize));

  };
  
  this.update = delta => {

    maybeMove(delta);
    maybeCenterViewport(delta);

    hero.update(delta);

    viewport.update(delta);
  };

  this.render = () => {
    hero.render();
  };

}
