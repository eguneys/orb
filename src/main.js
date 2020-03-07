import * as PIXI from 'pixi.js';
import sprites from './sprites';

import Config from './config';
import Events from './events';
import Play from './play';

export function app(element, options) {

  const config = Config();


  const app = new PIXI.Application({
    width: 32 * config.nbTilesX,
    height: 32 * config.nbTilesY
  });

  let play;
  
  PIXI.Loader.shared
    .add('orb', "data/orb/orb.json")
    .add('heart', "data/orb/hearth.json")
    .add('flame', "data/orb/flame.json")
    .add('smoke', "data/orb/smoke.json")
    .add('magic', "data/orb/magic.json")
    .add('hud', 'data/orb/Sprite-Hud-0001.json')
    .add('moonclouds', "data/orb/moonclouds.png")
    .load((loader, resources) => {
      const textures = sprites(resources);

      const events = new Events();

      events.bindTouch();

      const ctx = {
        config,
        textures, 
        events
      };

      const data = {};

      play = new Play(ctx);

      play.init(data);

      app.stage.addChild(play.container());

      app.ticker.add(delta => {
        events.update(delta);
        play.update(delta);
        play.render();
      });

    });

  
  element.appendChild(app.view);

}
