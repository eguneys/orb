import { pContainer, dContainer, sprite, tsprite, asprite } from '../asprite';
import Viewport from '../viewport';
import { vec2 } from '../vec2';

export default function Debug(play, ctx) {
  const { canvas, textures, events, config } = ctx;

  let boundsF = canvas.responsiveBounds(({ width, height }) => {
    const tiledMTileHeight = height * 0.5;

    return {
      width,
      height,
      tiledMTileHeight,
    };
  });

  canvas.addResizeListener(() => {
    populateContainer();
  });

  const makeBg = () => sprite(textures['moonclouds']);

  const makeTiledMountains = () => {
    let bs = boundsF();
    return tsprite(textures['mountainstiled'], canvas.width, bs.tiledMTileHeight);
  };

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
    
    populateContainer();

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
        this.container.addChild(orbSprite);
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

  const container = this.container = dContainer();

  const populateContainer = () => {
    const bs = boundsF();

    viewport.removeChildren();
    container.removeChildren();

    let bgSprite = makeBg();
    container.addChild(bgSprite);

    let tiledMountainsSprite = makeTiledMountains();
    container.addChild(tiledMountainsSprite);

    tiledMountainsSprite.tileScale.y = 2;
    tiledMountainsSprite.tileScale.x = 2;
    tiledMountainsSprite.anchor.y = 1;
    tiledMountainsSprite.position.y = bs.height;
    
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
  };

}
