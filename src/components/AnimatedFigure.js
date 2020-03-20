import React  from "react";
import GifPlayer from "react-gif-player";
import styled from "styled-components";
import ReactHowler from "react-howler";
import Loader from "../Assets/TTSTurntable.png";

//https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.15/howler.js
import raf from "raf"; // requestAnimationFrame polyfill

const FigureContainer = styled.div`
`;

export default class AnimatedFigure extends React.Component {

  // on click, toggle the state of the animation AND the sound
  constructor(props) {
    super(props);
    this.state = {
      playing: this.props.playOnLoad,
      loading : false,
      sampleloading: true,
    };
  }

    // BT THIS IS NOT WORKING
    HowlerhandleOnLoad = () => {
    console.log("sample loaded");
    this.setState({sampleloading: false });
  };
  HowlerhandleOnStop = () => {
    this.setState({playing: false});
  };
  HowlerhandleOnEnd = () => {
    if (!this.props.loop) {
      this.setState({playing: false});
      this.pauseGif();
    }
  };
  HowlerhandleOnPlay = () => {
    this.renderSeekPos();
  };
  renderSeekPos = () => {
    this.setState({seek: this.player.seek()});
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  };

  GifPlayerHandlePlayToggle = () => {
    const newState = !this.state.playing;

    console.log(`${this.props.animation} GifPlayerHandlePlayToggle -> ${
      this.state.playing
    } -> ${newState}`);
    this.setState({ playing: newState });
  };


  componentWillReceiveProps(nextProps) {
    if (this.props.playOnLoad !== nextProps.playOnLoad) {
      this.GifPlayerHandlePlayToggle();

      // FIXME THIS SHOULD BE CONDITIONAL
      if (this.props.playOnLoad == false) {
        this.pauseGif();
      } else {
          // play the damn gif
          this.setState({ playing: true });
      }
    }
  }

  render() {

    // return this.state.loading ? (
    //   <div className="loading">
    //     <img id="spinner" alt="" src={Loader} />
    //   </div>
    // ) : (
    return (
      <div>

        <ReactHowler
          src={this.props.sample} // src="http://goldfirestudios.com/proj/howlerjs/sound.ogg"
          playing={this.props.loop ? true : this.state.playing}
          volume={this.props.volume || 1}
          mute={!this.state.playing}
          loop={this.props.loop}
         preload={true}
          onLoad={this.HowlerhandleOnLoad}
          onPlay={this.HowlerhandleOnPlay}
          onStop={this.HowlerhandleOnStop}
          onEnd={this.HowlerhandleOnEnd}
          ref={ref => (this.player = ref)}
        />
        <GifPlayer
        //  gif={this.state.loading ? Loader : this.props.animation }
         gif={this.state.sampleloading ? Loader : (this.state.playing ? this.props.animation : this.props.stillFrame)}
          still={this.props.stillFrame}
          width={this.props.width}
          onClick={this.GifPlayerHandlePlayToggle}
          pauseRef={pause => (this.pauseGif = pause)}
          autoplay={this.props.playOnLoad}
        />
      </div>
    )
  }
    
  
}