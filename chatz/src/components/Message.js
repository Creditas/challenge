import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class Message extends Component {
	// message message--mine
	// const msgOwner = this.props.owner ? this.props.owner : null

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
