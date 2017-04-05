var chat = {};

chat = {
	$message: null,
	$submit: null,
	$box: null,

	init: function() {
		this.$box     = document.getElementsByClassName('js-messages');
		this.$message = document.getElementsByClassName('js-input-message');
		this.$submit  = document.getElementsByClassName('js-submit-message');

		if (this.$message[0] && this.$submit[0] && this.$box[0]) {
			this.bind();
			this.listener();
		}
	},

	bind: function() {
		var callback = this.submit.bind(this);

		this.$submit[0].addEventListener('click', callback);
		this.$message[0].addEventListener('keypress', function(e) {
			var key = e.which || e.keyCode;

			if (key === 13)
				callback();
		});
	},

	submit: function() {
		var message = this.$message[0].value;

		if (message) {
			this.append(message)
			.then(function() {
				chat.clean();
			})
			.catch(function(err) {
				// TODO tratar erro
			});
		}
	},

	append: function(message) {
		return new Promise(function(resolve, reject) {
			var $message = document.createElement('li');
			$message.innerHTML = message;

			chat.$box[0].appendChild($message);

			resolve();
		});
	},

	listener: function() {
		setInterval(function() {
			chat.append('Funcionaria melhor com React - Apache');
		}, 7000);
	},

	clean: function() {
		this.$message[0].value = '';
	}
}

document.onload = chat.init();