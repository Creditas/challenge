import React, { Component } from 'react';
import './App.css';
import mensagens from './mensagens.json';


export default class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
			novaMensagem: '',
			listaDeMensagens: mensagens.mensagens
        };
    }		
	
	renderMensagens(){
		
		
	
		return this.state.listaDeMensagens.map((msg) => {
			
			var mensagemID = msg.mensagemID;
			var usuarioNome = msg.usuarioNome;
			var texto = msg.texto;
			
			return (
				<li key={mensagemID} className="message-line">
					<p>{usuarioNome}: </p>
					<p> {texto}</p>
				</li>
			);
		});
	}
	
	handleChange(event) {
		this.setState({novaMensagem: event.target.value});
	}
	
	enviarMensagem(event) {
		event.preventDefault();
		if (this.state.novaMensagem === '') return;
		let novaLista = this.state.listaDeMensagens;
		let lastID = this.state.listaDeMensagens[this.state.listaDeMensagens.length-1].mensagemID;
		novaLista.push({
			"mensagemID": lastID+1,
			"usuarioNome": "Cebolinha",
			"texto": this.state.novaMensagem
		});
		this.setState({novaMensagem: ''});
	}	
	
	render() {
		return (
			<div className="chatbox">
				<h1>Chat</h1>
				<div className="messages">
					<ul className="message-list">
						{this.renderMensagens()}
					</ul>
					<form onSubmit={this.enviarMensagem.bind(this)}>
						<input type="text" value={this.state.novaMensagem} onChange={this.handleChange.bind(this)} />
						<button type="submit">Enviar</button>
					</form>		
				</div>
			</div>
		);
	}
}

