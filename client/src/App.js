import React, { Component } from 'react';
import Video from './components/Video';

const neutral = 'Neutral';
const resistance = 'Resistance';
const enlightened = 'Enlightened';

class App extends Component {

    state = {
        portal: {
            controllingFaction: neutral
        },
        capture: false,
        changeMillis: 4242
    }

    componentWillMount() {
        this.updatePortalData();
        this.timer = setInterval(() => this.updatePortalData(), 200);
    }

    updatePortalData() {
        fetch('/api/portal/dynamic')
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(data => {
                // console.log(data);
                this.setState(prevState => {
                    var portal = data.result;
                    if (!portal.controllingFaction) {
                        portal.controllingFaction = neutral;
                    }
                    var change = portal.controllingFaction !== prevState.portal.controllingFaction;
                    var capture = change && portal.controllingFaction !== neutral;
                    var changeMillis = prevState.changeMillis;
                    if (change) {
                        changeMillis = (new Date()).getTime() % 1000;
                        if (changeMillis < 1000) {
                            changeMillis += 1000;
                        }

                        // then removing the other classes as needed
                        document.body.classList.toggle('neutral',
                            portal.controllingFaction !== resistance &&
                            portal.controllingFaction !== enlightened
                        );
                        document.body.classList.toggle('res', portal.controllingFaction === resistance);
                        document.body.classList.toggle('enl', portal.controllingFaction === enlightened);
                    }

                    var nextState = {
                        portal: data.result,
                        capture: capture,
                        changeMillis: changeMillis
                    };
                    return nextState;
                });
            });
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="main">
                <div className="faction"><span className="res">{this.state.portal.controllingFaction}</span></div>
                <div className="range"><span>{this.state.changeMillis}</span></div>
                <div className="portallevel"><span>{this.state.portal.level}</span></div>
                <div className="playername"><span>{this.state.portal.owner}</span></div>
                <div className="resoplayer">
                    <span className="one">akatose</span>
                    <span className="two">BlackDevils27</span>
                    <span className="three">Fantasio</span>
                    <span className="four">Zorig</span>
                    <span className="five">Tropus</span>
                    <span className="six">DrayPrescot</span>
                    <span className="seven">vitus365</span>
                    <span className="eight">genmaicha</span>
                </div>
                <div className="resos">
                    <div className="l1">1</div>
                    <div className="l2">2</div>
                    <div className="l3">3</div>
                    <div className="l4">4</div>
                    <div className="l5">5</div>
                    <div className="l6">6</div>
                    <div className="l7">5</div>
                    <div className="l8">8</div>
                </div>
                <div className="portalname"><span>{this.state.portal.title}</span></div>
                <div className="energy"><span>48k</span></div>
                <div className="mods">
                    <div className="mod1"><span className="modtext">CMH</span></div>
                    <div className="mod2"><span className="modtext">RHS</span></div>
                    <div className="mod3"><span className="modtext">VRLA</span></div>
                    <div className="mod4"><span className="modtext">CS</span></div>
                </div>
                <div className="slots">
                    <div className="comm"><span className="commtext">E8 / NE7 / N7 / NW7 / W6 / SW6 / S5 / SE8</span></div>
                </div>
                <Video triggerOpen={this.state.capture}/>
            </div>
        );
    }
}

export default App;
