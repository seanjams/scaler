import React from 'react';
import * as Util from './util';

class Piano extends React.Component {

  renderKeys() {
    const blackKeys = [1,3,6,8,10];
    return this.props.notes.map((note, i) => {
      return (
        <button onClick={() => this.props.handleClick(i)}
          key={`piano-key-${i}`}
          className={`
            piano-key
            ${blackKeys.includes(i) ? "black" : "white"}
            ${note ? "in-key" : ""}
            ${Util.noteNames[i]}`}></button>
        );
    });
  }

  render() {
    const { notes } = this.props;
    return(
      <div className="piano-keys">
        { this.renderKeys() }
        { this.renderKeys() }
      </div>
    );
  }
}

export default Piano;
