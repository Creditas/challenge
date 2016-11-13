export class View{
	
	constructor(elemento){
		this._elemento = elemento
	}

	template(){
		throw new Error('The _template method must be implemented')
	}

	append(obj){
		let element = this.template(obj);
		this._elemento.insertAdjacentHTML( 'beforeend', element );
	}
}