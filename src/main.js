import * as PIXI from 'pixi.js';
import sprites from './sprites';
import levels from './levels';

import Config from './config';
import Canvas from './canvas';
import Events from './events';
import Keyboard from './keyboard';
import Play from './play';

import Stats from 'stats.js';

export function app(element, options = {}) {

  const config = Config(options);
  const canvas = new Canvas(element);

  let play;
  
  PIXI.Loader.shared
    .add('test', 'data/test.json')
    .add('orb', "data/orb/orb.json")
    .add('hud', 'data/orb/Sprite-Hud-0001.json')
    .add('disciples', 'assets/images/disciples.png')
    .load((loader, resources) => {

      const levelData = levels(resources);

      const textures = sprites(resources);

      const keyboard = new Keyboard();

      const events = new Events(canvas);

      events.bindTouch();
      keyboard.bind();

      canvas.bindResize();

      const ctx = {
        canvas,
        config,
        textures,
        levels: levelData,
        events,
        keyboard
      };

      const data = {};

      play = new Play(ctx);

      play.init(data);

      let stats = new Stats();
      // document.body.appendChild(stats.dom);

      canvas.withApp(app => {

        app.stage.addChild(play.container);

        app.ticker.add(delta => {
          stats.begin();
          events.update(delta);
          play.update(delta);
          play.render();
          stats.end();
        });
      });

    });
}
