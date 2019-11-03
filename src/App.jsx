/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import "./App.css";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = event => {
    // from constructor:(bpm)
    const bpm = event.target.value;
    this.setState({ bpm });
  };

  startStop = () => {
    // from constructor: (playing)
    this.click1.play();
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className='container'>
        <div className='bpm-slider'>
          <div>{bpm} BPM</div>
          <input
            type='range'
            min='60'
            max='240'
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        {/* Add the onClick handler: */}
        <button onClick={this.startStop}>{playing ? "Stop" : "Start"}</button>
      </div>
    );
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      //from constructor: (count)
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  startStop = () => {
    //from constructor: (playing)
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };
}
export default App;
