import { dContainer } from '../../asprite';

import { rect } from '../../dquad/geometry';

import ToggleArea from './togglearea';
import PlayArea from './playarea';
import EditArea from './editarea';
import TilePalette from './palette';
import MenuArea from './menuarea';

import { callUserFunction } from '../../util';

export default function Editor(play, ctx) {

  const { canvas, config, textures } = ctx;

  let boundsF = canvas.responsiveBounds(({ width, height }) => {
    let margin = width * 0.01;

    let menuX = 0,
        menuY = 0,
        menuWidth = width,
        menuHeight = 30,
        menuArea = rect(menuX, menuY, menuWidth, menuHeight);

    let paletteX = margin,
        paletteY = menuY + menuHeight + margin,
        paletteWidth = width * 0.1,
        paletteHeight = height * 0.8,
        tileSize = paletteWidth * 0.4,
        paletteArea = rect(paletteX, paletteY, paletteWidth, paletteHeight);

    let editX = paletteX + paletteWidth + margin,
        editY = paletteY,
        editWidth = width * 0.8,
        editHeight = height * 0.8,
        editArea = rect(editX, editY, editWidth, editHeight);

    let menu = {
      menuX,
      menuY,
      menuWidth,
      menuHeight,
      menuArea
    };

    let palette = {
      paletteX,
      paletteY,
      paletteWidth,
      paletteHeight,
      tileSize,
      paletteArea
    };

    let editor = {
      editX,
      editY,
      editWidth,
      editHeight,
      editArea
    };

    return {
      menu,
      editor,
      palette,
      width,
      height
    };
  });

  let bs = boundsF();

  let editArea = new EditArea(this, ctx, bs.editor);
  let tilePalette = new TilePalette(this, ctx, bs.palette);
  let menuArea = new MenuArea(this, ctx, bs.menu);
  let playArea = new PlayArea(this, ctx, bs.editor);

  let toggleArea = new ToggleArea(this, ctx);

  const paletteItem = (name) => ({ name });

  this.init = data => {
    let palette = [
      paletteItem('empty'),
      paletteItem('water'),
      paletteItem('earth')
    ];

    menuArea.init({
      events: data.events
    });

    tilePalette.init({
      palette
    });

    editArea.init({});
//     editArea.load();

    toggleArea.init({
      view1: editArea,
      view2: playArea
    });
  };

  this.togglePlay = () => {
    if (toggleArea.selected() === playArea) {
      toggleArea.selectView(editArea);
    } else {
      playArea.init({
        worms: editArea.worms()
      });
      toggleArea.selectView(playArea);
    }
  };

  this.save = () => {
    callUserFunction(config.events.onSave, editArea.saveData());
  };

  this.selectedTile = () => tilePalette.selected();
  
  this.update = delta => {
    toggleArea.update(delta);
    tilePalette.update(delta);
    menuArea.update(delta);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    const { editX,
            editY } = bs.editor;

    const {
      paletteX,
      paletteY } = bs.palette;

    const { menuX,
            menuY } = bs.menu;


    toggleArea.container
      .position.set(editX, editY);
    container.addChild(toggleArea.container);

    // editArea.container
    //   .position.set(editX, editY);
    // container.addChild(editArea.container);

    tilePalette.container
      .position.set(paletteX,
                    paletteY);
    container.addChild(tilePalette.container);

    menuArea.container
      .position.set(menuX, menuY);
    container.addChild(menuArea.container);
  };
  initContainer();

  this.render = () => {
  };

}
