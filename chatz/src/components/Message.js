import React, { Component } from 'react'

class Message extends Component {
	render() {
		return (
			<div className={ `message message--${this.props.owner}`}>
				<div className="message__name">{this.props.name}</div>
				<div className="message__bubble">{this.props.message}</div>
			</div>
		)
	}
}

Message.defaultProps = {
  owner: ''
}

export default Message
