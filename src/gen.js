import { rect } from './dquad/rect';

import * as mu from 'mutilz';

export default function genWorms(worms) {
  const { width, height } = worms;

  let sky = height * 0.8;

  worms.hideRect(rect(0, 0, width, sky));

  for (let i = 0; i < width; i ++) {
    let y = mu.usin(i / 8) * 8;

    worms.hideRect(rect(i, sky, 1, y));
  }
}
