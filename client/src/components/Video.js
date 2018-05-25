import React from 'react';
import './Video.css';

class Video extends React.Component {
    state = {
        open: false,
        currentVideo: -1,
        currentVideoIndex: null,
        maxVideo: 28
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.triggerOpen && !prevState.open) {
            var currentVideo = (prevState.currentVideo + 1) % (prevState.maxVideo + 1);
            return {
                open: true && false,
                currentVideo: currentVideo,
                currentVideoIndex: String('0' + currentVideo).slice(-2),
                maxVideo: prevState.maxVideo
            };
        }
        return null;
    }

    handleVideoStop() {
        this.setState({ open: false });
    }

    render() {
        console.log({
            triggerOpen: this.props.triggerOpen,
            videoOpen: this.state.open,
            currentVideoIndex: this.state.currentVideoIndex
        });
        if (!this.state.open) {
            return null;
        }
        return (
            <video ref="portalMedia" className="video" src={"/video/loop/" + this.state.currentVideoIndex + ".mp4"} type="video/mp4" autoPlay="true"
                   onEnded={this.handleVideoStop.bind(this)}
                   onAbort={this.handleVideoStop.bind(this)}
                   onEmptied={this.handleVideoStop.bind(this)}
                   onError={this.handleVideoStop.bind(this)} />
        );
    }
}

export default Video;