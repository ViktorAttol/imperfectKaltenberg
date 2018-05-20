import React from 'react';
import Portal from './container/portal'
import {Button} from 'react-bootstrap';

class KaltenStart extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      anzahl: 1
    }
  }

  //componentWillMount()
  onButtonClick(){
    this.setState({anzahl: this.state.anzahl +1});
  }


  static defaultProps = {name: 'tiegermann'};


  render() {
    return(
      <div>
        <ul class="nav nav-pills text-danger">
          <Button bsStyle='danger' onClick={this.onButtonClick.bind(this)}>Portal Infos</Button>
          <Button bsStyle='danger' onClick={this.onButtonClick.bind(this)}>Video</Button>
          <Button bsStyle='danger' onClick={this.onButtonClick.bind(this)}>Portal Kontrolle</Button>
        </ul>
        <Portal />
      </div>
    );
  }
  componentDidMount(){
    this.setState({anzahl: this.state.anzahl + 5});
  }
}

class Greeting extends React.Component {
  render(){
    if(this.props.welcome === true){
      return(<span>spaciba </span>);
    }else{
      return(<span>dobraie utra </span>);
    }
  }
}

/**

        <h1>
          <Greeting welcome={false}/>{this.props.name}
        </h1>
        <p>
          {this.state.anzahl}
        </p>
        <button onClick={this.onButtonClick.bind(this)}>button</button>
*/

export default KaltenStart;