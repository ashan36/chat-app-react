import React, { Component } from 'react';
import MessageInput from './MessageInput';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    console.log("MessageList constructor")
    this.populateMessages = this.populateMessages.bind(this);
    }

  componentDidMount() {
    console.log("Message List did Mount!")

    if (this.props.activeRoomId !== "") {
      console.log("Querying Firebase in didMount");
      this.messagesRef = this.props.firebase.database().ref("rooms/" + this.props.activeRoomId + "/messages");
      this.messagesRef.on('child_added', this.populateMessages);
      };
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeRoomId !== prevProps.activeRoomId) {
      this.populateMessages({});
      console.log("Updating Messages");
      this.messagesRef.off('child_added', this.populateMessages);
      console.log("Querying Firebase in didUpdate");
      this.messagesRef = this.props.firebase.database().ref("rooms/" + this.props.activeRoomId + "/messages");
      this.setState({ messages: [] }, () => this.messagesRef.on('child_added', this.populateMessages));
    }
  }

  componentWillUnmount() {
    this.messagesRef.off('child_added', this.populateMessages);
    this.messagesRef = null;
    console.log("Message List did Unmount!")
  }

  populateMessages = (function (snapshot) {
    var newMessages = [];
    var counter = 0;
    return function (snapshot) {
      try {
        var message = snapshot.val();
      }
      catch(err) {
        newMessages = [];
        counter = 0;
        console.log('clearing messages');
        return;
      }
      message.key = snapshot.key;
      newMessages = newMessages.concat(message);
      counter++;
      console.log("adding message" + counter);
      console.log(newMessages);
      this.setMessagesState(newMessages);
      return;
    }
  })();

  setMessagesState(newMessages) {
    this.setState({ messages: newMessages}, () => console.log("messages state updated"));
  }

  pushMessage(message) {
    message = message.replace(/^\s+/, "");
    let timeStamp = this.props.firebase.database.ServerValue.TIMESTAMP;
    let roomId = this.props.activeRoomId;
    this.messagesRef.push({
      username: this.props.user.displayName,
      content: message,
      sentAt: timeStamp,
      roomId: roomId
    });
  }

  formatTimeStamp(time) {
    var date = new Date(parseInt(time));
    return date.toLocaleString();
  }

  render () {
    return (
      <section className="message-list">
        <h3 id="active-room-heading">You are talking in {this.props.activeRoomName}</h3>
        <table id="messages-table">
          <colgroup>
            <col id="message-username" />
            <col id="message-content" />
            <col id="message-timestamp" />
          </colgroup>
          <tbody>
            {
              this.state.messages.map( (value, index) => {
                return (
                  <tr className="message-post" key={value.key}>
                    <td>{value.username}</td>
                    <td>{value.content}</td>
                    <td>{this.formatTimeStamp(value.sentAt)}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <MessageInput pushMessage={(message) => this.pushMessage(message)} />
      </section>
    )
  }
}

export default MessageList;
