import QuadTree from './quadtree';

export default function Destructible(x, y, w, h, state, depth) {

  let body = new QuadTree(x, y, w, h, state, depth);

  this.traverse = body.traverse;

  this.modifyByRectangle = (r, newState) => {
    body.updateWithRectangle(r, newState);
  };

  this.modifyByCircle = (c, newState) => {
    body.updateWithCircle(c, newState);
  };

}
