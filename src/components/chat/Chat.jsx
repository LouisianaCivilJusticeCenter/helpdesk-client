import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:8080'),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.state.socket.on('chat message', msg => {
      console.log('this is message', msg);
      $('#messages').append($('<li>').text(msg));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = e.target.chat.value;
    this.state.socket.emit('chat message', value);
    $('#m').val('');
    return false;
  }

  render() {
    return (
      <div>
        <ul id="messages"></ul>
        <form id="chat" onSubmit={this.handleSubmit}>
          <input name="chat" id="m" autoComplete="off" />
          <button id="chatButton">Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;
