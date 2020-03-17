import { objMap } from '../../util2';
import { dContainer, sprite, graphics } from '../../asprite';

import Pool from 'poolf';

import Viewport from '../../viewport2';
import Worms from '../../worms';

import * as v from '../../vec2';

export default function EditArea(play, ctx, bs) {

  const { events, textures } = ctx;

  const tBgGray = textures['bggray'],
        tLightGray = textures['lightgray'],
        tDarkGray = textures['darkgray'];

  let viewContainer;

  let tileSize = 8;

  let worms;
  
  let turtles = new Pool(() => sprite(tDarkGray), {
    name: 'Turtles',
    warnLeak: 128 * 128
  });

  let viewport = new Viewport({
    vWidth: 1000,
    vHeight: 1000,
    getPosition: ({ worm }) => {
      return v.cscale(worm.pos, tileSize);
    },
    onOn: (item) => {
      let sp = turtles.acquire(_ => {
        _.height = tileSize;
        _.width = tileSize;
      });

      viewContainer.addChild(sp);

      item.dO = sp;
    },
    onOff: (item) => {

      turtles.release(item.dO);
      viewContainer.removeChild(item.dO);

      delete item.dO;
    },
    onView: ({ dO, worm }, visiblePos) => {
      let { entity, collision: { visible } } = worm.data();

      let pos = worm.pos;

      let iPos = (pos[0] + pos[1]) % 2;

      if (visible) {
        if (iPos === 0) {
          dO.texture = tLightGray;
        } else {
          dO.texture = tDarkGray;
        }
      } else {
        dO.visible = false;
      }

      dO.position.x = visiblePos[0];
      dO.position.y = visiblePos[1];
    }
  });

  let nbTilesX,
      nbTilesY;

  this.init = data => {
    nbTilesX = 128;
    nbTilesY = 128;

    worms = new Worms(0, 0, nbTilesX, nbTilesY);

    objMap(worms.tiles, (key, worm) => {
      viewport.addChild({ worm });
    });
  };

  const selectedTile = () => play.selectedTile();

  const handleMouse = () => {
    let { wheel, current } = events.data;

    let { editArea } = bs;

    if (current) {
      let { button, epos, dpos, tapping } = current;

      if (button === 0 &&
          tapping &&
          editArea.containsPoint(...epos)) {
        editTile(epos);
      }

      if (button === 1) {
        dragView(dpos[0], dpos[1]);
      }

      if (current.ending) {
        commitDrag();
      }
    }

    if (wheel && editArea.containsPoint(...wheel.epos)) {
      if (wheel.y > 0) {
        scaleUp();
      } else {
        scaleDown();
      }
    }
  };

  const viewEventPosition = pos => {
    let viewArea = viewContainer.getBounds();

    if (viewArea.contains(...pos)) {
      let x = pos[0] - viewArea.x,
          y = pos[1] - viewArea.y;

      let tS = viewArea.width / nbTilesX;

      console.log(x, viewArea.width, x / viewArea.width);

      return [Math.floor(x / tS),
              Math.floor(y / tS)];
      
    }
    return null;
  };

  const editTile = pos => {
    let epos = viewEventPosition(pos);

    if (epos) {
      console.log(epos);
    }
  };
  
  this.update = delta => {

    handleMouse();

    updateViewDrag();
    updateScale();
    viewport.update(delta);
  };


  let vViewPos = v.vec2(0),
      vViewDrag = v.vec2(0);

  const dragView = (x, y) => {
    v.copy([x, y], vViewDrag);
  };

  const commitDrag = () => {
    v.add(vViewPos, vViewDrag);
    v.scale(vViewDrag, 0);
  };

  const updateViewDrag = () => {
    let viewPos = v.copy(vViewPos);
    v.add(viewPos, vViewDrag);
    viewContainer.position.set(viewPos[0], viewPos[1]);
  };


  let vViewScale = 1,
      vViewScaleBuf = 0;

  const scaleUp = () => {
    vViewScaleBuf += 0.2;
  };

  const scaleDown = () => {
    vViewScaleBuf -= 0.2;
  };
 
  const commitScale = () => {
    vViewScale = vViewScaleBuf;
    vViewScaleBuf = 0;
  };

  const updateScale = () => {
    let vS = vViewScale;
    vS += vViewScaleBuf;
    viewContainer.scale.set(vS, vS);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    const {
      editX,
      editY,
      editWidth,
      editHeight
    } = bs;

    const bg = sprite(tBgGray);
    bg.width = editWidth;
    bg.height = editHeight;
    container.addChild(bg);
    
    let viewMask = graphics();
    viewMask.beginFill(0xff000000);
    viewMask.drawRect(editX, editY, editWidth, editHeight);

    viewContainer = dContainer();
    viewContainer.mask = viewMask;
    container.addChild(viewContainer);
  };
  initContainer();

  this.render = () => {
  };

}
