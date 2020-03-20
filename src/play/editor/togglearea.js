import { dContainer } from '../../asprite';

export default function ToggleArea(play, ctx) {

  const { textures } = ctx;

  let view1,
      view2;

  let selected;

  this.init = data => {
    view1 = data.view1;
    view2 = data.view2;

    this.selectView(view1);
  };

  this.selected = () => selected;

  this.selectView = view => {
    if (selected) {
      container.removeChild(selected.container);
    }
    container.addChild(view.container);

    selected = view;
  };
  
  this.update = delta => {
    selected.update(delta);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
  };
  initContainer();

  this.render = () => {
  };

}
