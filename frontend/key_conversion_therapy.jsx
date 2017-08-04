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
      notes: Util.none,
      oscillators: [],
      gains: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.toggleSingleNote = this.toggleSingleNote.bind(this);
  }

  componentDidMount() {
    const { pianoKeyNames, frequencies } = Util;
    const context = new AudioContext();
    const gains = [];
    const oscillators = pianoKeyNames.map((name) => {
      let nextEl = context.createOscillator();
      let nextGain = context.createGain();
      nextEl.connect(nextGain);
      nextGain.connect(context.destination);
      nextGain.gain.value = 0;
      gains.push(nextGain);
      nextEl.frequency.value = frequencies[name];
      nextEl.type = 'square';
      nextEl.start(0);
      return nextEl;
    });
    this.setState({oscillators, gains});
  }

  // toggleSingleNote(e) {
  //   e.preventDefault();
  //   const { notes } = this.state;
  //   let newNotes;
  //   if (notes.length === 12) {
  //     newNotes = notes.concat(notes);
  //   } else {
  //     newNotes = notes.slice(0,12);
  //   }
  //   this.setState({notes: newNotes})
  // }

  handleKeyDown(e) {
    e.preventDefault();
    const newNotes = [...this.state.notes];
    const newGains = [...this.state.gains];
    let idx = Util.keyMap[e.key];
    console.log(e.key);
    if (idx || idx === 0) {
      newNotes[idx] = true;
      const { context } = newGains[idx];
      newGains[idx].gain
        .linearRampToValueAtTime(1, context.currentTime + 0.2);
      this.setState({
        notes: newNotes,
        gains: newGains
      });
    }
  }

  handleKeyUp(e) {
    e.preventDefault();
    const newNotes = [...this.state.notes];
    const newGains = [...this.state.gains];
    let idx = Util.keyMap[e.key];
    if (idx || idx === 0) {
      newNotes[idx] = false;
      const { context } = newGains[idx];
      newGains[idx].gain
        .linearRampToValueAtTime(0, context.currentTime + 0.2);
      this.setState({
        notes: newNotes,
        gains: newGains
      });
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

  render() {

    return (
      <div>
        <h1>Key Conversion Therapy</h1>
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
