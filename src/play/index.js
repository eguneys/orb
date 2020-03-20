import { dContainer } from '../asprite';

import Board from './board';

export default function Play(ctx) {

  const { canvas } = ctx;

  let board = new Board(this, ctx);

  this.init = data => {
    this.data = data;

    board.init({});
  };
  
  this.update = delta => {
    board.update(delta);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    container.addChild(board.container);
  };
  initContainer();

  this.render = () => {};

}
