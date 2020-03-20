import { dContainer, sprite } from '../../asprite';

import { rect } from '../../dquad/geometry';


export default function Palette(play, ctx, bs) {

  const { textures, events } = ctx;

  const tBgGray = textures['bggray'];

  let palette,
      dPalette;

  let selectedIndex;

  this.selected = () => palette[selectedIndex];

  this.init = data => {
    palette = data.palette;

    addPaletteTiles();

    selectTile(dPalette[0]);
  };
  
  this.update = delta => {
    handleMouse();
  };

  const handleMouse = () => {
    const { current } = events.data;

    let { paletteArea } = bs;

    if (current) {
      if (current.tapping) {
        let { epos } = current;

        if (paletteArea.containsPoint(...epos)) {

          let selectedTile = dPalette.find(_ => _.handleMouse(epos));

          if (selectedTile) {
            selectTile(selectedTile);
          }

        }

      }
    }
  };

  const selectTile = tile => {

    selectedIndex = tile.index();
    
  };

  let paletteContainer;

  const addPaletteTiles = () => {

    let { paletteArea } = bs;

    dPalette = [];

    palette.forEach((tile, i) => {

      let x = i % 2,
          y = Math.floor(i / 2);

      x *= bs.tileSize;
      y *= bs.tileSize;

      let dArea = rect(paletteArea.x + x, 
                       paletteArea.y + y, bs.tileSize, bs.tileSize);

      let d = new PaletteTile(this, ctx, bs);
      d.init({ tile, i, dArea });

      d.container.position.set(x, y);

      paletteContainer.addChild(d.container);

      dPalette.push(d);
    });
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    let { paletteWidth,
          paletteHeight } = bs;
    
    const bg = sprite(tBgGray);
    bg.width = paletteWidth;
    bg.height = paletteHeight;
    container.addChild(bg);

    paletteContainer = dContainer();
    container.addChild(paletteContainer);

  };
  initContainer();

  this.render = () => {
  };

}

function PaletteTile(play, ctx, bs) {

  const { textures } = ctx;

  let i,
      tile,
      dArea;

  let d;

  this.index = () => i;

  this.init = data => {

    i = data.i;
    tile = data.tile;
    dArea = data.dArea;

    d.texture = textures[tile.name];
  };

  this.update = delta => {

  };

  this.handleMouse = pos => {
    return dArea.containsPoint(...pos);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    let bg = sprite(textures['black']);
    bg.width = bs.tileSize;
    bg.height = bs.tileSize;
    container.addChild(bg);

    d = sprite(textures['darkgray']);
    d.width = bs.tileSize - 2;
    d.height = bs.tileSize - 2;
    container.addChild(d);
  };
  initContainer();

  this.render = () => {
  };

}
