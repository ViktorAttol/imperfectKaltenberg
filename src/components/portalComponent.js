import React from 'react';

class PortalComponent extends React.Component {
  render(){
    return(
      <div>
        <h4>Online: {this.props.status.online}</h4>
        <h4>Title: {this.props.status.title}</h4>
        <h4>Level: {this.props.status.level}</h4>
        <h4>Health: {this.props.status.health}</h4>
        <h4>Fraktion: {this.props.status.faction}</h4>
        {this.props.E}
        {this.props.NE}
        {this.props.N}
        {this.props.NW}
        {this.props.W}
        {this.props.SW}
        {this.props.S}
        {this.props.SE}
      </div>
    );
  }
}

export default PortalComponent
