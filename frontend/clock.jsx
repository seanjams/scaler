import React from 'react';

class Clock extends React.Component {

  renderNotes() {
    const center = { x: 200, y: 200 };
    const scaleRadius = 100;
    const noteRadius = 30;
    return this.props.notes.map((note, i) => (
        <button onClick={() => this.props.handleClick(i)}
                key={`${i}`}
                className={`note ${note ? "in-key" : ""}`}
                style={{
                  top:
                    center.y - scaleRadius * Math.cos(i * 2 * Math.PI / 12),
                  left:
                    center.x + scaleRadius * Math.sin(i * 2 * Math.PI / 12)
                }}>
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
