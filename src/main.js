import * as PIXI from 'pixi.js';
import sprites from './sprites';

import Config from './config';
import Canvas from './canvas';
import Events from './events';
import Keyboard from './keyboard';
import Play from './play';

import Stats from 'stats.js';

export function app(element, options) {

  const config = Config();
  const canvas = new Canvas(element);

  let play;
  
  PIXI.Loader.shared
    .add('orb', "data/orb/orb.json")
    .add('heart', "data/orb/hearth.json")
    .add('flame', "data/orb/flame.json")
    .add('smoke', "data/orb/smoke.json")
    .add('magic', "data/orb/magic.json")
    .add('hud', 'data/orb/Sprite-Hud-0001.json')
    .add('moonclouds', "data/orb/moonclouds.png")
    .add('mountainstiled', "data/orb/mountainstiled.png")
    .load((loader, resources) => {

      const textures = sprites(resources);

      const keyboard = new Keyboard();

      const events = new Events();

      events.bindTouch();
      keyboard.bind();

      canvas.bindResize();

      const ctx = {
        canvas,
        config,
        textures,
        events,
        keyboard
      };

      const data = {};

      play = new Play(ctx);

      play.init(data);

      let stats = new Stats();
      document.body.appendChild(stats.dom);

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
