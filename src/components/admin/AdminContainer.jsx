/* eslint no-confusing-arrow: "off" */
import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import moment from 'moment';
import Chat from '../Chat.jsx';

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(`${window.location.protocol}//${window.location.hostname}:8080`),
      rooms: [],
      currentRoom: null,
      fakeState: 1,
    };
    this.switchRoom = this.switchRoom.bind(this);
    this.renderRoomList = this.renderRoomList.bind(this);
    this.emitUnavailable = this.emitUnavailable.bind(this);
  }

  componentDidMount() {
    const socket = this.state.socket;
    const getDisplayName = username => username === 'admin' ? 'me' : username;
    socket.on('connect', () => {
      socket.emit('admin', 'admin');
    });
    socket.on('updaterooms', rooms => {
      this.setState({ rooms });
    });
  }

  switchRoom(e) {
    const roomId = e.target.value;
    let divId = `#enter${this.state.currentRoom}`;
    $(divId).removeClass('btn-success');
    this.setState({ currentRoom: roomId });
    divId = `#enter${roomId}`;
    $(divId).addClass('btn-success');
    this.state.socket.emit('switchRoom', roomId);
  }

  emitUnavailable(e) {
    const roomId = e.target.value;
    const divId = `#unavailable${roomId}`;
    $(divId).addClass('btn-danger');
    this.state.socket.emit('unavailable', roomId);
  }

  renderRoomList() {
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
            <td>{moment(room.createdAt).format('h:mmA')}</td>
            <td>
              <button
                className="btn btn-default btn-sm"
                key={i}
                id={`enter${room.roomId}`}
                value={room.roomId}
                onClick={this.switchRoom}
              >
                Enter
              </button>
            </td>
            <td>
              <button
                className="btn btn-default btn-sm"
                key={i}
                id={`unavailable${room.roomId}`}
                value={room.roomId}
                onClick={this.emitUnavailable}
              >
                Unavailable
              </button>
            </td>
          </tr>
          ))
        }
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <b>Current Chats</b>
          {this.state.rooms ? this.renderRoomList() : <p>no rooms</p>}
          <div id="rooms"></div>
        </div>
        <div className="col-sm-6">
          {this.state.currentRoom ?
            <Chat
              socket={this.state.socket}
              onNewMessage={this.getMessages}
            />
          :
          null}
        </div>
      </div>
    );
  }
}

export default AdminContainer;
