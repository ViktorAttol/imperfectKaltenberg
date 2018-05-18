import React from 'react';


class ResonatorComponent extends React.Component {

  static defaultProps = {
    resoData: {
      position: 'nothing',
      level: 0,
      health: 0,
      owner: 'Peter'
    }
  };

  render(){
    return(
      
      <span>
        <h4>
          Position: {this.props.resoData.position} | Resolevel: {this.props.resoData.level} | Resohealth: {this.props.resoData.health} | Besitzer: {this.props.resoData.owner}
        </h4>
      </span>
    );
  }
}

export default ResonatorComponent
