import React, { Component } from 'react';

class NewRoom extends Component {
  render() {
    return (
      <form>
        <h3>Create a new room</h3>
        <label for="new-room-text">Enter a room name</label>
        <input id="new-room-text" type="text"/>
        <button onClick={this.props.handleSubmit}>Submit</button>
        <button onClick={this.props.handleCancel}>Cancel</button>
      </form>
    )
  }
}

export default NewRoom;
