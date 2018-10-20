import React, { Component } from 'react';
import NewRoom from "./NewRoom";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomDialog: false
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  displayRoomDialog() {
   this.setState({ newRoomDialog: !this.state.newRoomDialog });
  }

  createRoom(e) {
    let newName = e.target.previousSibling.value;
    this.roomsRef.push({
      name: newName
    });
    this.displayRoomDialog();
  }

  render() {
    return (
      <section className="room-listing">
        <button id="create-room" onClick={(e) => this.displayRoomDialog()}>New Room</button>
        {
          this.state.newRoomDialog ? (
            <NewRoom
              handleSubmit={(e) => this.createRoom(e)}
              handleCancel={() => this.displayRoomDialog()}
            />
          ) : ( null )
        }

        {
          this.state.rooms.map( (room, index) => {
            return (
              <h2 className="room-item" key={room.key}>{room.name}</h2>
            );
          })
        }
      </section>
    )
  }
}

export default RoomList;
