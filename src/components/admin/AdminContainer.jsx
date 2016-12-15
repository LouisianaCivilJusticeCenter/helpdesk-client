import React, { Component } from 'react';
import io from 'socket.io-client';
import _ from 'underscore';
import $ from 'jquery';

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(`${window.location.protocol}//${window.location.hostname}:8080`),
      rooms: [],
      currentRoom: null,
    };
    this.switchRoom = this.switchRoom.bind(this);
    this.renderRoomList = this.renderRoomList.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.emitUnavailable = this.emitUnavailable.bind(this);
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
    console.log(this.state.currentRoom);
    let divId = `#enter${this.state.currentRoom}`;
    console.log('removing class', divId);
    $(divId).removeClass('btn-success');
    this.setState({ currentRoom: roomId });
    divId = `#enter${roomId}`;
    console.log('adding class', divId);
    $(divId).addClass('btn-success');
    this.state.socket.emit('switchRoom', roomId);
  }

  emitUnavailable(e) {
    console.warn('inside switch room');
    const roomId = e.target.value;
    console.log('this is room ID', roomId);
    const divId = `#unavailable${roomId}`;
    $(divId).addClass('btn-danger');
    this.state.socket.emit('unavailable', roomId);
  }

  renderRoomList() {
    console.log('rendering room list');
    return (
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Time</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {this.state.rooms.map((room, i) => (
          <tr key={room.roomId}>
            <td>{room.username}</td>
            <td>{room.category}</td>
            <td>{room.createdAt}</td>
            <td><button className="btn btn-default" key={i} id={`enter${room.roomId}`} value={room.roomId} onClick={this.switchRoom}>Enter</button></td>
            {/* TODO: emit handler for unavailable */}
            <td><button className="btn btn-default" key={i} id={`unavailable${room.roomId}`} value={room.roomId} onClick={this.emitUnavailable}>Unavailable</button></td>
          </tr>
          ))
        }
        </tbody>
      </table>
    )

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
