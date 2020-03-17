import { dContainer } from '../../asprite';

import EditArea from './editarea';
import TilePalette from './palette';

export default function Editor(play, ctx, bs) {

  const { textures } = ctx;

  let editArea = new EditArea(this, ctx, bs.editor);
  let tilePalette = new TilePalette(this, ctx, bs.palette);

  this.init = data => {
    let palette = [
      { texture: textures['hud'] },
      { texture: textures['orb'] },
      { texture: textures['yellow'] },
      { texture: textures['white'] }
    ];

    editArea.init({});
    tilePalette.init({
      palette
    });
  };

  this.selectedTile = () => tilePalette.selected();
  
  this.update = delta => {
    editArea.update(delta);
    tilePalette.update(delta);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    const { editX,
            editY } = bs.editor;

    const {
      paletteX,
      paletteY } = bs.palette;

    editArea.container
      .position.set(editX, editY);
    container.addChild(editArea.container);

    tilePalette.container
      .position.set(paletteX,
                    paletteY);
    container.addChild(tilePalette.container);
  };
  initContainer();

  this.render = () => {
  };

}
