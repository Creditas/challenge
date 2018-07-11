let messageList, messageForm, messageText, chats = [], currentChat, lastMessage;

function init() {
  messageList = document.getElementById('messageList');
  messageForm = document.getElementById('messageForm');
  messageText = document.getElementById('messageText');

  currentChat = startChat();
  openChat(currentChat);

  messageForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    sendMessage(messageText.value);
    messageText.value = '';
  });
}

function startChat() {
  return chats.push({messages:[]}) -1;
}

function openChat(chatId) {
  currentChat = chatId;
  renderChat(currentChat, true);
}

function playAudio(){
  document.getElementById("audio").play(); 
}

function scrollChat(){
  messageList.scrollTop = messageList.scrollHeight;
}

function sendMessage(message) {
  if (message === '') {return;}
  messageForm.classList.add("inative");
  messageSent(message);
}

function messageSent(message) {
  addMessage(currentChat, 'creditas fadeInUp animated', message);
  scrollChat();
  setTimeout(function(){
    playAudio();
    messageReceived(currentChat, 'Creditas: Lorem ipsum dolor sit amet,');
    messageText.value = '';
    messageForm.classList.remove("inative");
    messageText.focus();
    scrollChat();
  }, 1500);
}

function messageReceived(chatId, message) {
  addMessage(chatId, 'user fadeInUp animated', message);
}

function addMessage(chatId, type, message) {
  chats[chatId].messages.push({type:type, content:message});
  if (chatId === currentChat) {
    renderChat(currentChat);
  }
}

function renderChat(chatId, force) {
  let i;
  if (force || chatId !== currentChat) {
    messageList.innerHTML = '';
    lastMessage = 0;
  }
  for (i = lastMessage; i < chats[chatId].messages.length; i += 1) {
    renderMessage(chats[chatId].messages[i]);
    lastMessage = i + 1;
  }
}

function renderMessage(message) {
  let messageEl = document.createElement('li');
  messageEl.className = message.type;
  let messageContentEl = document.createElement('div');
  messageContentEl.className = 'message-content fadeInUp animated';
  messageContentEl.innerText = message.content;
  messageEl.appendChild(messageContentEl);
  messageList.appendChild(messageEl);
}

init();