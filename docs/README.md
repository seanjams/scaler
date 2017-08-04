## Scalar

### Background

The vast majority of music we know and love only contains 12 notes. However, the different layouts chosen to represent these notes on instruments are diverse and numerous. Scalar provides a set of musical widgets for visualizing the layouts of musical notes, chords, and scales, on two of the most common melodic instruments, piano and guitar.

### Functionality & MVP

With this set of musical widgets, users will be able to

- [x] Visualize the same set of notes on the piano, guitar, and note clock all at once
- [x] Select these notes by clicking on any of the components
- [x] Select these notes by using the piano-mapped keyboard
- [x] Play the sounds of notes by selecting them on the guitar and piano

In addition, this project will include:

- [x] A short live simulation upon start showing which parts of the app are interactive
- [x] A production Readme

### Wireframes

This will be a single page app that will be divided into 3 sections. the piano component at the bottom will be fully integrated with sound and click/keyboard ability. The guitar component will sit right above the piano component and display 12 frets of a guitar neck, with click-toggle enabled on every note. To the right of the piano and guitar will be a section containing a "Note Clock" which displays the 12 notes in the natural circular fashion, and click-toggle again enabled on every note. Additionally this section will hold a mute button. Below will be text information pertaining to which notes are selected, and which types of keys/modes the selected notes match. Interacting with any of the components changes the state in all 3 sections.

![wireframes](images/wireframe.png)

### Architecture, Technologies

This project will be implemented with the following technologies

- Vanilla JS for key logic
- React for component rendering
- Tone.js for making sounds
- Webpack to bundle the scripts

The components will be contained in four respective files, piano.jsx, guitar.jsx, clock.jsx, and info.jsx. Each component, upon interaction, will handle the selection of notes by altering an array of booleans serving as the local state of the root component. Additionally, these components will trigger sounds from Tone.js.

### Implementation Timeline

**Day 0**: Setup all necessary node modules, get webpack up and running, update webpack.config.js and package.json. Write entry file containing Clock component and render a basic version. Explore Tone.js. Goals for the day:
- [x] get pixels on screen
- [x] get piano on screen and interactive

**Day 1**: Explore and read docs for Web Audio API. Get guitar fretboard up and functional. Goals for the day:
- [x] learn how to make sounds with Web Audio API
- [x] guitar fretboard is clickable

**Day 2**: If Web Audio API is still not up and running, focus on this issue. Then work on info component. Style piano component. Goals for the day:

- [x] all components make sound
- [x] use gradient and advanced css to style piano keys
- [ ] write info utility functions and mute button

**Day 3**: Dedicate this day to styling all components, and smoothing transition details. Notes that are selected and making noise should be obviously represented. Goals for the day:

- [x] Piano and guitar are fully styled
- [x] Start bonus features if possible


**Day 4**: Work on fixing all bugs, console errors, and more style. Finish bonus features if possible.

- [x] project is presentable and bug-free



### Bonus Features

1) I hope to have enough time to include "Key Wheel" component. This was the subject of my mathematical research at UC Davis, and would give the user information about which scales contain the selected notes

2) Additionally, I hope to have a search bar that enables a user to search for scales, chords, and individual notes
