import React, { Component } from 'react';

import 'normalize.css';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <h1 className={styles.title}>React + Redux + Immutable.js</h1>
        <h2 className={styles.subtitle}>
          A starter kit for <b>modern</b>, <b>performant</b>, and <b>scalable</b> JS.
        </h2>
      </div>
    );
  }
}

export default App;
