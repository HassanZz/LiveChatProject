import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw-fbQGl7pDh_U83NumNXFoJk1hrY87J4",
  authDomain: "fir-service-b03df.firebaseapp.com",
  projectId: "fir-service-b03df",
  storageBucket: "fir-service-b03df.appspot.com",
  messagingSenderId: "196252960632",
  appId: "1:196252960632:web:e0a4808b8a1e2dbd82ea8d",
};
initializeApp(firebaseConfig);
const db = getFirestore();

// adding new chat documents
// setting up a real-time listerner to get new chats
// updating the username
// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, "chats");
    this.unsub;
  }
  async addChat(message) {
    // format a chat object
    addDoc(this.chats, {
      message,
      created_at: serverTimestamp(),
      username: this.username,
      room: this.room,
    });
    // save the chat documents
  }
  getChats(callback) {
    const q = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at")
    );
    this.unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        callback(change.doc.data());
      });
    });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

export { Chatroom };
