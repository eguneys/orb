import { dContainer } from '../asprite';


import Disciples from '../disciples';
import DisciplesView from './disciples';

export default function Board(play, ctx) {

  const { canvas } = ctx;

  let boundsF = canvas.responsiveBounds(({ width, height }) => {
    return {
      width,
      height
    };
  });

  let bs = boundsF();

  let dDisciples = new DisciplesView(this, ctx, bs);


  this.init = data => {
    this.data = data;

    let disciples = new Disciples();
    disciples.init({ map: 0 });

    dDisciples.init({
      disciples
    });
  };

  this.update = delta => {
    dDisciples.update(delta);
  };

  const container = this.container = dContainer();
  
  const initContainer = () => {
    container.addChild(dDisciples.container);
    // container.addChild(tiles.container);
  };

  initContainer();

  this.render = () => {};

}
