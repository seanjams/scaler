# Scalar

Scalar is a web application built in Javascript/React where guitarists and pianists can both hear and visualize musical notes, chords and scales on each instrument simultaneously.

## Features

- Interactive piano, guitar neck, and note selector that allows users to click on notes they want to see
- Notes hues are assigned according to the circle of fifths, which makes "close" notes be "close" in color
- Keyboard sounds built with Web Audio API oscillators

## Programming Languages
- JavaScript (es6)

### Technologies
- React.js
- Web Audio API
- Octavian.js

### Complete Interactivity

Click around, build your own scales. Know a song on piano? Figure out the guitar chords or vice versa!

![click_demo](/images/click_demo.gif)

### Hear your Scales

Use the keyboard to hear each note and interval with We Audio API oscillators.

![keys_demo](/images/keys_demo.gif)

## In the making...

#### Text Info

I am working on generating text information pertaining to each selection of notes. If a user has selected multiple notes, this widget will display what chords or scales can be made from them.

#### Key Wheel

I am also working on a visual network of musical "keys" (groups of seven notes). This network will function similar to the guitar fretboard, and nodes will become active based on the total inclusion of user-selected notes in that key.
