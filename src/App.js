import React, { Component } from 'react';
import Portal from './components/Portal';
import backgroundImage from './images/poster-10.jpg';

var backgroundStyle = {
    backgroundImage: 'url(' + backgroundImage + ')',
    height: 970
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            portal: {}
        }
    }

    componentWillMount() {
        this.updatePortalData();
        // this.timer = setInterval(()=> this.updatePortalData(), 2000);
    }

    updatePortalData() {
        fetch('./portalData.json')
            .then(result => result.json())
            .then(result => {
                this.setState({ portal: result });
            });
    }

    render() {
        return (
            <div className="wrapper" style={backgroundStyle}>
                <div className="container">
                    <h1 className="pt-xl-5 pb-xl-3">Imperfect Humanist</h1>
                    <Portal portal={this.state.portal} />
                </div>
            </div>
        );
    }
}

export default App;
