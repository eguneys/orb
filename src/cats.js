import Pool from 'poolf';

import Graphics from './graphics';

import * as mu from 'mutilz';

import { rect, line, circle } from './dquad/geometry';

import * as v from './vec2';

export function Light() {

  let x, y, radius;

  let g1 = new Graphics();
  let g2 = new Graphics();

  let smallPoints = this.smallPoints = new Pool(() => new LightPoint(), {
    name: "Small Lights",
    warnLeak: 5000
  });
  let bigPoints = this.bigPoints = new Pool(() => new LightPoint(), {
    name: "Big Lights",
    warnLeak: 5000
  });

  let r;

  let tick;

  this.init = (data) => {
    x = data.x;
    y = data.y;
    radius = data.radius;
    r = circle(x, y, radius);
    tick = 0;
  };

  this.move = (a, b) => {
    x = a;
    y = b;
    r = circle(x, y, radius);
  };



  this.update = delta => {
    tick+= delta * 0.1;

    r = circle(x, y, radius + Math.sin(tick * 2) );

    let r2 = circle(x, y, radius * 2 + Math.sin(tick * 2));

    g1.clear();
    g2.clear();

    g1.fillCircle(r, tick);
    g2.fillCircle(r2, tick);

    smallPoints.releaseAll();
    bigPoints.releaseAll();

    g1.points().forEach(([x, y]) => smallPoints.acquire(_ => _.init({
      x, y, color: 'small'
    })));

    g2.points().forEach(([x, y]) => bigPoints.acquire(_ => _.init({
      x, y, color: 'big'
    })));
  };
}

export function LightPoint() {

  let x, y, color;
  
  this.init = (data) => {
    x = this.x = data.x;
    y = this.y = data.y;
    color = this.color = data.color;
  };
};

export function Cat(x, y, w, h) {

  let g = new Graphics();

  this.points = g.points;

  let r = rect(x, y, w, h);

  let tick = Math.random() * 100;

  this.fillPoints = () => {
    
  };

  this.update = delta => {
    tick += delta * 0.01;

    g.clear();

    let rounds = 0.94;

    let ab = r.AB.scale(rounds);
    let bc = r.BC.scale(rounds);
    let cd = r.CD.scale(rounds);
    let da = r.DA.scale(rounds);

    let wave = Math.sin(tick * 10) * 0.05;

    g.bent(line(ab.A, bc.B), 0.2);
    g.bent(ab, wave);
    g.bent(bc, wave);
    g.bent(line(bc.A, cd.B), 0.2);
    g.bent(cd, wave);
    g.bent(line(cd.A, da.B), 0.2);
    g.bent(line(da.A, ab.B), 0.2);
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
