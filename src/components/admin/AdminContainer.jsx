import React, { Component } from 'react';
import io from 'socket.io-client';
import _ from 'underscore';
import $ from 'jquery';

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:8080'),
      rooms: [],
      currentRoom: '',
    };
    this.switchRoom = this.switchRoom.bind(this);
    this.renderRoomList = this.renderRoomList.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }

  componentDidMount() {
    const socket = this.state.socket;
    socket.on('connect', () => {
      socket.emit('admin', 'admin');
    });
    socket.on('updaterooms', () => {
      this.getRooms();
    });
    socket.on('updatechat', (username, message, roomId) => {
      if (roomId) {
        $('#conversation').empty();
        fetch(`/v1/messages?room_id=${roomId}`)
        .then(res => res.json())
        .then(data => {
          data.data.forEach(oldMessage => {
            $('#conversation').append(`<b>${oldMessage.from_username}:</b>${oldMessage.body}<br>`);
          });
        });
      } else {
        $('#conversation').append(`<b>${username}:</b>${message}<br>`);
      }
    });

    $('#datasend').click(() => {
      const message = $('#data').val();
      $('#data').val('');
      socket.emit('sendchat', message);
    });
  }

  getRooms() {
    fetch('http://localhost:3000/v1/access_tokens')
    .then(res => res.json())
    .then(data => {
      const rooms = _.unique(data.data.map((tokenObj => tokenObj.user_id)));
      this.setState({ rooms });
    });
  }

  switchRoom(e) {
    const room = e.target.value;
    this.setState({ currentRoom: room });
    this.state.socket.emit('switchRoom', room);
  }

  renderRoomList() {
    return this.state.rooms.map((room, i) => (
      <button key={i} value={room} onClick={this.switchRoom}>{room}</button>
    ));
  }

  render() {
    return (
      <div>
        <div>
          <b>ROOMS</b>
          {this.state.rooms ? this.renderRoomList() : <p>no rooms</p>}
          <div id="rooms"></div>
        </div>
        <div id="conversation"></div>
        <input id="data" />
        <input type="button" id="datasend" value="send" />
      </div>
    );
  }
}

export default AdminContainer;
