import { dContainer } from '../asprite';

import EditArea from './editarea';

export default function Editor(play, ctx, bs) {

  let editArea = new EditArea(play, ctx, bs.editor);

  this.init = data => {

    editArea.init({});
  };
  
  this.update = delta => {
    editArea.update(delta);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    const { editX,
            editY } = bs.editor;

    editArea.container
      .position.set(editX, editY);
    container.addChild(editArea.container);
  };
  initContainer();

  this.render = () => {
  };

}
