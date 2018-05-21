import React from 'react';
import './Video.css';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.triggerOpen && !prevState.open) {
            return { open: true };
        }
        return null;
    }

    handleVideoStop() {
        this.setState({ open: false });
    }

    render() {
        console.log({ videoOpen: this.state.open });
        if (!this.state.open) {
            return null;
        }
        return (
            <video className="video" width="852" height="480" autoplay="true"
                   onEnded={this.handleVideoStop.bind(this)}
                   onAbort={this.handleVideoStop.bind(this)}
                   onEmptied={this.handleVideoStop.bind(this)}
                   onError={this.handleVideoStop.bind(this)}>
                <source type="video/webm" src="/video/001.webm" />
            </video>
        );
    }
}

export default Video;