import { lazy } from '../util';
import { dContainer, sprite, text, nineSlice } from '../asprite';

export default function Menu(play, ctx) {
  const { textures, events, config } = ctx;

  let menuTexture = textures['hud'];

  this.init = data => {
  };
  
  this.update = delta => {
  };

  this.render = () => {
  };

  this.container = lazy(() => {
    let container = dContainer();

    let menuSprite = nineSlice(menuTexture, 16);
    container.addChild(menuSprite);

    menuSprite.width = 400;
    menuSprite.height = 160;

    let ttext = text("Lorem ipsum. Dolor sit amet, ipsum dolor", { fontFamily: 'Verdana', fill: 'darkred', wordWrap: true, wordWrapWidth: 400, lineHeight: 24, fontSize: 24, align: 'left' });
    container.addChild(ttext);
    ttext.position.y += 20;
    ttext.position.x += 20;
    
    return container;
  });

}
