import { dContainer } from '../asprite';

import Board from './board';

export default function Play(ctx) {

  let board = new Board(this, ctx);

  this.init = data => {
    this.data = data;

    board.init({});
    initContainer();
  };
  
  this.update = delta => {

    board.update(delta);

  };

  const container = this.container = dContainer();

  const initContainer = () => {
    container.addChild(board.container);
  };

  this.render = () => {
    board.render();
  };

}
