// dom queries
import { Chatroom } from "./chat.js";
import { ChatUi } from "./ui.js";

const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
// update the chat room
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUi.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUi.render(chat));
  }
});
// check local storage for a name
const username = localStorage.username ? localStorage.username : "yoshi";
// class instances
const chatroom = new Chatroom("general", username);
// update username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  // show then hide the update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => (updateMssg.innerText = ``), 3000);
});

// get chats and render
chatroom.getChats((data) => chatUi.render(data));

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

const chatUi = new ChatUi(chatList);
