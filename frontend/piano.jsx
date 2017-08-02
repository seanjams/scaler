import React from 'react';
import * as Util from './util';

class Piano extends React.Component {


  renderKeys(octave) {
    const blackKeys = [1,3,6,8,10];
    const noteWrap = this.props.notes.concat(this.props.notes.slice(0,5));
    return noteWrap.map((note, i) => {
      return (
        <button onClick={() => this.props.handleClick(i)}
          onKeyDown={this.props.handleKeyDown}
          onKeyUp={this.props.handleKeyUp}
          key={`piano-key-${i}`}
          className={
            `piano-key
            ${blackKeys.includes(i % 12) ? "black" : "white"}
            ${note ? "in-key" : ""}
            ${Util.noteNames[i % 12]}`}></button>
        );
    });
  }

  render() {
    return(
      <div className="piano-keys">
        { this.renderKeys() }
      </div>
    );
  }
}

export default Piano;
