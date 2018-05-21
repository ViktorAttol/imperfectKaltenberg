import React from 'react';

class PortalResonator extends React.Component {
    render() {
        return(
            <tr>
                <td className="p-sm-1">{this.props.resonator.position}</td>
                <td className="p-sm-1">L{this.props.resonator.level}</td>
                <td className="p-sm-1">{this.props.resonator.health}%</td>
                <td className="p-sm-1">{this.props.resonator.owner}</td>
            </tr>
        );
    }
}

export default PortalResonator;