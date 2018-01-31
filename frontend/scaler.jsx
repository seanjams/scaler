import React from "react";
import ReactDOM from "react-dom";
import Tone from "tone";
import Clock from "./clock";
import Piano from "./piano";
import Guitar from "./guitar";
import * as Util from "./util";

const AudioContext = window.AudioContext || window.webkitAudioContext;

class Root extends React.Component {
	constructor(props) {
		super(props);

		const synth = new Tone.PolySynth(10, Tone.Synth).toMaster();
		synth.set(Util.synthOpts);
		this.state = {
			notes: Util.none,
			synth,
			vol: 0.5,
			modalOpen: true,
			singleNoteMode: false,
			range: 3,
		};

		//binders for class functions
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.incrementRange = this.incrementRange.bind(this);
		this.toggleMute = this.toggleMute.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleSingleNoteMode = this.toggleSingleNoteMode.bind(this);
	}

	// componentDidMount() {
	// 	//intialize state and oscillator nodes for sound
	// 	this.letThereBeSound();
	// 	let i = 0;

	// 	setTimeout(() => {
	// 		let i = 0;
	// 		const interval = setInterval(() => {
	// 			//sound current note
	// 			this.changeSound(i, this.state.vol, 0.13);
	// 			//shut off current note after duration of note and increment counter
	// 			setTimeout(() => {
	// 				this.changeSound(i, 0, 0.07);
	// 				++i;
	// 			}, 130);

	// 			//clear interval if last note
	// 			if (i === 11) {
	// 				window.clearInterval(interval);
	// 				this.setState({ notes: Util.none });
	// 			}
	// 		}, 210);
	// 	}, 500);
	// }

	incrementRange(a) {
		let range = this.state.range + a;
		if (-1 <= range <= 7) {
			this.setState({ range });
		}
	}

	//turns notes on, only used by piano
	handleKeyDown(e) {
		const { synth, vol, notes } = this.state;
		let idx = Util.keyMap.indexOf(e.key);
		if (idx > 16) {
			this.incrementRange(idx === 17 ? -1 : 1);
		} else if (idx >= 0) {
			if (notes[idx]) return;
			const newNotes = [...notes];
			newNotes[idx] = true;
			const freq = Tone.Frequency().midiToFrequency(60 + idx);
			synth.triggerAttack(freq, undefined, vol);
			this.setState({ notes: newNotes });
		}
	}

	//turns notes off, only used py piano
	handleKeyUp(e) {
		const { synth, notes } = this.state;
		let idx = Util.keyMap.indexOf(e.key);
		if (idx > 16) return;
		if (idx >= 0) {
			const newNotes = [...notes];
			newNotes[idx] = false;
			const freq = Tone.Frequency().midiToFrequency(60 + idx);
			synth.triggerRelease(freq);
			this.setState({ notes: newNotes });
		}
	}

	//turns notes on and then off shortly after
	handleClick(i) {
		const { synth, vol } = this.state;
		const newNotes = [...this.state.notes];
		newNotes[i] = !newNotes[i];
		const freq = Tone.Frequency().midiToFrequency(60 + i);
		synth.triggerAttackRelease(freq, "8n", undefined, vol);
		this.setState({ notes: newNotes });
	}

	toggleSingleNoteMode() {
		const singleNoteMode = !this.state.singleNoteMode;
		this.setState({ singleNoteMode });
	}

	toggleMute() {
		const vol = this.state.vol > 0 ? 0 : 0.5;
		this.setState({ vol });
	}

	toggleModal() {
		const modalOpen = !this.state.modalOpen;
		this.setState({ modalOpen });
	}

	renderInstructions() {
		if (this.state.modalOpen) {
			return (
				<div id="modal">
					<div id="modal-title">
						<h2>Welcome to Scalar</h2>
						<button id="close-modal" onClick={this.toggleModal}>
							<i
								id="pattern-left"
								className="fa fa-window-close"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div id="modal-body">
						Visualize scales and chords guitar and piano at the same time! Click
						anywhere to highlight a note, and see it's locations on guitar and
						piano. Use the selector above the fretboard to access two modes:
						<ul>
							<li>All - highlight notes all over the fretboard</li>
							<li>
								Pattern -{" "}
								<span id="indent">
									highlight notes on a slice of the fretboard (adjust left and
									right with arrow keys)
								</span>
							</li>
						</ul>
						You can use the keyboard to play sound using the indicated piano
						keys. Rock on dude!
					</div>
				</div>
			);
		}
	}

	renderPatternShifter() {
		const { singleNoteMode } = this.state;
		const arrowClass = singleNoteMode ? "" : "arrow-off";
		return (
			<div className="pattern-shifter-container">
				<div className="pattern-shifter">
					<button
						onClick={() => this.incrementRange(-1)}
						className={arrowClass}
						disabled={!singleNoteMode}
					>
						<i
							id="pattern-left"
							className="fa fa-chevron-left pattern-arrow"
							aria-hidden="true"
						/>
					</button>
					<button id="mode-selector" onClick={this.toggleSingleNoteMode}>
						<p>{this.state.singleNoteMode ? "Pattern" : "All"}</p>
					</button>
					<button
						onClick={() => this.incrementRange(1)}
						className={arrowClass}
						disabled={!singleNoteMode}
					>
						<i
							id="pattern-right"
							className="fa fa-chevron-right pattern-arrow"
							aria-hidden="true"
						/>
					</button>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				{this.renderInstructions()}
				<span className="title">
					<span id="title-author">
						<h1>Scalar</h1>
						<p>by Sean O'Reilly</p>
					</span>
					<div id="links">
						<button id="instructions" onClick={this.toggleModal}>
							How it Works
						</button>
						<button onClick={this.toggleMute}>
							<i
								id="volume-icon"
								className={`fa fa-volume-${!this.state.mute ? "down" : "off"}`}
								aria-hidden="true"
							/>
						</button>
						<a href="https://github.com/seanjams/Scalar">
							<i
								id="github-icon"
								className="fa fa-github-square"
								aria-hidden="true"
							/>
						</a>
						<a href="https://www.linkedin.com/in/seanvoreilly">
							<i
								id="linkedin-icon"
								className="fa fa-linkedin-square"
								aria-hidden="true"
							/>
						</a>
					</div>
				</span>
				{this.renderPatternShifter()}
				<Guitar
					notes={this.state.notes}
					handleKeyUp={this.handleKeyUp}
					handleKeyDown={this.handleKeyDown}
					handleClick={this.handleClick}
					singleNoteMode={this.state.singleNoteMode}
					range={this.state.range}
				/>
				<div className="piano-clock-container">
					<Piano
						notes={this.state.notes}
						handleKeyUp={this.handleKeyUp}
						handleKeyDown={this.handleKeyDown}
						handleClick={this.handleClick}
					/>
					<Clock
						notes={this.state.notes}
						handleClick={this.handleClick}
						handleKeyUp={this.handleKeyUp}
						handleKeyDown={this.handleKeyDown}
					/>
				</div>
			</div>
		);
	}
}

window.addEventListener("load", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root />, root);

	//piano doesn't exist until DOM is rendered
	const piano = document.getElementById("piano-key-1");

	//cannot focus away from piano, allows keys to always sound
	root.onclick = e => piano.focus();
	piano.focus();
});
