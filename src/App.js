import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyCn-uHDplKB0bHMoPJ1CqAv47Lp1dSkotc",
  authDomain: "bloc-chat-react-32dfa.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-32dfa.firebaseio.com",
  projectId: "bloc-chat-react-32dfa",
  storageBucket: "bloc-chat-react-32dfa.appspot.com",
  messagingSenderId: "352590931036"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoomId: "",
      activeRoomName: ""
    };
  }

  selectActiveRoom(roomId, roomName) {
   this.setState({ activeRoomId: roomId, activeRoomName: roomName });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={firebase} activeRoomId={this.state.activeRoomId} handleSelectRoom={(id, name) => this.selectActiveRoom(id, name)}/>
          {
            (this.state.activeRoomId === "") ?
              (null) :
              (<MessageList firebase={firebase} activeRoomId={this.state.activeRoomId} activeRoomName={this.state.activeRoomName}/>)
          }
        </main>
      </div>
    );
  }
}

export default App;
