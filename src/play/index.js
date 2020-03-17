import { dContainer } from '../asprite';

import Board from './board';
import Editor from './editor';

import { rect } from '../dquad/geometry';

export default function Play(ctx) {

  const { canvas } = ctx;

  let boundsF = canvas.responsiveBounds(({ width, height }) => {

    let editX = width * 0.1,
        editY = height * 0.1,
        editWidth = width * 0.8,
        editHeight = height * 0.8,
        editArea = rect(editX, editY, editWidth, editHeight);

    let editor = {
      editX,
      editY,
      editWidth,
      editHeight,
      editArea
    };

    return {
      editor,
      width,
      height
    };
  });


  let board = new Board(this, ctx);
  let editor = new Editor(this, ctx, boundsF());

  this.init = data => {
    this.data = data;

    editor.init({});
  };
  
  this.update = delta => {

    editor.update(delta);

  };

  const container = this.container = dContainer();

  const initContainer = () => {
    container.addChild(editor.container);
  };
  initContainer();

  this.render = () => {
    editor.render();
  };

}
