# Scalar

For best compatibility, use Chrome or Firefox:

[Live Link](http://www.seanoreilly.co/Scalar/)

Scaler is a web application built in Javascript/React where guitarists and pianists can both hear and visualize musical notes, chords and scales on each instrument simultaneously.

## Features

- Interactive piano, guitar neck, and note selector that allows users to click on notes they want to see
- Note hues are assigned according to the circle of fifths, which makes "close" notes be "close" in color
- Keyboard sounds built with Web Audio API oscillators

## Programming Languages
- JavaScript (es6)

### Technologies
- React.js
- Web Audio API
- Octavian.js

### Complete Interactivity

Click around, build your own scales. Know a song on piano? Figure out the guitar chords or vice versa! Use the keyboard to hear each note and interval. Sounds were achieved the fun way, with Web Audio API oscillators.

![keys_demo](/images/keys_demo.gif)

### Coding challenges

Laying button elements across a fretboard ended up being no simple task. Of course no one wants to explicitly code 72 different elements with different positions, so we use math! Due to the nature of fretboards getting wider and more compact as we move down the neck, we use the index of the notes as a variable and apply a mild parabolic spacing and linear widening to the top and left properties of each button. This allows each button to sit right on top of the string and fret its supposed to represent.

```jsx
return newNotes.map((note, i) => (
    <button key={`fret-${i}`}
            className={
              `fret ${note ? "in-key" : ""} ${Util.noteNames[i + 1 + noteShift]}`
            }
            style={{
              left: -31 * i * i / 20 + 645 * i / 12,
              top: i * (n - 2.5) / 4.20
            }}
            onClick={() => this.props.handleClick((i + 1 + noteShift) % 12)}>
    </button>
));
```

In order to make sound, we create Web Audio API oscillators with the frequencies of our notes in a function called letThereBeSound(), and save these to our state. Once an oscillator has stopped, it cannot start again, so we save corresponding gain nodes to our state for each note to change the volumes.

```jsx
componentDidMount() {
  //intialize state and oscillator nodes for sound
  this.letThereBeSound();
  let i = 0;

  setTimeout(() => {
    let i = 0;
    const interval = setInterval(() => {
      //sound current note
      this.changeSound(i, this.state.vol, 0.13)
      //shut off current note after duration of note and increment counter
      setTimeout(() => {
        this.changeSound(i, 0, 0.07);
        ++i;
      }, 130);

      //clear interval if last note
      if (i === 11) {
        window.clearInterval(interval);
        this.setState({notes: Util.none});
      }
    }, 210);
  }, 500);
}

changeSound(i, volume, attack = 0.1) {
  const { notes, gains } = this.state;
  const vol = this.state.mute ? 0 : volume;
  const { context } = gains[i];
  notes[i] = !!volume;
  gains[i].gain
    .linearRampToValueAtTime(vol, context.currentTime + attack);
  this.setState({notes, gains});
}

handleKeyDown(e) {
  let idx = Util.keyMap.indexOf(e.key);
  if (idx > 16) {
    const a = idx === 17 ? -1 : 1;
    this.incrementRange(a);
    return;
  }
  if (idx >= 0) {
    this.changeSound(idx, this.state.vol);
  }
}
```

## In the making...

#### Text Info

I am working on generating text information pertaining to each selection of notes. If a user has selected multiple notes, this widget will display what chords or scales can be made from them.

#### Key Wheel

I am also working on a visual network of musical "keys" (groups of seven notes). This network will function similar to the guitar fretboard, and nodes will become active based on the total inclusion of user-selected notes in that key.
