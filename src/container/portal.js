import React from 'react';
import Resonator from './resonator';
import PortalComponent from '../components/portalComponent';
import {Button} from 'react-bootstrap';

class Portal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        online: 'No!',
        title: "kaltenberg",
        level: 8,
        health: 100,
        resonator: [],
        faction: 'Resistance'
      
    }
  }



  render(){
    return(
      <div>
        <PortalComponent status = {this.state}
        E={<Resonator />}
        NE={<Resonator />}
        N={<Resonator />}
        NW={<Resonator />}
        W={<Resonator />}
        SW={<Resonator />}
        S={<Resonator />}
        SE={<Resonator />}
         />

      </div>
    );
  }
}

export default Portal
