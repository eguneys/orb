import * as PIXI from 'pixi.js';

export function dContainer() {
  return new PIXI.Container();
}

export function sprite(texture) {
  return new PIXI.Sprite(texture);
}

export function pContainer() {
  return new PIXI.ParticleContainer();
}
