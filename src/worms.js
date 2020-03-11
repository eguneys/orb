import Destructible from './dquad/destructible';

const pos2key = pos => pos[0] + ';' + pos[1];
const key2pos = key => key.split(';').map(_ => parseInt(_));

export default function Worms(x, y, w, h, tileSize = 8) {

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
  stateVisible = {
    visible: true
  },
  stateHidden = {
    visible: false
  };

  let tiles = this.tiles = {};
  
  let body = new Destructible(x, y, w, h, stateVisible);

  allPosKey.forEach(([pos, key]) => {
    tiles[key] = new Worm(pos);
  });

  const syncBody = () => {
    body.traverse((data, rect) => {
      for (let i = rect.x; i < rect.width; i += tileSize) {
        for (let j = rect.y; j < rect.height; j += tileSize) {
          let pos = [i, j];
          let key = pos2key(pos);

          tiles[key].sync(data);
        }
      }
    });
  };

  syncBody();
}

function Worm(pos) {

  let data;

  this.pos = pos;

  this.data = () => data;
  this.sync = _ => data = _;

}
