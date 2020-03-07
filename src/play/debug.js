import { lazy } from '../util';
import { dContainer, sprite } from '../asprite';

export default function Debug(play, textures) {

  let orbTexture = textures['orb.aseprite'];

  let container;

  this.init = data => {
  };
  
  this.update = delta => {
  };

  this.render = () => {
  };

  this.container = lazy(() => {
    let container = dContainer();
    for (let i = 0; i< 100; i++) {
      let orbSprite = sprite(orbTexture);
      orbSprite.position.x = i * 32;
      orbSprite.position.y = (i % 2) * 32;
      container.addChild(orbSprite);
    }
    return container;
  });

}
