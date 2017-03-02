import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import moment from 'moment';
import Chat from '../Chat.jsx';

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      rooms: [],
      currentRoom: null,
    };

    this.initSocket = this.initSocket.bind(this);
    this.switchRoom = this.switchRoom.bind(this);
    this.renderRoomList = this.renderRoomList.bind(this);
    this.emitUnavailable = this.emitUnavailable.bind(this);
    this.emitEmail = this.emitEmail.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token || !id) {
      this.signOut(token);
      return;
    }
    fetch(`/v1/users/${id}?access_token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.meta.error || data.data[0].id !== 1) {
          this.signOut(token);
        } else {
          this.initSocket();
        }
      })
      .catch(err => {
        console.error(err);
        this.signOut(token);
      });
  }

  initSocket() {
    const socket = io(`${window.location.hostname}:${window.location.port}`);
    socket.on('connect', () => {
      socket.emit('admin', 'admin');
    });
    socket.on('updaterooms', rooms => {
      this.setState({ rooms });
    });
    socket.on('sign-out', () => this.setState({ currentRoom: null }));
    this.setState({ socket });
  }

  signOut(token) {
    console.warn('signing out');
    fetch(`/v1/access_tokens?access_token=${token}`, {
      method: 'DELETE',
    })
    .then(res => {
      console.warn(res);
      localStorage.clear();
      window.location = `${window.location.origin}`;
    })
    .catch(err => {
      console.error(err);
      localStorage.clear();
      window.location = `${window.location.origin}`;
    });
  }

  switchRoom(e) {
    const roomId = e.target.value;
    let divId = `#enter${this.state.currentRoom}`;
    $(divId).removeClass('btn-success');
    $(divId).addClass('btn-primary');
    this.setState({ currentRoom: roomId });
    divId = `#enter${roomId}`;
    $(divId).removeClass('btn-primary');
    $(divId).addClass('btn-success');
    this.state.socket.emit('switchRoom', +roomId);
  }

  emitUnavailable(e) {
    const roomId = e.target.value;
    const divId = `#unavailable${roomId}`;
    $(divId).removeClass('btn-primary');
    $(divId).addClass('btn-danger');
    this.state.socket.emit('unavailable', roomId);
  }

  emitEmail(e) {
    const roomId = e.target.value;
    const divId = `#email${roomId}`;
    $(divId).removeClass('btn-primary');
    $(divId).addClass('btn-success');

    fetch(`/v1/mailer?room_id=${roomId}`, {
      method: 'POST',
    })
    .then(res => console.warn('email response', res))
    .catch(err => console.error(err, 'there was an error'));
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
            <td>{`${room.first_name} ${room.last_name}`}</td>
            <td>{room.category}</td>
            <td>{moment(room.createdAt).format('h:mmA')}</td>
            <td>
              <button
                className="btn btn-primary btn-sm"
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
                className="btn btn-primary btn-sm"
                key={i}
                id={`unavailable${room.roomId}`}
                value={room.roomId}
                onClick={this.emitUnavailable}
              >
                Unavailable
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary btn-sm"
                key={i}
                id={`email${room.roomId}`}
                value={room.roomId}
                onClick={this.emitEmail}
              >
                Email Chat
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
          {this.state.rooms.length ? this.renderRoomList() : <p>no rooms</p>}
          <div id="rooms"></div>
        </div>
        <div className="col-sm-6">
          {this.state.currentRoom ?
            <Chat
              socket={this.state.socket}
              isAdmin
            />
          :
          null}
        </div>
      </div>
    );
  }
}

export default AdminContainer;
