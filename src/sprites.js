export default function sprites(resources) {

  const ssTextures = name => resources[name].spritesheet.textures;

  return {
    'moonclouds': resources['moonclouds'].texture,
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
