import Graphics from './graphics';

import * as mu from 'mutilz';

import { line } from './dquad/line';



export default function Cats() {

  let cats = this.cats = [];

  this.update = delta => {
    cats.forEach(_ => _.update(delta));
  };

  this.cat = (x, y) => {
    let cat = new Cat(x, y);

    cats.push(cat);
  };
  
}

function Cat(x, y) {
  let g = new Graphics();

  this.points = g.points;

  this.update = delta => {

    g.clear();

    g.bezier([x+40, y+40],
             [x+60, y+40],
      line([x, y],
           [x+100, y+100]));
    
  };
}

function CatLine(x, y) {

  let g = new Graphics();


  this.points = g.points;

  let tick = 0;

  this.update = delta => {
    tick+= delta * 0.01;

    let offX = mu.usin(tick) * 100,
        offY = mu.usin(tick * 0.5) * 100;

    g.clear();

    g.line(line([x, y],
                [x+offX, y+offY]));
  };
}
