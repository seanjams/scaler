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
  false,
  false,
  false,
  false,
  false,
  false
];

export const noteNames = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B"
];

export const oldKeyMap = {
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

export const keyMap = {
  "z": 0,
  "s": 1,
  "x": 2,
  "d": 3,
  "c": 4,
  "v": 5,
  "g": 6,
  "b": 7,
  "h": 8,
  "n": 9,
  "j": 10,
  "m": 11,
  ",": 12,
  "l": 13,
  ".": 14,
  ";": 15,
  "/": 16
};

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
  // "F5",
  // "Gb5",
  // "G5",
  // "Ab5",
  // "A5",
  // "Bb5",
  // "B5"
];

export const frequencies = {
  "C4": new Octavian.Note("C4").frequency,
  "Db4": new Octavian.Note("Db4").frequency,
  "D4": new Octavian.Note("D4").frequency,
  "Eb4": new Octavian.Note("Eb4").frequency,
  "E4": new Octavian.Note("E4").frequency,
  "F4": new Octavian.Note("F4").frequency,
  "Gb4": new Octavian.Note("Gb4").frequency,
  "G4": new Octavian.Note("G4").frequency,
  "Ab4": new Octavian.Note("Ab4").frequency,
  "A4": new Octavian.Note("A4").frequency,
  "Bb4": new Octavian.Note("Bb4").frequency,
  "B4": new Octavian.Note("B4").frequency,
  "C5": new Octavian.Note("C5").frequency,
  "Db5": new Octavian.Note("Db5").frequency,
  "D5": new Octavian.Note("D5").frequency,
  "Eb5": new Octavian.Note("Eb5").frequency,
  "E5": new Octavian.Note("E5").frequency,
  "F5": new Octavian.Note("F5").frequency,
  "Gb5": new Octavian.Note("Gb5").frequency,
  "G5": new Octavian.Note("G5").frequency,
  "Ab5": new Octavian.Note("Ab5").frequency,
  "A5": new Octavian.Note("A5").frequency,
  "Bb5": new Octavian.Note("Bb5").frequency,
  "B5": new Octavian.Note("B5").frequency
}
