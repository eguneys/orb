import { lazy } from '../util';
import { pContainer, dContainer, sprite, tsprite, asprite } from '../asprite';
import Viewport from '../viewport';
import { vec2 } from '../vec2';

export default function Debug(play, ctx) {
  const { canvas, textures, events, config } = ctx;

  const makeBg = () => sprite(textures['moonclouds']);

  const makeTiledMountains = () => tsprite(textures['mountainstiled'], canvas.width, 200);

  const makeOrb = () => sprite(textures[Math.random() < 0.5?'heart':'orb']);
  const makeFlame = () => asprite(textures[Math.random()<0.8?'smoke':'magic'], 500);

  let flames = [];

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
        viewport.drag(dpos);
      }

      if (events.data.current.ending) {
        viewport.commitDrag();
      }

      if (events.data.current.tapping) {
        let vpos = events.data.current.epos;

        let wPos = viewport.viewToWorld(vpos);

        let orbSprite = makeOrb();

        addToViewport(orbSprite, wPos);
        this.container().addChild(orbSprite);
      }
    }
    viewport.update(delta);

    flames.forEach(_ => _.update(delta));
  };

  this.render = () => {
  };

  const addToViewport = (item, pos) => {
    viewport.addChild(item, pos);
  };

  this.container = lazy(() => {
    let container = dContainer();

    let bgSprite = makeBg();
    container.addChild(bgSprite);

    let tiledMountainsSprite = makeTiledMountains();
    container.addChild(tiledMountainsSprite);

    tiledMountainsSprite.scale.x = 2;
    tiledMountainsSprite.scale.y = 2;

    tiledMountainsSprite.position.y = 100;
    

    for (let i = 0; i< 100; i++) {
      let orbSprite = makeOrb();
      addToViewport(orbSprite, vec2(i * 32,(32 / i)*32));
      container.addChild(orbSprite);

      let flameSprite = makeFlame();
      addToViewport(flameSprite, vec2(i * 32, Math.sin(i) * 32));
      container.addChild(flameSprite);
      if (Math.random() < 0.5) {
        flameSprite.scale.x = -1;
      }
      flames.push(flameSprite);

    }

    return container;
  });

}
