import * as PIXI from 'pixi.js';

export default function sprites(resources) {

  const ssTextures = name => resources[name].spritesheet.textures;

  return {
    'white': bgTexture('white'),
    'black': bgTexture('black'),
    'yellow': bgTexture('yellow'),
    'moonclouds': resources['moonclouds'].texture,
    'mountainstiled': resources['mountainstiled'].texture,
    'orb': ssTextures('orb')['orb.aseprite'],
    'heart': ssTextures('heart')['hearth.aseprite'],
    'hud': ssTextures('hud')['Sprite-0001.'],
    'smoke': animationTextures(ssTextures('smoke'),
                               'smoke %.aseprite', 12),
    'magic': animationTextures(ssTextures('magic'),
                               'magic %.aseprite', 6),    
    'flame': animationTextures(ssTextures('flame'),
                               'flame %.aseprite', 6)
  };
}

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
