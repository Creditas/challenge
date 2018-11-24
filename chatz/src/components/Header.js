import React, { Component } from 'react'
import logo from '@/images/chat.svg'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="container">
            <img className="header__logo" src={logo} alt="Chatz!"/>
            <h1 className="header__title">Chatz!</h1>
        </div>
      </div>
    )
  }
}

export default Header