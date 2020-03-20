import { dContainer, sprite, text } from '../../asprite';

export default function MenuArea(play, ctx, bs) {

  const { textures, events, config } = ctx;

  let bgTexture = textures['bggray'];

  let save = new Dropdown(play, ctx);
  let playDropdown = new Dropdown(play, ctx);

  this.init = data => {

    save.init({ label: 'Save',
                onClick: () => play.save() });

    playDropdown.init({ label: 'Play',
                        onClick: () => play.togglePlay() });

  };
  
  this.update = delta => {
    handleMouse();
  };

  const handleMouse = () => {
    const { current } = events.data;

    let { menuArea } = bs;

    if (current) {
      let { tapping, epos } = current;

      if (tapping && menuArea.containsPoint(...epos)) {
        save.handleMouse(epos);
        playDropdown.handleMouse(epos);
      }
        
    }
  };

  const container = this.container = dContainer();

  const initContainer = () => {
    let { menuWidth,
          menuHeight } = bs;

    const bg = sprite(bgTexture);
    bg.width = menuWidth;
    bg.height = menuHeight;
    container.addChild(bg);

    save.container.position.set(0, 0);
    container.addChild(save.container);

    playDropdown.container.position.set(60, 0);
    container.addChild(playDropdown.container);

  };
  initContainer();

  this.render = () => {
  };

}

function Dropdown(play, ctx) {

  const { textures } = ctx;

  let onClick;

  let label;

  let d;

  this.init = data => {
    label = data.label;
    onClick = data.onClick;

    addToContainer();
  };
  
  this.update = delta => {
  };

  this.handleMouse = pos => {
    if (hitTest(pos)) {
      onClick();
    }
  };

  const hitTest = pos => {
    return d.getBounds().contains(...pos);
  };

  const addToContainer = () => {
    d = text(label, {
      fontSize: 24
    });
    d.position.set(2, 2);
    container.addChild(d);
  };

  const container = this.container = dContainer();

  const initContainer = () => {
  };


  this.render = () => {
  };

}
