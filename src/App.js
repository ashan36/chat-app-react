import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
