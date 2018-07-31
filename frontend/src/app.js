import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import MessageBox from './components/MessageBox'

class App extends Component {
	render() {
		return (
			<div>
			<h1>hello</h1>
			<MessageBox />
			</div>
			)
		}
	}

	ReactDOM.render(<App />, document.getElementById('root'))