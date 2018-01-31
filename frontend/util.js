import Octavian from "octavian";

export const major = [
	true,
	false,
	true,
	false,
	true,
	true,
	false,
	true,
	false,
	true,
	false,
	true,
];

export const none = [
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
];

export const noteNames = [
	"C",
	"D♭",
	"D",
	"E♭",
	"E",
	"F",
	"G♭",
	"G",
	"A♭",
	"A",
	"B♭",
	"B",
	"C",
	"D♭",
	"D",
	"E♭",
	"E",
	"F",
	"G♭",
	"G",
	"A♭",
	"A",
	"B♭",
	"B",
];

export const keyMap = [
	"a",
	"w",
	"s",
	"e",
	"d",
	"f",
	"t",
	"g",
	"y",
	"h",
	"u",
	"j",
	"k",
	"o",
	"l",
	"p",
	";",
	"ArrowLeft",
	"ArrowRight",
];

export const pianoKeyNames = [
	"C4",
	"Db4",
	"D4",
	"Eb4",
	"E4",
	"F4",
	"Gb4",
	"G4",
	"Ab4",
	"A4",
	"Bb4",
	"B4",
	"C5",
	"Db5",
	"D5",
	"Eb5",
	"E5",
];

export const frequencies = {
	C4: new Octavian.Note("C4").frequency,
	Db4: new Octavian.Note("Db4").frequency,
	D4: new Octavian.Note("D4").frequency,
	Eb4: new Octavian.Note("Eb4").frequency,
	E4: new Octavian.Note("E4").frequency,
	F4: new Octavian.Note("F4").frequency,
	Gb4: new Octavian.Note("Gb4").frequency,
	G4: new Octavian.Note("G4").frequency,
	Ab4: new Octavian.Note("Ab4").frequency,
	A4: new Octavian.Note("A4").frequency,
	Bb4: new Octavian.Note("Bb4").frequency,
	B4: new Octavian.Note("B4").frequency,
	C5: new Octavian.Note("C5").frequency,
	Db5: new Octavian.Note("Db5").frequency,
	D5: new Octavian.Note("D5").frequency,
	Eb5: new Octavian.Note("Eb5").frequency,
	E5: new Octavian.Note("E5").frequency,
	F5: new Octavian.Note("F5").frequency,
	Gb5: new Octavian.Note("Gb5").frequency,
	G5: new Octavian.Note("G5").frequency,
	Ab5: new Octavian.Note("Ab5").frequency,
	A5: new Octavian.Note("A5").frequency,
	Bb5: new Octavian.Note("Bb5").frequency,
	B5: new Octavian.Note("B5").frequency,
};

export const synthOpts = {};

//modular click function logic
//if i am clicked and my octave isnt, click my octave
//if i am clicked and my octave is clicked, unclick us both
//if neither of us are clicked, click me only

// handleClick(i) {
//   const { notes } = this.props;
//   if (i < 5 && notes[i] && !notes[i+12]) {
//     return this.props.handleClick(i+12);
//   } else if (notes[i] && notes[i+12]) {
//     return this.props.handleClick(i, i+12);
//   }
//   return this.props.handleClick(i);
// }
