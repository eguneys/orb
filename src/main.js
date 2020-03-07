import * as PIXI from 'pixi.js';
import sprites from './sprites';

import Play from './play';

export function app(element, options) {

  const nbTilesX = 22,
        nbTilesY = 14;


  const app = new PIXI.Application({
    width: 32 * nbTilesX,
    height: 32 * nbTilesY
  });

  let play;
  
  PIXI.Loader.shared
    .add('sheet', "data/orb/orb.json")
    .load((loader, resources) => {
      const textures = sprites(resources);

      const data = {};

      play = new Play(textures);

      play.init(data);

      app.stage.addChild(play.container());

      app.ticker.add(delta => {
        play.update(delta);
        play.render();
      });

    });

  
  element.appendChild(app.view);

}
