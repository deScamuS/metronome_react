1) loading sounds [Webpack, JS]
initializing state in React
using arrow functions to bind class methods
interval timers in JS
how functional setState works, as well as plain setState
how to trigger an action after state is set
input components + handling changes [React]




2) Render the Metronome UI
I like to take little incremental steps as I build out an app. That way I can always hit Save and see the app work, and if it’s broken, I know what I changed, so I can go back and fix it.

3) Here’s the next little step: render the metronome’s BPM (beats per minute) slider, and a button, with some static data.

4) --Won’t be able to change anything yet, because we didn’t implement the onChange handler for the input control. It’s stuck at 100 (the value={bpm}).

5) Initialize the State
The metronome’s BPM and whether it is “on” or “off” are good candidates to put in React’s state, so we’ll initialize state in the constructor and then use those variables in the render function:

6)Even though we’ve introduced state, the app is never changing that state, so none of the controls will work yet. But it should still render with no errors. 

7)Update the BPM
To make the slider work, we’ll add a handler function called handleBpmChange to the class, and pass it as the onChange prop to the input, like this:

8)Now you should be able to drag the slider and watch the BPM change.

This naming convention of “handleX” and “onX” for event handlers is common in the React world. Name things this way in your own code, and you’ll always know whether a prop is a callback function or just regular data. Plus, it’ll be easy to tell which functions are handlers and which aren’t.

9)Loading the Audio Files
Let’s work on getting the “clicks” playing. First we need to import some sounds, and Webpack can do this for us by adding a couple import statements at the top of

10)Then in the constructor, we will create two Audio objects with those files, which we’ll then be able to trigger.


11)Testing Audio Playback
Add a startStop function to play a sound, and wire it up to call it from the button’s onClick handler:
Click the button a few times. It should play a “click”.
Starting and Stopping the Timer
Now let’s get the timer working, so this thing can actually play a beat. Here’s the new code (replace startStop with this):

12) Here’s how this works:

If the metronome is playing, stop it by clearing the timer, and setting the playing state to false. This will cause the app to re-render, and the button will say “Start” again.
If the metronome is not playing, start a timer that plays a click every few milliseconds, depending on the bpm.
If you’ve used a metronome before, you know how the first beat is usually a distinctive sound (“TICK tock tock tock”). We’ll use count to keep track of which beat we’re on, incrementing it with each “click”, so we need to reset it when we start.
Calling setInterval will schedule the first “click” to be one beat in the future, and it’d be nice if the metronome started clicking immediately, so the second argument to setState takes care of this. Once the state is set, it will play one click.
The second argument to setState is optional, and if you pass in a function there, React will call that function once the setState is done and the app has been updated.

You’ll notice this doesn’t play a sound, but rather calls out to this.playClick which we haven’t written yet... Write it.



**Handling BPM Changes
As the user changes the BPM, we can restart the metronome with the new tempo. Update the handleBpmChange function to this:

handleBpmChange = event => {
  const bpm = event.target.value;

  if (this.state.playing) {
    // Stop the old timer and start a new one
    clearInterval(this.timer);
    this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

    // Set the new BPM, and reset the beat counter
    this.setState({
      count: 0,
      bpm
    });
  } else {
    // Otherwise just update the BPM
    this.setState({ bpm });
  }
};

The “else” case here, when the metronome isn’t playing, just updates the BPM. Simple.

If the metronome is playing though, we need to stop it, create a new timer, and reset the count so it starts over. We’re not playing the initial “click” here, immediately after the BPM is changed, because otherwise we’ll get a string of “clicks” as the user drags the BPM slider around.

It works! Kinda.












This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
