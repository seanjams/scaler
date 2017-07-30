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
  }

  handleClick(i) {
    const newNotes = [...this.state.notes];
    newNotes[i] = !this.state.notes[i];
    this.setState({notes: newNotes});
  }

  render() {
    return (
      <div>
        <Clock notes={this.state.notes} handleClick={this.handleClick}/>
        <Piano notes={this.state.notes} handleClick={this.handleClick}/>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});
