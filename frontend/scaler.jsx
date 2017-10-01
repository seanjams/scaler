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
      mute: false,
      modalOpen: true,
      singleNoteMode: false,
      range: 3
    };

    //binders for class functions
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.incrementRange = this.incrementRange.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleSingleNoteMode = this.toggleSingleNoteMode.bind(this);
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
      }, 210);
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

  incrementRange(a) {
    let range = this.state.range + a;
    if (range < -1) {
      range = -1;
    } else if (range > 7) {
      range = 7;
    }
    this.setState({range});
  }

  //turns notes on, only used by piano
  handleKeyDown(e) {
    let idx = Util.keyMap.indexOf(e.key);
    if (idx > 16) {
      const a = idx === 17 ? -1 : 1;
      this.incrementRange(a);
      return;
    }
    if (idx >= 0) {
      this.changeSound(idx, this.state.vol);
    }
  }

  //turns notes off, only used py piano
  handleKeyUp(e) {
    let idx = Util.keyMap.indexOf(e.key);
    if (idx > 15) return;
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

  toggleSingleNoteMode() {
    const singleNoteMode = !this.state.singleNoteMode;
    this.setState({singleNoteMode});
  }

  toggleMute() {
    const mute = !this.state.mute;
    this.setState({mute});
  }

  toggleModal() {
    const modalOpen = !this.state.modalOpen;
    this.setState({modalOpen});
  }

  renderInstructions() {
    if (this.state.modalOpen) {
      return (
        <div id="modal">
          <div id="modal-title">
            <h2>Welcome to Scalar</h2>
            <button id="close-modal" onClick={this.toggleModal}>
              <i id="pattern-left" className="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>
          <div id="modal-body">
            Visualize scales and chords guitar and piano at the same time! Click anywhere to highlight a note, and see it's locations on guitar and piano. Use the selector above the fretboard to access two modes:
            <ul>
              <li>All - highlight notes all over the fretboard</li>
            <li>Pattern - <span id="indent">highlight notes on a slice of the fretboard (adjust left and right with arrow keys)</span></li>
            </ul>
            You can use the keyboard to play sound using the indicated piano keys. Rock on dude!
          </div>
        </div>
      )
    }
  }

  renderPatternShifter() {
    const { singleNoteMode } = this.state;
    const arrowClass = singleNoteMode ? "" : "arrow-off";
    return (
      <div className="pattern-shifter-container">
        <div className="pattern-shifter">
          <button onClick={() => this.incrementRange(-1)} className={arrowClass} disabled={!singleNoteMode}>
            <i id="pattern-left" className="fa fa-chevron-left pattern-arrow" aria-hidden="true"></i>
          </button>
          <button id="mode-selector" onClick={this.toggleSingleNoteMode}>
            <p>{ this.state.singleNoteMode ? "Pattern" : "All" }</p>
          </button>
          <button onClick={() => this.incrementRange(1)} className={arrowClass} disabled={!singleNoteMode}>
            <i id="pattern-right" className="fa fa-chevron-right pattern-arrow" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        { this.renderInstructions() }
        <span className="title">
          <span id="title-author">
            <h1>Scalar</h1>
            <p>by Sean O'Reilly</p>
          </span>
          <div id="links">
            <button id="instructions" onClick={this.toggleModal}>How it Works</button>
            <button onClick={this.toggleMute}>
              <i id="volume-icon" className={`fa fa-volume-${!this.state.mute ? "down" : "off"}`} aria-hidden="true"></i>
            </button>
            <a href="https://github.com/seanjams/Scalar">
              <i id="github-icon" className="fa fa-github-square" aria-hidden="true"></i>
            </a>
            <a href="https://www.linkedin.com/in/seanvoreilly">
              <i id="linkedin-icon" className="fa fa-linkedin-square" aria-hidden="true"></i>
            </a>
          </div>
        </span>
        { this.renderPatternShifter() }
        <Guitar notes={this.state.notes}
                handleKeyUp={this.handleKeyUp}
                handleKeyDown={this.handleKeyDown}
                handleClick={this.handleClick}
                singleNoteMode={this.state.singleNoteMode}
                range={this.state.range}/>
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
