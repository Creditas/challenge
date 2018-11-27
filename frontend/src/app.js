import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import MessageBox from './components/MessageBox'

class App extends Component {
	render() {
		return (
			<div>
			<MessageBox />
			</div>
			)
		}
	}

	ReactDOM.render(<App />, document.getElementById('root'))