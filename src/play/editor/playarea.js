import { objMap } from '../../util2';
import { dContainer, sprite } from '../../asprite';

import * as v from '../../vec2';

import Pool from 'poolf';

import Viewport from '../../viewport2';
import Hero from '../hero';

export default function PlayArea(play, ctx, bs) {

  const { textures, keyboard } = ctx;

  let worms;

  let tileSize = 8;

  let turtles = new Pool(() => sprite(textures['floor']), {
    name: 'Turtles',
    warnLeak: 20000
  });
  let viewport = new Viewport({
    vWidth: bs.editWidth,
    vHeight: bs.editHeight,
    getPosition: ({ worm }) => {
      return v.cscale(worm.pos, tileSize);
    },
    onOn: (item) => {
      let sp = turtles.acquire(_ => {
        _.height = tileSize;
        _.width = tileSize;
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

      if (entity && entity.name) {
        let { part } = entity;

        dO.visible = true;
      } else {
        dO.visible = false;
      }

      dO.position.x = visiblePos[0];
      dO.position.y = visiblePos[1];
    }
  });

  let hero = new Hero(play, ctx, worms);

  this.init = data => {
    worms = data.worms;

    hero.init({ worms });

    turtles.releaseAll();
    viewport.removeChildren();

    objMap(worms.tiles, (key, worm) => {
      viewport.addChild({ worm });
    });
  };

  const maybeMove = delta => {
    hero.move(keyboard.data);
  };
  
  this.update = delta => {
    maybeMove(delta);

    hero.update(delta);

    viewport.update(delta);    
  };

  const container = this.container = dContainer();

  const initContainer = () => {
  };
  initContainer();

  this.render = () => {
  };

}
