import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
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
      console.log("Updating Messages");
      this.setState({ messages: [] });
      this.messagesRef.off('child_added', this.populateMessages);
      console.log("Querying Firebase in didUpdate");
      this.messagesRef = this.props.firebase.database().ref("rooms/" + this.props.activeRoomId + "/messages");
      this.messagesRef.on('child_added', this.populateMessages);
    }
  }

  componentWillUnmount() {
    this.messagesRef.off('child_added', this.populateMessages);
    this.messagesRef = null;
    console.log("Message List did Unmount!")
  }

  populateMessages(snapshot) {
    const message = snapshot.val();
    message.key = snapshot.key;
    var newMessages = this.state.messages.concat(message);
    console.log(newMessages.map( (message) => {return ("New Message array " + message.content)}));
    this.setState({ messages: newMessages });
    console.log(this.state.messages.map( (message) => {return ("State message array " + message.content)}));
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
                    <td>{value.sentAt}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
    )
  }
}

export default MessageList;
