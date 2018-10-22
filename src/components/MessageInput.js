import React, { Component } from 'react';

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: ""
    }
  }

  validateKeyPress(e) {
    if (e.key === "Enter") {
      console.log("Enter pressed!");
      this.submitMessage(e, e.target.value);
      this.setState({ newMessage: "" });
    }
    else {
      this.setState({
        newMessage: e.target.value
      });
      console.log("Other keys pressed");
    }
    return;
  }

  submitMessage(e, message = "") {
    if (e.target.id === "message-input") {
      this.props.pushMessage(message);
    }
    else {
      e.preventDefault();
      this.props.pushMessage(e.target.previousSibling.value);
      this.setState({ newMessage: "" });
    }
  }

  handleValueChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  render() {
    return (
      <div className="message-input-form">
        <input
          id="message-input"
          type="text"
          placeholder="Write your message here..."
          value={this.state.newMessage}
          onChange= { (e) => this.handleValueChange(e) }
          onKeyPress={ (e) => this.validateKeyPress(e) }
        />
        <button id="message-submit" onClick={ (e) => this.submitMessage(e)}>Submit</button>
      </div>
    )
  }
}

export default MessageInput;
