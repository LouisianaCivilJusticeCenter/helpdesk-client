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
      currentRoom: null,
    };
    this.switchRoom = this.switchRoom.bind(this);
    this.renderRoomList = this.renderRoomList.bind(this);
    this.sendChat = this.sendChat.bind(this);
  }

  componentDidMount() {
    const socket = this.state.socket;
    socket.on('connect', () => {
      socket.emit('admin', 'admin');
    });
    socket.on('updaterooms', rooms => {
      console.log('update room')
      console.warn('inside update rooms');
      this.setState({ rooms });
    });
    socket.on('updatechat', (username, message, roomId) => {
      if (roomId) {
        console.warn('fetching');
        $('#conversation').empty();
        $('#conversation').append(`<b>${username}:</b>${message}<br>`);
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
  }

  switchRoom(e) {
    console.warn('inside switch room');
    const roomId = e.target.value;
    console.log('this is room ID', roomId);
    this.setState({ currentRoom: roomId });
    this.state.socket.emit('switchRoom', roomId);
  }

  renderRoomList() {
    console.log('rendering room list');
    return this.state.rooms.map((room, i) => (
      <button key={i} value={room.roomId} onClick={this.switchRoom}>{room.username}</button>
    ));
  }

  sendChat(e){
    console.log('message seinding')
    const message = $('#data').val();
    $('#data').val('');
    this.state.socket.emit('sendchat', message);
  }

  render() {
    return (
      <div>
        <div>
          <b>Current Chats</b>
          {this.state.rooms ? this.renderRoomList() : <p>no rooms</p>}
          <div id="rooms"></div>
        </div>
        {this.state.currentRoom ?
          <form>
            <div id="conversation"></div>
            <input id="data" />
            <input type="button" id="datasend" value="send" onClick={this.sendChat} />
          </form>
        :
        null}
      </div>
    );
  }
}

export default AdminContainer;
