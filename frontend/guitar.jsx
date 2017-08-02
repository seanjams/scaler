import React from 'react';
import * as Util from './util';

class Guitar extends React.Component {

  renderFrets(stringName, n) {
    // To adjust notes, change noteShift in for loop and onClick
    const noteShift = Util.noteNames.indexOf(stringName);
    const newNotes = [...this.props.notes];
    for (let i = 0; i <= noteShift; i++) {
      let temp = newNotes.shift();
      newNotes.push(temp);
    }
    // top:  (n - 2.5)/i
    return newNotes.map((note, i) => (
      <button key={`fret-${i}`}
              className={`fret ${note ? "in-key" : ""}`}
              style={{
                left: -1.55 * i * i + 645 * i / 12,
                top: i * (n - 2.5) / 4.20
              }}
              onClick={() => this.props.handleClick((i + noteShift + 1) % 12)}>
      </button>
    ));
  }

  renderStrings() {
    const strings = ["E", "B", "G", "D", "A", "E"];

    return strings.map((string, i) => (
      <div className="string"
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
