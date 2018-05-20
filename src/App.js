import React, { Component } from 'react';
import KaltenStart from './KaltenStart';
import backgroundImage from './pics/poster-10.jpg';

var backgroundStyle = {
    backgroundImage: 'url(' + backgroundImage + ')',
    height: 970
}

class App extends Component {
    render() {
        return (
            <div class="wrapper" style={backgroundStyle}>
                <div class="container">
                    <h1>Imperfect Humanist</h1>
                    <KaltenStart />
                </div>
            </div>
        );
    }
}

export default App;
