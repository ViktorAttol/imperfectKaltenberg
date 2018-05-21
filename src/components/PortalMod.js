import React from 'react';

class PortalMod extends React.Component {
    render() {
        return(
            <tr>
                <td className="p-sm-1">{this.props.mod.slot}</td>
                <td className="p-sm-1">{this.props.mod.type}</td>
                <td className="p-sm-1">{this.props.mod.rarity}</td>
                <td className="p-sm-1">{this.props.mod.owner}</td>
            </tr>
        );
    }
}

export default PortalMod;