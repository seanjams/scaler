import React from 'react';

class Piano extends React.Component {

  render() {
    const { notes } = this.props;
    return(
      <div className="piano-keys">
        <button onClick={() => this.props.handleClick(0)}
          className={`piano-key white c ${notes[0] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(1)}
          className={`piano-key black ${notes[1] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(2)}
          className={`piano-key white d ${notes[2] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(3)}
          className={`piano-key black ${notes[3] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(4)}
          className={`piano-key white e ${notes[4] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(5)}
          className={`piano-key white f ${notes[5] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(6)}
          className={`piano-key black ${notes[6] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(7)}
          className={`piano-key white g ${notes[7] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(8)}
          className={`piano-key black ${notes[8] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(9)}
          className={`piano-key white a ${notes[9] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(10)}
          className={`piano-key black ${notes[10] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(11)}
          className={`piano-key white b ${notes[11] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(0)}
          className={`piano-key white c ${notes[0] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(1)}
          className={`piano-key black ${notes[1] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(2)}
          className={`piano-key white d ${notes[2] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(3)}
          className={`piano-key black ${notes[3] ? "in-key" : ""}`}></button>
        <button onClick={() => this.props.handleClick(4)}
          className={`piano-key white e ${notes[4] ? "in-key" : ""}`}></button>
      </div>
    );
  }
}

export default Piano;
