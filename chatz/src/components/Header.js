import React, { Component } from 'react'
import logo from '@/images/chat.svg'
import { Link } from 'react-router-dom'

class Header extends Component {
	render() {
		return (
			<div className="header">
				<div className="container">
					<Link to="/">
						<img className="header__logo" src={logo} alt="Chatz!"/>
						<h1 className="header__title">Chatz!</h1>
					</Link>
				</div>
			</div>
		)
	}
}

export default Header
