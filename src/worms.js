import Destructible from './dquad/destructible';

export default function Worms(x, y, w, h) {

  const 
  stateVisible = {
    visible: true
  },
  stateHidden = {
    visible: false
  };
  
  let body = new Destructible(x, y, w, h, stateVisible);


  this.traverse = body.traverse;
  
}
