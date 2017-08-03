import React from 'react';
import * as Util from './util';

class Guitar extends React.Component {

  handleClick(i) {
    const { notes } = this.props;
    if (i < 5 && notes[i] && !notes[i+12]) {
      return this.props.handleClick(i+12);
    } else if (notes[i] && notes[i+12]) {
      return this.props.handleClick(i, i+12);
    }
    return this.props.handleClick(i);
  }

  renderFrets(stringName, n) {
    const noteShift = Util.noteNames.indexOf(stringName);
    const newNotes = this.props.notes.slice(0,12);
    this.props.notes.slice(12).forEach((note, i) => (
      newNotes[i] = newNotes[i] || note
    ));
    for (let i = 0; i <= noteShift; i++) {
      let temp = newNotes.shift();
      newNotes.push(temp);
    }
    return newNotes.map((note, i) => (
        <button key={`fret-${i}`}
                className={`fret ${note ? "in-key" : ""} ${Util.noteNames[i + noteShift]}`}
                style={{
                  left: -31 * i * i / 20 + 645 * i / 12,
                  top: i * (n - 2.5) / 4.20
                }}

                onClick={() => this.handleClick((i + 1 + noteShift) % 12)}>
        </button>
    ));
  }

  renderStrings() {
    const strings = ["E", "B", "G", "D", "A", "E"];

    return strings.map((string, i) => (
      <div className={`string string-${i}`}
           key={`string-${i}`}>
        { this.renderFrets(string, i) }
      </div>
    ));

  }

  render() {
    return(
      <div className="guitar-container">
        <div className="guitar"
          onKeyDown={this.props.handleKeyDown}
          onKeyUp={this.props.handleKeyUp}>
          <div className="fretboard">
            { this.renderStrings() }
          </div>
        </div>
      </div>
    );
  }
}

export default Guitar;
