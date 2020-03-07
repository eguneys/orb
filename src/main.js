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
    .add('sheet', "data/orb/orb.json")
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
