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
        health: 0,
        capture: false,
        changeMillis: 4242
    };

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
                    var health = 0.0;
                    if (portal.resonators) {
                        health = portal.resonators.reduce((acc, resonator) => {
                            acc += resonator.health;
                            return acc;
                        }, 0.0) / portal.resonators.length;
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
                        health: health,
                        capture: capture,
                        changeMillis: changeMillis
                    };
                    return nextState;
                });
            })
            .catch(error => console.error(error));
    }

    render() {
        let resonatorOwners;
        if (this.state.portal.resonators) {
            resonatorOwners = this.state.portal.resonators.map(resonator => {
                return (
                    <span key={'ro' + resonator.position} className={resonator.position}>{resonator.owner || ''}</span>
                );
            });
        }

        let resonatorLevels;
        if (this.state.portal.resonators) {
            resonatorLevels = this.state.portal.resonators.map(resonator => {
                return (
                    <div key={'rl' + resonator.position} className={'rl' + resonator.position + ' l' + resonator.level}>{resonator.level}</div>
                );
            });
        }

        let mods;
        if (this.state.portal.mods) {
            mods = this.state.portal.mods.map(mod => {
                var modtext = (mod.rarity + ' ' + mod.type).split(/[ -]/).map(s => s[0]).join('').toUpperCase();
                console.log({
                    type: mod.type,
                    text: modtext
                });
                return (
                    <div key={'mod' + mod.slot} className={'mod' + mod.slot}><span className="modtext">{modtext}</span></div>
                );
            })
        }

        return (
            <div className="main">
                <div className="faction"><span className="res">{this.state.portal.controllingFaction}</span></div>
                <div className="range"><span>{this.state.changeMillis}</span></div>
                <div className="portallevel"><span>{this.state.portal.level}</span></div>
                <div className="playername"><span>{this.state.portal.owner}</span></div>
                <div className="resoplayer">
                    {resonatorOwners}
                </div>
                <div className="resos">
                    {resonatorLevels}
                </div>
                <div className="portalname"><span>{this.state.portal.title}</span></div>
                <div className="energy"><span>{Number(this.state.health).toFixed(1)}</span></div>
                <div className="mods">
                    {mods}
                </div>
                <div className="slots">
                    <div className="comm"><span className="commtext">N / NE / E / SE / S / SW / W / NW</span></div>
                </div>
                <Video triggerOpen={this.state.capture}/>
            </div>
        );
    }
}

export default App;
