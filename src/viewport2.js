import Pool from 'poolf';
import * as v from './vec2';

const { vec2 } = v;

import { noop } from './util';

export default function Viewport({
  getPosition,
  vWidth = 100,
  vHeight = 100,
  onOn = noop,
  onOff = noop,
  onView = noop}) {

  let dragDelta = vec2(0);
  let viewDelta = vec2(0);

  let children = new Pool(() => new ViewportChild(this, getPosition), {
    name: 'Viewport',
    warnLeak: 20000
  });

  const viewOrigin = () => v.cadd(dragDelta, viewDelta);

  const worldToView = worldPos => {
    let res = vec2(0);
    v.add(res, worldPos);
    v.sub(res, viewOrigin());
    return res;
  };

  const viewToWorld = viewPos => {
    let res = vec2(0);
    v.add(res, viewPos);
    v.add(res, viewOrigin());
    return res;
  };

  this.addChild = (item, pos) => children.acquire(_ => _.init({
    item,
    onOn,
    onOff,
    onView
  }));
  this.removeChild = (child) => children.release(child);
  this.removeChildren = () => children.releaseAll();

  this.drag = (v1, scale = 1) => {
    v.setScale(dragDelta, v1, -scale);
    return this;
  };

  this.commitDrag = () => {
    v.add(viewDelta, dragDelta);
    v.scale(dragDelta, 0);
  };

  this.update = (delta) => {
    children.each(child => child.update(delta));
  };

  this.viewToWorld = pos => viewToWorld(pos);

  this.visiblePosition = pos => worldToView(pos);

  this.visible = pos => {
    let vPos = worldToView(pos);

    if (vPos[0] < 0 || vPos[1] < 0 ||
        vPos[0] > vWidth || vPos[1] > vHeight) {
      console.log('here');
      return false;
    }
    return true;
  };

}

function ViewportChild(viewport, getPosition) {

  let item,
      onOn,
      onOff,
      onView;

  let wasVisible;
  
  const pos = () => getPosition(item);

  this.visiblePosition = () => viewport.visiblePosition(pos());

  this.init = (opts) => {
    wasVisible = undefined;
    item = opts.item;
    onOn = opts.onOn;
    onOff = opts.onOff;
    onView = opts.onView;
  };

  this.update = delta => {
    if (visible()) {
      if (!wasVisible) {
        wasVisible = true;
        onOn(item);
      }
      onView(item, this.visiblePosition());
    } else {
      if (wasVisible || wasVisible === undefined) {
        wasVisible = false;
        onOff(item);
      }
    }
  };

  const visible = () => viewport.visible(pos());

}
