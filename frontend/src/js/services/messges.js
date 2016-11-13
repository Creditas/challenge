export class Messages{
	
	fetchNewMessages(){
		// this can be a ajax calling to get messages

		return new Promise(function(resolve, reject) {
			resolve({[
				{
					"message": "Hello to chat",
					"sender": "System",
					"sent": false
				},
				{
					"message": "Now we can chat",
					"sender": "System",
					"sent": false
				}
			]});
		})
	}
}