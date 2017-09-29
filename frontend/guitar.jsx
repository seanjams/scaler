import React from 'react';
import * as Util from './util';

class Guitar extends React.Component {

  renderFrets(stringName, n) {
    const noteShift = Util.noteNames.indexOf(stringName);
    const { range } = this.props;

    //map high octave notes on keyboard to guitar
    const newNotes = this.props.notes.slice(0,12);
    this.props.notes.slice(12).forEach((note, i) => (
      newNotes[i] = newNotes[i] || note
    ));

    //rotate notes around string shift
    for (let i = 0; i <= noteShift; i++) {
      let temp = newNotes.shift();
      newNotes.push(temp);
    }

    if (this.props.singleNoteMode) {
      for (let i = 0; i < 12; i++) {
        if (n > 2) {
          if (i < range || i > range + 4) { newNotes[i] = false }
        } else {
          if (i < range + 1 || i > range + 5) { newNotes[i] = false }
        }
      }
    }

    return newNotes.map((note, i) => (
        <button key={`fret-${i}`}
                className={
                  `fret ${note ? "in-key" : ""} ${Util.noteNames[i + 1 + noteShift]}`
                }
                style={{
                  left: -31 * i * i / 20 + 645 * i / 12,
                  top: i * (n - 2.5) / 4.20
                }}

                onClick={() => this.props.handleClick((i + 1 + noteShift) % 12)}>
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
