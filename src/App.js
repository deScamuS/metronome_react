/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";

import click1 from "./click1.wav";
import click2 from "./click2.wav";

export default class App extends Component {
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
  //function for our input BPM change:
  handleBpmChange = event => {
    const bpm = event.target.value;
    if (this.state.playing) {
      //stop the old timer and start a new one:
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      //set the new BPM, and reset the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      //otherwise just update BPM
      this.setState({ bpm });
    }
  };
  //button funcion to start/stop:
  startStop = () => {
    if (this.state.playing) {
      //stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      //start the timer with the current BPM :
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true
          //play a click immediately after 'setState finishes)
        },
        this.playCLick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state; //deconstructuring
    //first beat will be different:

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };
  render() {
    //deconstructuring
    const { playing, bpm } = this.state;

    return (
     
      <div className="App">
        <div className="bpm-slider">
          <div><h2>{bpm} BPM</h2></div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <Button variant="outlined" color="secondary" onClick={this.startStop}>
          {playing ? "Stop" : "Start"}
        </Button>
          </div>
         
    );
  }
}
