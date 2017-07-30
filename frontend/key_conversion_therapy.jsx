import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Piano from './piano';
import * as Util from './util';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Util.none
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyDown(e) {
    e.preventDefault();
    const newNotes = [...this.state.notes];
    const idx = Util.keyMap[e.keyCode];
    newNotes[idx] = true;
    this.setState({notes: newNotes});
  }

  handleKeyUp(e) {
    e.preventDefault();
    const newNotes = [...this.state.notes];
    const idx = Util.keyMap[e.keyCode];
    newNotes[idx] = false;
    this.setState({notes: newNotes});
  }

  handleClick(i) {
    const newNotes = [...this.state.notes];
    newNotes[i] = !this.state.notes[i];
    // var synth = new Tone.Synth();
    // synth.toMaster();
    // synth.triggerAttack("C4", time);
    // synth.triggerRelease(time + 0.25);
    this.setState({notes: newNotes});

  }

  render() {
    return (
      <div>
        <Clock notes={this.state.notes} handleClick={this.handleClick}/>
        <Piano notes={this.state.notes}
               handleKeyUp={this.handleKeyUp}
               handleKeyDown={this.handleKeyDown}
               handleClick={this.handleClick}/>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});
