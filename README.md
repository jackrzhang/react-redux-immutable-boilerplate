# react-redux-immutable-boilerplate
STATUS: In progress

##Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)
  - [Installation](#installation)
  - [Development](#development)
  - [Production](#production)
  - [Linting](#linting)
  - [Testing](#testing)
- [Recommended Patterns](#recommended-patterns)
  - [Directory Structure](#directory-structure)
  - [Presentational and Container Components](#presentational-and-container-components)
  - [File Naming](#file-naming)
- [Tips](#tips)
  - [Integration w/ React Router](#integration-w-react-router)
  - [PureRenderMixin](#purerendermixin)
  - [Testing Immutable.js state](#testing-immutablejs-state)
  - [Server-side Rendering](#server-side-rendering)
- [License](#license)

##Features
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/), for simple and scalable state management
* [Immutable.js](https://facebook.github.io/immutable-js/), which seriously optimizes React performance in conjunction with:
  * [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html), which gives a huge boost to [shouldComponentUpdate]() through [shallow comparison](https://facebook.github.io/react/docs/shallow-compare.html)
  * [redux-immutable](https://github.com/gajus/redux-immutable), an implementation of Redux's [combineReducers](http://redux.js.org/docs/api/combineReducers.html) method that works with Immutable.js state
  * [react-immutable-proptypes](https://github.com/HurricaneJames/react-immutable-proptypes)
* [Babel](https://babeljs.io/), for ES6 and ES7 support
* [Webpack](http://webpack.github.io/docs/), for bundling
* [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html), through [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html) & [React Hot Loader](https://github.com/gaearon/react-hot-loader)
* [ESLint](http://eslint.org/), using Airbnb's popular [configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
* [PostCSS](http://postcss.org/) for future-proof CSS, with the following plugins:
  * [PreCSS](https://github.com/jonathantneal/precss), which allows for Sass-like markup
  * [CSS Modules](https://github.com/css-modules/css-modules), so you can just name your classes intuitively
  * [CSSNext](http://cssnext.io/), for CSS4 goodies and [automated cross-browser compatibility](https://github.com/postcss/autoprefixer)
* [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/) unit testing, with [Enzyme](http://airbnb.io/enzyme/) testing utilities for React
* [Travis CI](https://travis-ci.com/) base configuration

##Requirements
[Node.js](https://nodejs.org) v6+

##Usage
###Installation
```sh
git clone https://github.com/jackrzhang/react-redux-immutable-boilerplate.git
cd react-redux-immutable-boilerplate
rm -rf .git
git init
npm install
```

###Development
Just run `npm run dev`, which is equivalent to:
```sh
npm run clean
npm start
open http://localhost:8080
```

###Production
`npm run prod`, which is equivalent to:
```sh
npm run build
open build/index.html
```

###Linting
```sh
npm run lint
```

###Testing
Use `npm test`, as per usual. Unit tests are separated by file nature, as follows:
```sh
npm run test:reducers
npm run test:actions
npm run test:views
```
See recommended [file naming conventions]().

##Recommended Patterns
To see an example of these patterns in action, check out the source for  [todos-immutablejs](https://github.com/jackrzhang/todos-immutablejs/blob/master/src).
###Directory Structure
Small projects usually utilize a flat directory structure, with folders for `actions`, `components`, etc - files are organized by *nature*. For React + Redux applications, this looks something like this:
```
src/
  actions/
  components/
  constants/
  containers/
  reducers/
  stores/
  index.js
```
However, this does not scale, and eventually makes refactoring a pain. I recommend starting instead with a [fractal](https://en.wikipedia.org/wiki/Fractal) [project structure](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) - grouping files by *domain* over *nature*. Large applications will grow more naturally with this architecture, like large trees 
:evergreen_tree::evergreen_tree::evergreen_tree:. To distinguish between file natures (e.g. actions, containers, views), just use [file suffixes](#file-naming).
```
src/
  app/
    counter/
      Counter.view.js
      Counter.css
      Counter.container.js
      counterActions.js
    App.js
    App.css
  state/
    counterReducer.js
    rootReducer.js
```
The exception to this is your redux store; the structure of your application state often doesn't coincide with the organization of your UI. Thus, I like to keep all reducers and state-related logic in a top-level `state` directory.

###Presentational and Container Components
You can split your components into *two categories* that are often referred to as *presentational (view) components* and *containers*. Dan Abramov's written a [great explanation](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4kkynm5l1) of this, but here's the general rundowm:

####Presentational Components:
* Are concerned with *how things look*
* Ideally, render as pure functions of React state/props
* Have no dependencies on the rest of the app - they know **nothing** about Redux actions or state
```jsx
/* Counter.view.js */

import React, { PropTypes } from 'react';
import styles from './Counter.css';

const Counter = props => {
  const { count, add, subtract } = props;
  return (
    <div className={styles.counter}>
      <span className={styles.count}>{props.count}</span>
      <button className={styles.button} onClick={props.add}>Add</button>
      <button className={styles.button} onClick={props.subtract}>Subtract</button>
    </div>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  subtract: PropTypes.func.isRequired
};

export default Counter;
```

####Container Components
* Are concerned with *how things work*
* Provide an interface for presentational components to interact with Flux state and actions
* Are usually generated using higher-order components; in this case, with Redux's `connect`
```jsx
/* Counter.container.js */

import { connect } from 'react-redux';
import { add, subtract } from './counterActions';
import Counter from './Counter.view';

const mapStateToProps = state => ({
  count: state.counter
});

const mapDispatchToProps = dispatch => ({
  add: () => {
    dispatch(add());
  },
  subtract: () => {
    dispatch(subtract());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
```

Remember, *components don't have to emit DOM.* Separate those concerns! :smile:

###File Naming
I recommend using the following conventions:

File Nature | Description | Example
--- | --- | ---
Presentational | `*.view.js` | `Counter.view.js`
CSS Module | `*.css` | `Counter.css`
Container | `*.container.js` | `Counter.container.js`
Actions | `*Actions.js` | `counterActions.js`
Reducer | `*Reducer.js` | `counterReducer.js`
Spec | `*.spec.js` |`counterActions.spec.js`, `counterReducer.spec.js`, `Counter.view.spec.js`

##Tips
###Integration w/ [React Router](https://github.com/reactjs/react-router)

###PureRenderMixin

###Testing Immutable.js state

###Server-side rendering

##License
[MIT](https://github.com/jackrzhang/react-redux-immutable-boilerplate/blob/master/LICENSE)
