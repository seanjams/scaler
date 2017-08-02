import Octavian from 'octavian';

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
  true
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
  false
];

export const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];

export const keyMap = {
  90: 0,
  83: 1,
  88: 2,
  68: 3,
  67: 4,
  86: 5,
  71: 6,
  66: 7,
  72: 8,
  78: 9,
  74: 10,
  77: 11,
  188: 12,
  76: 13,
  190: 14,
  186: 15,
  191: 16
};

export const pianoKeyNames = [
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5"
  // "F5",
  // "F#5",
  // "G5",
  // "G#5",
  // "A5",
  // "A#5",
  // "B5"
];

export const frequencies = {
  "C4": new Octavian.Note("C4").frequency,
  "C#4": new Octavian.Note("C#4").frequency,
  "D4": new Octavian.Note("D4").frequency,
  "D#4": new Octavian.Note("D#4").frequency,
  "E4": new Octavian.Note("E4").frequency,
  "F4": new Octavian.Note("F4").frequency,
  "F#4": new Octavian.Note("F#4").frequency,
  "G4": new Octavian.Note("G4").frequency,
  "G#4": new Octavian.Note("G#4").frequency,
  "A4": new Octavian.Note("A4").frequency,
  "A#4": new Octavian.Note("A#4").frequency,
  "B4": new Octavian.Note("B4").frequency,
  "C5": new Octavian.Note("C5").frequency,
  "C#5": new Octavian.Note("C#5").frequency,
  "D5": new Octavian.Note("D5").frequency,
  "D#5": new Octavian.Note("D#5").frequency,
  "E5": new Octavian.Note("E5").frequency
  // "F5": new Octavian.Note("F5").frequency,
  // "F#5": new Octavian.Note("F#5").frequency,
  // "G5": new Octavian.Note("G5").frequency,
  // "G#5": new Octavian.Note("G#5").frequency,
  // "A5": new Octavian.Note("A5").frequency,
  // "A#5": new Octavian.Note("A#5").frequency,
  // "B5": new Octavian.Note("B5").frequency
}
