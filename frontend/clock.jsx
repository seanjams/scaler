import React from 'react';
import * as Util from './util';

class Clock extends React.Component {

  clockNotes() {
    const newNotes = this.props.notes.slice(0,12);
    this.props.notes.slice(12).forEach((note, i) => (
      newNotes[i] = newNotes[i] || note
    ));
    return newNotes;
  }

  // handleClick(i) {
  //   const { notes } = this.props;
  //   if (i < 5 && notes[i] && !notes[i+12]) {
  //     return this.props.handleClick(i+12);
  //   } else if (notes[i] && notes[i+12]) {
  //     return this.props.handleClick(i, i+12);
  //   }
  //   return this.props.handleClick(i);
  // }

  renderNotes() {
    const center = { x: 125, y: 125 };
    const scaleRadius = 100;
    const newNotes = this.clockNotes();
    return newNotes.slice(0,12).map((note, i) => (
      <button onClick={() => this.props.handleClick(i)}
              key={`clock-${i}`}
              className={`note ${note ? "in-key" : ""} ${Util.noteNames[i]}`}
              onKeyDown={this.props.handleKeyDown}
              onKeyUp={this.props.handleKeyUp}
              style={{
                top:
                  center.y - scaleRadius * Math.cos(i * 2 * Math.PI / 12),
                left:
                  center.x + scaleRadius * Math.sin(i * 2 * Math.PI / 12)
              }}>
              {Util.noteNames[i]}
      </button>
    ));
  }

  render() {
    return(
      <div className="clock">
        { this.renderNotes() }
      </div>
    );
  }
}

export default Clock;
