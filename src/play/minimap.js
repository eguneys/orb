import { dContainer, sprite } from '../asprite';

export default function Minimap(play, ctx, bs) {

  let { width, height } = bs.minimap;

  const { textures } = ctx;

  this.init = data => {
  };
  
  this.update = delta => {
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    const bg = sprite(textures['earth']);
    bg.width = width;
    bg.height = height;
    container.addChild(bg);

  };
  initContainer();

  this.render = () => {
  };

}
