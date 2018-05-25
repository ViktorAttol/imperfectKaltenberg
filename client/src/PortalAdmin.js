import React, { Component } from 'react';
// unfortunately, as soon as we import Bootstrap the portal view layout breaks :-(
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

// const neutral = 'Neutral';
// const resistance = 'Resistance';
// const enlightened = 'Enlightened';

class PortalAdmin extends Component {
    // state = {
    //     portal: {
    //         controllingFaction: neutral
    //     },
    //     health: 0,
    // };

    componentWillMount() {
        document.body.classList.toggle('neutral', false);
        document.body.classList.toggle('res', false);
        document.body.classList.toggle('enl', false);
        document.body.classList.toggle('admin', true);
    }

    render() {
        return (
            <div className="main">
                <h1>Portal Admin</h1>
            </div>
        );
    }
}

export default PortalAdmin;
