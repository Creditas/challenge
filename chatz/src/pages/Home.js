import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from '../components/Card'
import Header from '../components/Header'

import enter from '@/images/enter.svg'
import create from '@/images/group.svg'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<Header />
				<div className="container home__content">
					<Card>
						<Link to="/" className="home__btn">
							<img src={create} />
							<p>Criar uma sala</p>
						</Link>
						<Link to="/" className="home__btn">
							<img src={enter} />
							<p>Entrar em uma sala</p>
						</Link>
					</Card>
				</div>
			</div>
		)
	}
}

export default Home