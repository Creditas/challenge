import ReactDOM from 'react-dom'
import React from 'react'
import { Component } from 'react'
import { Router, Route, browserHistory, IndexRoute  } from 'react-router'

class App extends Component {
   render() {
     return (
       <h1>hello</h1>
     )
   }
}

ReactDOM.render(<App />, document.getElementById('root'))