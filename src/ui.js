// render chat templates to the DOM
// clear the list of chats (when the room changes)
import "./input.css";
class ChatUi {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = ``;
  }
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    const html = `
    <li class="list-group-item pb-2">
    <span class="username font-bold">${data.username}</span>
    <span class="message">${data.message}</span>
    <div class="time text-gray-300 text-xs">${when}</div>
    </li>
      `;
    this.list.innerHTML += html;
  }
}

export { ChatUi };
