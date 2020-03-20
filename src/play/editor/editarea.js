import { objMap } from '../../util2';
import { dContainer, sprite, graphics } from '../../asprite';

import Pool from 'poolf';

import Viewport from '../../viewport2';
import Worms from '../../worms';

import * as v from '../../vec2';

export default function EditArea(play, ctx, bs) {

  const { events, textures, levels } = ctx;

  const tBgGray = textures['bggray'],
        tLightGray = textures['lightgray'],
        tDarkGray = textures['darkgray'];

  let viewContainer;

  let tileSize = 8;

  let worms;
  
  let dWorms;

  let nbTilesX,
      nbTilesY;

  this.init = data => {
    nbTilesX = 64;
    nbTilesY = 64;

    worms = new Worms(0, 0, nbTilesX, nbTilesY);

    addDWorms();
  };

  this.load = () => {
    const { test } = levels;

    objMap(test, (key, { entity }) => {
      if (entity) {
        worms.rawEntity(key, entity);
      }
    });
  };

  this.worms = () => worms;

  this.saveData = () => {
    let res = {};
    objMap(worms.tiles, (key, worm) => {
      res[key] = worm.data();
    });
    return JSON.stringify(res);
  };

  const addDWorms = () => {
    dWorms = {};


    objMap(worms.tiles, (key, worm) => {

      let dO = sprite(tLightGray);
      dO.width = tileSize;
      dO.height = tileSize;
      dO.position.set(worm.pos[0] * tileSize, worm.pos[1] * tileSize);

      dWorms[key] = dO;
      viewContainer.addChild(dO);
    });
  };

  const selectedTile = () => play.selectedTile();

  const handleMouse = () => {
    let { wheel, current } = events.data;

    let { editArea } = bs;

    if (current) {
      let { button, epos, dpos, tapping } = current;

      if (button === 0 &&
          // tapping &&
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

      let tW = viewArea.width / nbTilesX,
          tH = viewArea.height / nbTilesY;

      return [Math.floor(x / tW),
              Math.floor(y / tH)];
      
    }
    return null;
  };

  const editTile = pos => {
    let epos = viewEventPosition(pos);

    if (epos) {
      console.log(pos, epos);
      let { name: selectedTile } = play.selectedTile();

      if (selectedTile === 'empty') {
        worms.removeEntity(epos);
      } else {
        worms.entity(epos, selectedTile);
      }
    }
  };
  
  this.update = delta => {

    handleMouse();

    updateViewDrag();
    updateScale();

    updateView();
  };


  const updateView = () => {

    objMap(worms.tiles, (key, worm) => {
      
      let dO = dWorms[key];

      let { entity } = worm.data();

      let pos = worm.pos;

      let iPos = (pos[0] + pos[1]) % 2;

      if (entity) {
        dO.texture = textures[entity.name];
      } else {
        if (iPos === 0) {
          dO.texture = tLightGray;
        } else {
          dO.texture = tDarkGray;
        }
      }
    });
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
