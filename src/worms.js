import Destructible from './dquad/destructible';

import * as v from './vec2';;

import { makeRoundDown } from './util';

export default function Worms(x, y, w, h) {

  this.width = w;
  this.height = h;

  const roundToTile = makeRoundDown(1);

  const allPos = (() => {
    let res = [];
    for (let i = x; i < w; i++) {
      for (let j = y; j < h; j++) {
        res.push([i, j]);
      }
    }
    return res;
  })();

  const allKey = allPos.map(pos2key);

  const allPosKey = allPos.map(pos => [pos, pos2key(pos)]);

  const 
  collisionVisible = {
    visible: true
  },
  collisionHidden = {
    visible: false
  },
  entityEmpty = {
  },
  entityHero = (part) => ({
    hero: true,
    part
  });

  let tiles = this.tiles = {};
  
  let body = new Destructible(x, y, w, h, collisionVisible, 8);

  allPosKey.forEach(([pos, key]) => {
    tiles[key] = new Worm(pos);
  });

  this.hideRect = r => {
    body.modifyByRectangle(r, collisionHidden);
    syncBody();
  };

  this.getPos = pos => tiles[pos2key(pos)].data();

  this.visible = pos => {
    let { collision: { visible } } = this.getPos(pos);
    return visible;
  };

  const heroPos = this.heroPos = pos => {
    let tileSize = 1;
    let posHead = [roundToTile(pos[0]), roundToTile(pos[1])],
        posHeadLeft = v.cadd(posHead, [-1, 0]),
        posHeadRight = v.cadd(posHead, [1, 0]),
        posHeadRightUp = v.cadd(posHead, [1, -1]),
        posHeadLeftUp = v.cadd(posHead, [-1, -1]),
        posTorso = v.cadd(posHead, [0, tileSize]),
        posArms1 = v.cadd(posHead, [tileSize, tileSize]),
        posArms2 = v.cadd(posHead, [-tileSize, tileSize]),
        posLegs = v.cadd(posHead, [0, 2 * tileSize]),
        posFall = v.cadd(posHead, [0, 3 * tileSize]),
        posLegsLeft = v.cadd(posHead, [-1, 2 * tileSize]),
        posLegsRight = v.cadd(posHead, [1, 2 * tileSize]);

    return {
      head: posHead,
      left: posHeadLeft,
      right: posHeadRight,
      leftUp: posHeadLeftUp,
      rightUp: posHeadRightUp,
      torso: posTorso,
      armsRight: posArms1,
      armsLeft: posArms2,
      legs: posLegs,
      fall: posFall,
      legsLeft: posLegsLeft,
      legsRight: posLegsRight
    };
  };

  this.addHero = (pos) => {

    let { head, torso, armsLeft, armsRight, legs } = heroPos(pos);

    syncEntity(tiles[pos2key(head)], entityHero('head'));
    syncEntity(tiles[pos2key(torso)], entityHero('torso'));
    syncEntity(tiles[pos2key(armsLeft)], entityHero('armsLeft'));
    syncEntity(tiles[pos2key(armsRight)], entityHero('armsRight'));
    syncEntity(tiles[pos2key(legs)], entityHero('legs'));

  };

  this.removeHero = (pos) => {
    let { head, torso, armsLeft, armsRight, legs } = heroPos(pos);

    syncEntity(tiles[pos2key(head)], entityEmpty);
    syncEntity(tiles[pos2key(torso)], entityEmpty);
    syncEntity(tiles[pos2key(armsLeft)], entityEmpty);
    syncEntity(tiles[pos2key(armsRight)], entityEmpty);
    syncEntity(tiles[pos2key(legs)], entityEmpty);
  };

  this.moveHero = (pos, newPos) => {
    this.removeHero(pos);
    this.addHero(newPos);
  };

  const syncCollision = (worm, state) =>
        worm.sync('collision', state);

  const syncEntity = (worm, state) =>
        worm.sync('entity', state);

  const syncBody = () => {
    body.traverse((data, rect) => {
      for (let i = rect.x; i < rect.x1; i++) {
        for (let j = rect.y; j < rect.y1; j++) {
          let pos = [roundToTile(i), roundToTile(j)];
          let key = pos2key(pos);
          syncCollision(tiles[key], data);
        }
      }
    });
  };

  syncBody();
}

function Worm(pos) {

  let data = {};

  this.pos = pos;

  this.data = () => data;
  this.sync = (layer, _) => data[layer] = _;

}

const pos2key = pos => pos[0] + ';' + pos[1];
const key2pos = key => key.split(';').map(_ => parseInt(_));
