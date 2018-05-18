import React from 'react';
import ResonatorComponent from '../components/resonatorComponent'

class Resonator extends React.Component {

  constructor(props) {
    super(props),
    this.state = {
      position: 'nothing',
      level: 0,
      health: 0,
      owner: 'Peter'
    }
  };

  render(){
    return(<ResonatorComponent resoData = {this.state}/>);
  }
}

export default Resonator
