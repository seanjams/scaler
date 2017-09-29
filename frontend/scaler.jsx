import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Piano from './piano';
import Guitar from './guitar';
import * as Util from './util';

const AudioContext = window.AudioContext || window.webkitAudioContext;

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Util.none,
      oscillators: [],
      gains: [],
      vol: 0.3,
      mute: false
    };

    //binders for class functions
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  letThereBeSound() {
    const { pianoKeyNames, frequencies } = Util;
    const gains = [];

    //create Web Audio API context
    const context = new AudioContext();

    //create oscillators and connect them to new gain nodes
    //intiliaze volume to 0 as and frequency to actual note frequencies
    const oscillators = Util.pianoKeyNames.map((name) => {
      let nextEl = context.createOscillator();
      let nextGain = context.createGain();
      nextEl.connect(nextGain);
      nextGain.connect(context.destination);
      nextGain.gain.value = 0;
      gains.push(nextGain);
      nextEl.frequency.value = frequencies[name];
      nextEl.type = 'triangle';
      nextEl.start(0);
      return nextEl;
    });
    this.setState({oscillators, gains});
    return oscillators;
  }

  componentDidMount() {
    //intialize state and oscillator nodes for sound
    this.letThereBeSound();
    let i = 0;

    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        //sound current note
        this.changeSound(i, this.state.vol, 0.13)
        //shut off current note after duration of note and increment counter
        setTimeout(() => {
          this.changeSound(i, 0, 0.07);
          ++i;
        }, 130);

        //clear interval if last note
        if (i === 11) {
          window.clearInterval(interval);
          this.setState({notes: Util.none});
        }
      }, 200);
    }, 500);
  }

  //changes note i to the specified volume vol
  changeSound(i, volume, attack = 0.1) {
    const { notes, gains } = this.state;
    const vol = this.state.mute ? 0 : volume;
    const { context } = gains[i];
    notes[i] = !!volume;
    gains[i].gain
      .linearRampToValueAtTime(vol, context.currentTime + attack);
    this.setState({notes, gains});
  }

  //turns notes on, only used by piano
  handleKeyDown(e) {
    let idx = Util.keyMap.indexOf(e.key);
    if (idx >= 0) {
      this.changeSound(idx, this.state.vol);
    }
  }

  //turns notes off, only used py piano
  handleKeyUp(e) {
    let idx = Util.keyMap.indexOf(e.key);
    if (idx >= 0) {
      this.changeSound(idx, 0);
    }
  }

  //turns notes on and then off shortly after
  handleClick(...args) {
    const newNotes = [...this.state.notes];
    const [i,j] = args;

    args.forEach(idx => (
      newNotes[idx] = !newNotes[idx]
    ));
    this.changeSound(i, this.state.vol);
    setTimeout(() => {
      this.changeSound(i, 0);
      this.setState({notes: newNotes});
    }, 200);
  }

  toggleMute() {
    const mute = !this.state.mute;
    this.setState({mute});
  }

  render() {
    return (
      <div className="container">
        <span className="title">
          <h1>Scalar</h1>
          <p>by Sean O'Reilly</p>
          <span className="links">
            <button onClick={this.toggleMute}>
              <i id="volume-icon" className={`fa fa-volume-${
                  !this.state.mute ? "down" : "off"
                }`}
                aria-hidden="true"></i>
            </button>
            <a href="https://github.com/seanjams/Scalar">
              <i id="github-icon" className="fa fa-github-square" aria-hidden="true"></i>
            </a>
            <a href="https://www.linkedin.com/in/seanvoreilly">
              <i id="linkedin-icon" className="fa fa-linkedin-square" aria-hidden="true"></i>
            </a>
          </span>
        </span>
        <Guitar notes={this.state.notes}
                handleKeyUp={this.handleKeyUp}
                handleKeyDown={this.handleKeyDown}
                handleClick={this.handleClick}/>
        <div className="piano-clock-container">
          <Piano notes={this.state.notes}
                 handleKeyUp={this.handleKeyUp}
                 handleKeyDown={this.handleKeyDown}
                 handleClick={this.handleClick}/>
          <Clock notes={this.state.notes}
                 handleClick={this.handleClick}
                 handleKeyUp={this.handleKeyUp}
                 handleKeyDown={this.handleKeyDown}/>
        </div>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);

  //piano doesn't exist until DOM is rendered
  const piano = document.getElementById("piano-key-1");

  //cannot focus away from piano, allows keys to always sound
  root.onclick = e => piano.focus();
  piano.focus();
});
