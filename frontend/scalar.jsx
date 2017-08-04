import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Piano from './piano';
import Guitar from './guitar';
import * as Util from './util';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // notes: Util.major.concat(Util.major.slice(0,5)),
      notes: Util.none,
      oscillators: [],
      gains: []
      // ready: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.toggleSingleNote = this.toggleSingleNote.bind(this);
  }

  letThereBeSound() {
    const { pianoKeyNames, frequencies } = Util;
    const gains = [];
    const context = new AudioContext();
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
    this.letThereBeSound();
    let i = 0;
    const interval = setInterval(() => {
      i > 0 ? this.changeSound(i-1, 0): null;
      this.changeSound(i, 0.3);
      if (++i === 12) {
        setTimeout(() => this.changeSound(i-1, 0), 200);
        window.clearInterval(interval);
      }
    }, 180);

  }

  changeSound(i, vol) {
    const { notes, gains } = this.state;
    const { context } = gains[i];
    notes[i] = !!vol;
    gains[i].gain
      .linearRampToValueAtTime(vol, context.currentTime + 0.2);
    this.setState({notes, gains});
  }

  // toggleMute() {
  //   const { gains } = this.state;
  //   this.state.notes.forEach((note, i) => {
  //     this.changeSound()
  //   });
  // }

  handleKeyDown(e) {
    e.preventDefault();
    let idx = Util.keyMap.indexOf(e.key);
    if (idx || idx === 0) {
      this.changeSound(idx, 0.3);
    }
  }

  handleKeyUp(e) {
    e.preventDefault();
    let idx = Util.keyMap.indexOf(e.key);
    if (idx || idx === 0) {
      this.changeSound(idx, 0);
    }
  }

  handleClick(i, j) {
    const newNotes = [...this.state.notes];
    const args = Array.from(arguments);
    args.forEach((idx) => (
      newNotes[idx] = !newNotes[idx]
    ));
    this.setState({notes: newNotes});
  }

// add click disabling in return perhaps
//add mute!!

  render() {
    return (
      <div>
      <span className="title">
        <h1>Scalar</h1>
        <span className="links">
          <a href="https://github.com/seanjams/Scalar">
            <i id="github-icon" className="fa fa-github-square" aria-hidden="true"></i>
          </a>
          <a href="#">
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

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();
});
//
