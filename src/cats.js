import Graphics from './graphics';

import * as mu from 'mutilz';

import { rect, line } from './dquad/geometry';

import * as v from './vec2';


export default function Cats() {

  let cats = this.cats = [];

  this.update = delta => {
    cats.forEach(_ => _.update(delta));
  };

  this.cat = (x, y, w, h) => {
    let cat = new Cat(x, y, w, h);

    cats.push(cat);
  };
  
}

function Cat(x, y, w, h) {
  let g = new Graphics();

  this.points = g.points;

  let r = rect(x, y, w, h);

  let tick = Math.random() * 100;

  this.update = delta => {
    tick += delta * 0.01;

    g.clear();

    // g.line(r.AB.scale(0.9));
    // g.line(r.CD);

    let rounds = 0.94;

    let ab = r.AB.scale(rounds);
    let bc = r.BC.scale(rounds);
    let cd = r.CD.scale(rounds);
    let da = r.DA.scale(rounds);

    let wave = Math.sin(tick * 10) * 0.05;

    g.bent(line(ab.A, bc.B), 0.2);
    g.bent(line(bc.A, cd.B), 0.2);
    g.bent(line(cd.A, da.B), 0.2);
    g.bent(line(da.A, ab.B), 0.2);
    g.bent(ab, wave);
    g.bent(bc, wave);
    g.bent(cd, wave);
    g.bent(da, wave);

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
