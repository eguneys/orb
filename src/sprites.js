export default function sprites(resources) {

  let orb = resources['orb'].spritesheet;
  let heart = resources['heart'].spritesheet;
  let flame = resources['flame'].spritesheet;
  let hud = resources['hud'].spritesheet;

  return {
    'orb': orb.textures['orb.aseprite'],
    'heart': heart.textures['hearth.aseprite'],
    'hud': hud.textures['Sprite-0001.'],
    'flame': animationTextures(flame.textures, 'flame %.aseprite', 6)
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
