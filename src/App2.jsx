/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import click1 from "./click1.wav";
import click2 from "./click1.wav";
import "./App.css";

class App2 extends Component {
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
    const bpm = event.target.value;
    this.setState({ bpm });
  };

  //onClick function for the button element so we can play a beat
  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      //start timer with the current bpm
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

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
    // Keep track of which beat were on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  //Handling BPM Changes
  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, 60 / bpm) * 1000;
      //Set the new BPm , and reset the beat counter:
      this.setState({
        count: 0,
        bpm
      });
    } else {
      //otherwise just update the bPm:
      this.setState({ bpm });
    }
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className='container'>
        <div className='bpm-slider'>
          <h2>Metronome</h2>
          <div>
            {bpm}BPM
            <input
              type='range'
              min='60'
              count='0'
              max='240'
              value={bpm}
              onChange={this.handleBpmChange}
            />
          </div>
          <button onClick={this.startStop}>{playing ? "Stop" : "Start"}</button>
        </div>
      </div>
    );
  }
}

export default App2;
