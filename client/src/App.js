import React, { Component } from 'react';
import Portal from './components/Portal';
import backgroundImage from './images/poster-10.jpg';
import Video from "./components/Video";

var backgroundStyle = {
    backgroundImage: 'url(' + backgroundImage + ')',
    height: 970
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portal: {},
            capture: false
        }
    }

    componentWillMount() {
        this.updatePortalData();
        this.timer = setInterval(() => this.updatePortalData(), 2000);
    }

    updatePortalData() {
        fetch('/api/portal/wigwam')
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState(prevState => ({
                    portal: data.result,
                    capture: (
                        data.result.controllingFaction &&
                        data.result.controllingFaction !== 'Neutral' &&
                        prevState.portal.controllingFaction &&
                        prevState.portal.controllingFaction != data.result.controllingFaction
                    )
                }));
            });
    }

    render() {
        console.log({ capture: this.state.capture });
        return (
            <div style={backgroundStyle}>
                <div className="main">
                    <div className="container">
                        <h1 className="pt-xl-5 pb-xl-3">Imperfect Humanist</h1>
                        <Portal portal={this.state.portal} />
                    </div>
                </div>
                <Video triggerOpen={this.state.capture}/>
            </div>
        );
    }
}

export default App;
