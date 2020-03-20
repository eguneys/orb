import { dContainer, sprite } from '../asprite';

import Pool from 'poolf';

import Viewport from '../viewport2';

import * as v from '../vec2';

const textureKeyByRole = {
  'GROUND': 'earth',
  'WATER': 'water'
};

export default function Disciples(play, ctx, bs) {

  const { events, textures } = ctx;

  let disciples;

  let dTiles;

  let tileSize = 16;

  let dGround;

  let tiles0 = new Pool(() => sprite(), {
    name: 'Disciples Tiles 0',
    warnLeak: 10000
  });
  let viewport0 = new Viewport({
    vWidth: bs.width + tileSize,
    vHeight: bs.height + tileSize,
    getPosition: ({ pos }) => {
      return v.cscale(pos, tileSize);
    },
    onOn: (item) => {
      let sp = tiles0.acquire(_ => {
        _.height = tileSize;
        _.width = tileSize;
      });
      dGround.addChild(sp);
      let { tile: { role } } = item;

      sp.texture = textures[textureKeyByRole[role]];

      item.dO = sp;
    },
    onOff: (item) => {
      tiles0.release(item.dO);
      dGround.removeChild(item.dO);

      delete item.dO;
    },
    onView: ({ dO, tile }, visiblePos) => {
      dO.position.x = visiblePos[0];
      dO.position.y = visiblePos[1];
    }
  });


  this.init = data => {
    disciples = data.disciples;

    dTiles = {};

    disciples.each((pos, tile) => {
      viewport0.addChild({
        pos,
        tile
      });
    });
  };

  const handleMouse = () => {
    let { width, height } = bs;

    const { epos } = events.data;

    if (!epos) {
      return;
    }

    let v = vEdge(epos);

    viewport0.drag(v, -8);
    viewport0.commitDrag([-tileSize * 10, width - tileSize * 5, -tileSize * 10, height + tileSize * 10]);
  };

  const vEdge = pos => {
    let { width, height } = bs;

    let edgeLimit = height * 0.16;

    let edgeX = 0,
        edgeY = 0;

    if (pos[0] < edgeLimit && pos[0] > 0) {
      edgeX = -1;
    } else if (pos[0] > width - edgeLimit && pos[0] < width) {
      edgeX = 1;
    }
    if (pos[1] < edgeLimit && pos[1] > 0) {
      edgeY = -1;
    } else if (pos[1] > height - edgeLimit && pos[1] < height) {
      edgeY = 1;
    }

    return [edgeX, edgeY];    
  };
  
  this.update = delta => {

    handleMouse();

    viewport0.update(delta);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    dGround = dContainer();
    dGround.position.set(-tileSize, -tileSize);
    container.addChild(dGround);
  };
  initContainer();

  this.render = () => {
  };

}
