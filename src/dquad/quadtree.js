import Rect from './rect';

export default function QuadTree(x, y, w, h,
                                 data = null,
                                 depth = 4,
                                 index = 0,
                                 children = null) {

  
  let rect = new Rect(x, y, w, h);

  this.updateWithRectangle = (tRect, newData) => {
    if (tRect.contains(rect)) {
      this.foldChildrenToParent(newData);
      return;
    }
    if (tRect.intersects(rect) || rect.contains(tRect)) {
      this.updateChildren(newData, (newChild, newData) => {
        newChild.updateWithRectangle(tRect, newData);
      });
    }
  };

  this.updateWithCircle = (tCircle, newData) => {
    if (tCircle.containsRect(rect)) {
      this.foldChildrenToParent(newData);
      return;
    }
    if (tCircle.intersectsRect(rect) ||
        rect.containsPoint(tCircle.x, tCircle.y)) {
      this.updateChildren(newData, (newChild, newData) => {
        newChild.updateWithCircle(tCircle, newData);
      });
    }
  };

  this.traverse = onLeafReached => {
    if (children !== null) {
      children.forEach(child => child.traverse(onLeafReached));
    }
    else onLeafReached(data, rect, index);
  };

  this.updateTree = (onLeafReached, updateDataFn) => {
    if (children === null) {
      let newData = updateDataFn(data);
      onLeafReached(this, newData);
    } else {
      children.forEach(child => {
        child.updateTree(onLeafReached, updateDataFn);
      });
    }
  };

  this.updateChildren = (newData, onUpdateChild) => {
    if (depth > 0) {
      if (children === null) {
        createChildren(newData);
      }
      children.forEach(child => {
        onUpdateChild(child, newData);
      });
      
      clearRedundantChildren();
    } else foldChildrenToParent(newData);
  };

  const clearRedundantChildren = () => {
    
  };

  const foldChildrenToParent = this.foldChildrenToParent = (_data) => {
    children = null;
    data = _data;
  };

  const createChildren = (newData) => {
    let wh = [
      { w: 0, h: 0 },
      { w: 1, h: 0 },
      { w: 0, h: 1 },
      { w: 1, h: 1 }
    ];
    children = [];
    for (let i = 0; i < 4; i++) {
      let o = wh[i];
      let x = rect.x + (rect.width  / 2 * o.w),
          y = rect.y + (rect.height / 2 * o.h),
          w = rect.width / 2,
          h = rect.height / 2;

      let newChild = new QuadTree(x,y,w,h,
                                  data, depth - 1, i);
      children.push(newChild);
    }
  };
  

}
