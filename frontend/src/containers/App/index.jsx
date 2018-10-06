import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clear: 'clear'
    };
  }

  render() {
    const { clear } = this.state;
    return <div> Redux App {clear} </div>;
  }
}

export default connect(
  null,
  null
)(App);
