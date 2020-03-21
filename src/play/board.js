import { dContainer } from '../asprite';

import Disciples from '../disciples';
import DisciplesView from './disciples';
import Minimap from './minimap';

import { rect } from '../dquad/rect';

export default function Board(play, ctx) {

  const { canvas } = ctx;

  let boundsF = canvas.responsiveBounds(({ width, height }) => {
    let margin = 20;


    let disciplesWidth = width * 0.8,
        disciplesHeight = height * 0.8,
        disciplesX = margin,
        disciplesY = margin,
        disciplesArea = rect(disciplesX, disciplesY, 
                             disciplesWidth, disciplesHeight);

    let miniWidth = width * 0.3,
        miniHeight = miniWidth,
        miniX = width - miniWidth,
        miniY = disciplesY,
        miniArea = rect(miniX, miniY, miniWidth, miniHeight);

    return {
      width,
      height,
      disciples: disciplesArea,
      minimap: miniArea
    };
  });

  let bs = boundsF();

  let dDisciples = new DisciplesView(this, ctx, bs);
  let dMinimap = new Minimap(this, ctx, bs);

  this.init = data => {
    this.data = data;

    let disciples = new Disciples();
    disciples.init({ map: 0 });

    dDisciples.init({
      disciples
    });

    dMinimap.init({
      disciples
    });
  };

  this.update = delta => {
    dDisciples.update(delta);
    dMinimap.update(delta);
  };

  const container = this.container = dContainer();
  
  const initContainer = () => {
    let { disciples, minimap } = bs;

    dDisciples.container
      .position.set(disciples.x, disciples.y);
    container.addChild(dDisciples.container);
    dMinimap.container.
      position.set(minimap.x, minimap.y);
    container.addChild(dMinimap.container);
  };

  initContainer();

  this.render = () => {};

}
