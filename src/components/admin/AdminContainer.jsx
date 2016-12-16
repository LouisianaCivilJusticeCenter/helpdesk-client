/* eslint no-confusing-arrow: "off" */
import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import moment from 'moment';
import { chatWrapper as chatStlye } from '../../css/styles.js';

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
    this.endChat = this.endChat.bind(this);
    this.emitUnavailable = this.emitUnavailable.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  componentDidMount() {
    const socket = this.state.socket;
    const getDisplayName = username => username === 'admin' ? 'me' : username;
    socket.on('connect', () => {
      socket.emit('admin', 'admin');
    });
    socket.on('updaterooms', rooms => {
      // console.log('update room')
      // console.warn('inside update rooms');
      this.setState({ rooms });
    });
    socket.on('updatechat', (username, message, roomId) => {
      if (roomId) {
        // console.warn('fetching');
        $('#conversation').empty();
        $('#conversation').append(`<b>${getDisplayName(username)}: </b>${message}<br>`);
        fetch(`/v1/messages?room_id=${roomId}`)
        .then(res => res.json())
        .then(data => {
          data.data.forEach(oldMessage => {
            $('#conversation')
              .append(`<b>${getDisplayName(oldMessage.from_username)}: </b>${oldMessage.body}<br>`);
          });
        });
      } else {
        $('#conversation').append(`<b>${getDisplayName(username)}:</b>${message}<br>`);
      }
    });
  }

  switchRoom(e) {
    // console.warn('inside switch room');
    const roomId = e.target.value;
    // console.log('this is room ID', roomId);
    // console.log(this.state.currentRoom);
    let divId = `#enter${this.state.currentRoom}`;
    // console.log('removing class', divId);
    $(divId).removeClass('btn-success');
    this.setState({ currentRoom: roomId });
    divId = `#enter${roomId}`;
    // console.log('adding class', divId);
    $(divId).addClass('btn-success');
    this.state.socket.emit('switchRoom', roomId);
  }

  emitUnavailable(e) {
    // console.warn('inside switch room');
    const roomId = e.target.value;
    // console.log('this is room ID', roomId);
    const divId = `#unavailable${roomId}`;
    $(divId).addClass('btn-danger');
    this.state.socket.emit('unavailable', roomId);
  }

  handleEnterPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendChat();
    }
  }

  sendChat() {
    const message = $('#data').val();
    $('#data').val('');
    this.state.socket.emit('sendchat', message);
  }

  endChat() {
    // TODO: sign client out
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
            <div className="panel panel-default">

              <div className="panel-heading">
                Chat {/* TODO: add who they're chatting with */}
              </div>

              <div className="panel-body">
                <div className="chat-wrapper" style={chatStlye}>
                  <div id="conversation">
                  </div>
                </div>
                <form>
                  <div className="form-group">
                    <input
                      id="data"
                      className="form-control"
                      onKeyPress={this.handleEnterPress}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-default pull-left"
                      onClick={this.endChat}
                    >
                      End Chat Session
                    </button>
                    <button
                      className="btn btn-default pull-right"
                      type="button"
                      id="datasend"
                      onClick={this.sendChat}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          :
          null}
        </div>
      </div>
    );
  }
}

export default AdminContainer;
