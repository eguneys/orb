import { lazy } from '../util';
import { dContainer, sprite } from '../asprite';
import Viewport from '../viewport';
import { vec2 } from '../vec2';

export default function Debug(play, ctx) {
  const { textures, events, config } = ctx;

  let orbTexture = textures['orb.aseprite'];

  let viewport = new Viewport({
    vWidth: config.nbTilesX * 32,
    vHeight: config.nbTilesY * 32,
    onOn: (item) => {
      item.visible = true;
    },
    onOff: (item) => {
      item.visible = false;
    },
    onView: (item, pos) => {
      item.position.x = pos[0];
      item.position.y = pos[1];
    }
  });

  this.init = data => {
  };
  
  this.update = delta => {
    if (events.data.current) {
      let dpos = events.data.current.dpos;

      if (dpos) {
        viewport.drag(dpos, config.sensitivity);
      }
    }
    viewport.update(delta);
  };

  this.render = () => {
  };

  this.container = lazy(() => {
    let container = dContainer();
    for (let i = 0; i< 100; i++) {
      let orbSprite = sprite(orbTexture);
      container.addChild(orbSprite);
      viewport.addChild(orbSprite, vec2(i * 20,(32 / i)*20));
    }
    return container;
  });

}
