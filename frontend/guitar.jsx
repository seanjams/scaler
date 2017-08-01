import React from 'react';
import * as Util from './util';

class Guitar extends React.Component {

  renderFrets(noteName) {
    const noteShift = Util.noteNames.indexOf(noteName);
    const newNotes = [...this.props.notes];
    for (let i = 0; i < noteShift; i++) {
      let temp = newNotes.shift();
      newNotes.push(temp);
    }
    return newNotes.map((note, i) => (
      <button key={`fret-${i}`}
              className={`fret ${note ? "in-key" : ""}`}
              style={{
                left: 640 * i / 12 + 26.7
              }}
              onClick={() => this.props.handleClick((i + noteShift) % 12)}>
      </button>
    ));
  }

  renderStrings() {
    const strings = ["E", "B", "G", "D", "A", "E"];

    return strings.map((string, i) => (
      <div className="string"
           key={`string-${i}`}>
        { this.renderFrets(string) }
      </div>
    ));

  }

  render() {
    return(
      <div className="fretboard">
        { this.renderStrings() }
      </div>
    );
  }
}

export default Guitar;
