import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from '../components/Card'
import Header from '../components/Header'

import enter from '@/images/enter.svg'
import create from '@/images/group.svg'

class Home extends Component {
	// componentDidMount() {
	// 	fetch('https://cors.io/?https://www.behance.net/v2/projects/27198827?api_key=8fVWyPdLzJwgectbQq6BOtLCEpnMpF5r', {
	// 		method: 'GET'
	// 	})
	// 	.then(function(response) {
	// 		response.json().then(data => {
	// 			console.log(data.project.modules)
	// 		})
	// 	})
	// }
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

				<h5 className="home__artcredit">Artist:
				<a href="https://www.behance.net/sarahedith" target="_blank">Sarah Edith</a></h5>
			</div>
		)
	}
}

export default Home