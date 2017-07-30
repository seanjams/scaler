import React from 'react';
import * as Util from './util';

class Clock extends React.Component {

  renderNotes() {
    const center = { x: 414, y: 150 };
    const scaleRadius = 100;
    const noteRadius = 30;
    return this.props.notes.map((note, i) => (
        <button onClick={() => this.props.handleClick(i)}
                key={`clock-${i}`}
                className={`note ${note ? "in-key" : ""}`}
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
      <div>
        { this.renderNotes() }
      </div>
    );
  }
}

export default Clock;
