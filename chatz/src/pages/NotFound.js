import React, { Component } from 'react'

class NotFound extends Component {
	constructor(props) {
    super(props)

    this.state = {
			artistName: '',
			artistUrl: ''
    }
	}

	goBack = (e) => {
		e.preventDefault()
		this.props.history.goBack()
	}

	componentDidMount() {
		fetch('https://cors.io/?https://www.behance.net/v2/projects/27331731?api_key=8fVWyPdLzJwgectbQq6BOtLCEpnMpF5r')
			.then((response) => {
				response.json().then(data => {
					if (data.http_code === 200) {
						const images = []
						const modules = data.project.modules
						const artistName = data.project.owners[0].display_name
						const artistUrl = data.project.owners[0].url
						modules.map(e => images.push(e.sizes.original))

						this.setState({
							artistName,
							artistUrl
						})

						document.querySelector('.not-found').style.backgroundImage = `url(${images[0]})`
					}
				})
			})
			.catch(error => console.error(error))
	}

	render() {
		return (
			<div className="not-found">
				<div className="container">
					<div className="not-found__content">
						<h4>
							<span>404</span>
							Ops, você parece perdido.
						</h4>
						<p>Bilbo não está no Condado...</p>

						<a href="#" className="goBack" onClick={this.goBack}>VOLTAR</a>
					</div>
				</div>

				<div className="home__artcredit">Artist:
				<a href={this.state.artistUrl} target="_blank">{ this.state.artistName }</a></div>
			</div>
		);
	}
}

export default NotFound
