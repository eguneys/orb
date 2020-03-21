import * as PIXI from 'pixi.js';

export default function sprites(resources) {

  const texture = name => resources[name].texture;
  const ssTextures = name => resources[name].spritesheet.textures;

  return {
    'white': bgTexture('white'),
    'black': bgTexture('black'),
    'yellow': bgTexture('yellow'),
    'bggray': bgTexture('#333333'),
    'lightgray': bgTexture('#eeeeee'),
    'darkgray': bgTexture('#aaaaaa'),
    'earth': frameTexture(texture('disciples'), [0, 0, 16, 16]),
    'water': frameTexture(texture('disciples'), [16, 16, 16, 16]),
    'waterBitmask': bitmaskTextures(texture('disciples'), [64, 32], 16)
  };
}

const bitmaskTextures = (t, origin, sz) => {
  let res = {};

  let x= origin[0],
      y = origin[1];

  res.ne = frameTexture(t, [x + sz * 0, y, sz, sz]);
  res.n  = frameTexture(t, [x + sz * 1, y, sz, sz]);
  res.nw = frameTexture(t, [x + sz * 2, y, sz, sz]);

  res.e = frameTexture(t, [x + sz * 0, y + sz * 1, sz, sz]);
  res.m = frameTexture(t, [x + sz * 1, y + sz * 1, sz, sz]);
  res.w = frameTexture(t, [x + sz * 2, y + sz * 1, sz, sz]);

  res.se = frameTexture(t, [x + sz * 0, y + sz * 2, sz, sz]);
  res.s  = frameTexture(t, [x + sz * 1, y + sz * 2, sz, sz]);
  res.sw = frameTexture(t, [x + sz * 2, y + sz * 2, sz, sz]);

  return res;
};

const frameTexture = (texture, frame) => {
  let rect = new PIXI.Rectangle(frame[0], frame[1], frame[2], frame[3]);
  let t = new PIXI.Texture(texture);
  t.frame = rect;
  return t;
};

const animationTextures = (textures, rName, frames) => {
  let res = [];
  for (let i = 0; i < frames; i++) {
    let name = rName.replace('%', i);
    res.push(textures[name]);
  }
  return res;
};



const bgTexture = (color) => {
  return withCanvasTexture(256, 256, (w, h, canvas, ctx) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    return canvas;
  });
};

function withCanvasTexture(width, height, f) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  f(width, height, canvas, canvas.getContext('2d'));
  const texture = PIXI.Texture.from(canvas);
  return texture;
}
