import Destructible from './dquad/destructible';

import * as v from './vec2';;

import { makeRoundDown } from './util';

export default function Worms(x, y, w, h, tileSize = 8) {

  this.width = w;
  this.height = h;

  const roundToTile = makeRoundDown(tileSize);

  const allPos = (() => {
    let res = [];
    for (let i = x; i < w; i += tileSize) {
      for (let j = y; j < h; j += tileSize) {
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

  const heroPos = pos => {
    let posHead = [roundToTile(pos[0]), roundToTile(pos[1])],
        posTorso = v.add(v.copy(posHead), [0, tileSize]),
        posArms1 = v.add(v.copy(posHead), [tileSize, tileSize]),
        posArms2 = v.add(v.copy(posHead), [-tileSize, tileSize]),
        posLegs = v.add(v.copy(posHead), [0, 2 * tileSize]);

    return {
      head: posHead,
      torso: posTorso,
      arms1: posArms1,
      arms2: posArms2,
      legs: posLegs
    };
  };

  this.addHero = (pos) => {

    let { head, torso, arms1, arms2, legs } = heroPos(pos);

    syncEntity(tiles[pos2key(head)], entityHero('head'));
    syncEntity(tiles[pos2key(torso)], entityHero('torso'));
    syncEntity(tiles[pos2key(arms1)], entityHero('arms1'));
    syncEntity(tiles[pos2key(arms2)], entityHero('arms2'));
    syncEntity(tiles[pos2key(legs)], entityHero('legs'));

  };

  this.removeHero = (pos) => {
    let { head, torso, arms1, arms2, legs } = heroPos(pos);

    syncEntity(tiles[pos2key(head)], entityEmpty);
    syncEntity(tiles[pos2key(torso)], entityEmpty);
    syncEntity(tiles[pos2key(arms1)], entityEmpty);
    syncEntity(tiles[pos2key(arms2)], entityEmpty);
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
      for (let i = rect.x; i < rect.x1; i += tileSize) {
        for (let j = rect.y; j < rect.y1; j += tileSize) {
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
