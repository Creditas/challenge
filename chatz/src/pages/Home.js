import React, { Component } from 'react'

import Card from '../components/Card'
import Header from '../components/Header'
import { connect } from 'react-redux'
import store from '@/store'
import setUser from '@/actions/setUsername'
import enter from '@/images/enter.svg'
import create from '@/images/group.svg'
import logChat from '@/actions/logChat'

const mapStateToProps = state => {
  return {
    username: state.username
  }
}

class Home extends Component {
	constructor(props) {
    super(props)

    this.state = {
			artistName: '',
			artistUrl: '',
			roomHash: '',
			userName: '',
		}

		this.actionBtn = this.actionBtn.bind(this)
	}

	slideImages = (arr) => {
		let count = 0
		const images = JSON.parse(arr)
		const homeElem = document.querySelector('.home')
		if (images && homeElem) {
			setInterval(() => {
				count += 1
				if(count >= images.length) {
					count = 0
				}
				homeElem.style.backgroundImage = `url(${images[count]})`
			}, 10000)
		} else {
			console.error('"images" variable is null or undefined.')
		}
	}

	generateHash = () => {
		const hash = Math.floor(Math.random() * 0xFFFFFF).toString(16)
		store.dispatch(logChat.createRoom(hash))
	}

	setUsername = () => {
		let username = this.props.username
		username = username.length !== 0 ? username: prompt('Digite seu nome:')

		if (username) {
			store.dispatch(setUser.username(username))
			return true
		} else if (username !== null) {
			store.dispatch(setUser.username('Anônimo'))
			return true
		}

		return false
	}

	actionBtn = action => event => {
		event.preventDefault()
		if (this.setUsername()) {
			if (action === 'create') {
				this.generateHash()
				this.props.history.push(`/room/`)
			} else if (action === 'enter') {
				let roomID = prompt('Digite o ID da sala:')
				store.dispatch(logChat.createRoom(roomID))
				this.props.history.push(`/room/`)
			}
		} else {
			event.preventDefault()
		}
	}

	componentDidMount() {
		const imageCollection = localStorage.getItem('imageCollection')
		const artistName = localStorage.getItem('artistName')
		const artistUrl = localStorage.getItem('artistUrl')
		if (imageCollection && imageCollection !== null) {
			this.slideImages(imageCollection)
			this.setState({
				artistName,
				artistUrl
			})
		} else {
			fetch('https://cors.io/?https://www.behance.net/v2/projects/27198827?api_key=8fVWyPdLzJwgectbQq6BOtLCEpnMpF5r')
			.then((response) => {
				response.json().then(data => {
					if (data.http_code === 200) {
						const images = []
						const modules = data.project.modules
						const artistName = data.project.owners[0].display_name
						const artistUrl = data.project.owners[0].url
						modules.map(e => images.push(e.sizes.original))

						localStorage.setItem("imageCollection", JSON.stringify(images))
						localStorage.setItem("artistName", artistName)
						localStorage.setItem("artistUrl", artistUrl)

						this.setState({
							artistName,
							artistUrl
						})

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
						<a href="#" onClick={this.actionBtn('create')} className="home__btn">
							<img src={create} alt="" />
							<p>Criar uma sala</p>
						</a>

						<a href="#" onClick={this.actionBtn('enter')} className="home__btn">
							<img src={enter} alt="" />
							<p>Entrar em uma sala</p>
							</a>
					</Card>
				</div>

				<div className="home__artcredit">Artist:
				<a href={this.state.artistUrl} target="_blank">{ this.state.artistName }</a></div>
			</div>
		)
	}
}

export default connect(
  mapStateToProps
)(Home)
