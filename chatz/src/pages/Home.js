import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Card from '../components/Card'
import Header from '../components/Header'

import enter from '@/images/enter.svg'
import create from '@/images/group.svg'

class Home extends Component {
	slideImages = (arr) => {
		let count = 0
		const images = JSON.parse(arr)
		if (images) {
			setInterval(() => {
				count += 1
				if(count >= images.length) {
					count = 0
				}
				document.querySelector('.home').style.backgroundImage = `url(${images[count]})`
			}, 10000)
		} else {
			console.error('"images" variable is null or undefined.')
		}
	}

	componentDidMount() {
		const imageCollection = localStorage.getItem('imageCollection')
		if (imageCollection && imageCollection !== null) {
			this.slideImages(imageCollection)
		} else {
			fetch('https://cors.io/?https://www.behance.net/v2/projects/27198827?api_key=8fVWyPdLzJwgectbQq6BOtLCEpnMpF5r')
			.then((response) => {
				response.json().then(data => {
					if (data.http_code === 200) {
						const images = []
						const modules = data.project.modules
						modules.map(e => images.push(e.sizes.original))
						localStorage.setItem("imageCollection", JSON.stringify(images))

						this.slideImages(localStorage.getItem('imageCollection'))
					}
				})
			})
			.catch(error => console.error(error))
		}
	}

	render() {
		return (
			<div className="home">
				<Header />
				<div className="container home__content">
					<Card>
						<Link to="/room/32" className="home__btn">
							<img src={create} />
							<p>Criar uma sala</p>
						</Link>
						<Link to="/room/" className="home__btn">
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
