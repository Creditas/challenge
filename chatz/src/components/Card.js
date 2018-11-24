import React, { Component } from 'react'

class Card extends Component {
    render() {
        return (
            <div className="card">
                {this.props.children}
            </div>
        );
    }
}

export default Card