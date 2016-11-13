export class Util {
	
	constructor(){
		throw new Error('This class cannot be intantiated')
	}

	static getElement(selector, node){
		if(node == undefined){
			return document.querySelector(selector)
		}
		return node.querySelector(selector)
	}

	static getElements(selector, node){
		if(node == undefined){
			return document.querySelectorAll(selector)
		}
		return node.querySelectorAll(selector)
	}
}