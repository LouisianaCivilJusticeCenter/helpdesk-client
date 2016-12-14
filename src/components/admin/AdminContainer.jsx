import React, { Component } from 'react';
import io from 'socket.io-client';

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:8080'),
      rooms: {},
      currentRoom: '',
      step: 0,
    };
    this.switchRoom = this.switchRoom.bind(this);
    this.renderRoomList = this.renderRoomList.bind(this);
  }

  componentDidMount() {
    const context = this;
    const socket = this.state.socket;
    socket.on('connect', () => {
      socket.emit('admin');
    });
    socket.on('updaterooms', rooms => {
      context.setState({ rooms });
    });
    socket.on('updatechat', (username, message, roomId) => {
      let oldRooms = this.state.rooms;

    })
  }

  switchRoom(room) {
    this.state.socket.emit('switchRoom', room);
  }

  renderRoomList() {
    return this.state.rooms.map((room) => (
      <li key={room.id}>{room.id}</li>
    ));
  }

  render() {
    return (
      <div>
        <div>
          <b>ROOMS</b>
          {this.state.rooms.length ? this.renderRoomList() : <p>no rooms</p>}
          <div id="rooms"></div>
        </div>
        {/* <AdminChat /> */}
      </div>
    );
  }
}

export default AdminContainer;
