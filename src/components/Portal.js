import React from 'react';
import PortalResonator from './PortalResonator';
import PortalMod from './PortalMod';

class Portal extends React.Component {
    render() {
        console.log(this.props.portal);
        let resonators;
        if (this.props.portal.resonators) {
            resonators = this.props.portal.resonators.map(resonator => {
                return (
                    <PortalResonator key={resonator.position} resonator={resonator} />
                );
            });
        }
        let mods;
        if (this.props.portal.mods) {
            mods = this.props.portal.mods.map(mod => {
                return (
                    <PortalMod key={mod.slot} mod={mod} />
                );
            });
        }
        return(
            <div>
                <h2>{this.props.portal.title}</h2>
                <div>
                    <strong>{this.props.portal.controllingFaction}</strong>
                    &nbsp;-&nbsp;
                    {this.props.portal.owner}
                </div>
                <strong>Deployed Resonators</strong>
                <table>
                    <tbody>
                        {resonators}
                    </tbody>
                </table>
                <strong>Deployed Mods</strong>
                <table>
                    <tbody>
                        {mods}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Portal;