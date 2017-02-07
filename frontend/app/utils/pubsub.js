'use strict';

class PubSub {
    constructor() {
		this.handlers = [];
	}
	
	subscribe(event, handler, context) {
		if(context === 'undefined') context = handler;
		this.handlers.push({ 
			event: event, 
			handler: handler.bind(context),
		});
	}
	
	publish(event, ...args) {
		this.handlers.forEach(
			topic => {
				if(topic.event === event)
					topic.handler(args);
			}	
		);
	}
}

export { PubSub };