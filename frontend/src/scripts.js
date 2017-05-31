function Chat(params) {
	this.$message = params.message;
	this.$submit  = params.submit;
	this.$box     = params.box;
	this.id       = params.id;
};

Chat.prototype.build = function() {
	if (this.$message && this.$submit && this.$box) {
		this.bind();
		this.listener();
	}
};

Chat.prototype.bind = function() {
	var callback = this.submit.bind(this);

	this.$submit.addEventListener('click', callback);
	this.$message.addEventListener('keypress', function(e) {
		var key = e.which || e.keyCode;

		if (key === 13)
			callback();
	});
};

Chat.prototype.submit = function() {
	var self = this,
			message = this.$message.value;

	if (message) {
		this.append(message)
		.then(function() {
			self.clean();
		})
		.catch(function(err) {
			// TODO tratar erro
		});
	}
};

Chat.prototype.append = function(message) {
	var self = this;

	return new Promise(function(resolve, reject) {
		var $message = document.createElement('li');
		$message.innerHTML = message;

		self.$box.appendChild($message);

		resolve();
	});
};

Chat.prototype.listener = function() {
	var self = this,
			messages = ['Funcionaria melhor com React', 'Palmeiras não tem mundial'];

	setInterval(function() {
		self.append(messages[Math.floor(Math.random() * messages.length)]);
	}, 10000);
};

Chat.prototype.clean = function() {
	this.$message.value = '';
};

var init = function() {
	var $chats = document.getElementsByClassName('js-chat');

	if (!$chats[0]) return; 

	var $message = document.getElementsByClassName('js-input-message'),
			$submit  = document.getElementsByClassName('js-submit-message'),
			$box     = document.getElementsByClassName('js-message-list');

	for (var i = 0; i < $chats.length; i++) {
		var chat = new Chat({
			message: $message[i],
			submit: $submit[i],
			box: $box[i],
			id: $chats[i].getAttribute('data-id')
		});

		chat.build();
	}
};

document.onload = init();