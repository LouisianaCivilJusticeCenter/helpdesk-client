/* eslint no-confusing-arrow: "off" */
/* eslint max-len: "off" */

import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { chatWrapper as chatStlye } from '../css/styles.js';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.endChat = this.endChat.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
  }

  componentDidMount() {
    // TODO: do we really want this?
    // const getDisplayName = (isAdmin, displayName) =>
    // (isAdmin && displayName === 'Attorney') ? 'me' : displayName;
    const getDisplayName = (a, b) => b;
    const isAdmin = this.props.isAdmin;
    this.props.socket.on('updatechat', (firstName, message, roomId) => {
      if (roomId) {
        // console.warn('fetching');
        $('#conversation').empty();
        $('#conversation').append(`<b>${getDisplayName(isAdmin, firstName)}: </b>${message}<br>`);
        fetch(`/v1/messages?room_id=${roomId}`)
        .then(res => res.json())
        .then(data => {
          data.data.forEach(oldMessage => {
            $('#conversation')
              .append(`<b>${getDisplayName(isAdmin, oldMessage.from_username)}: </b>${oldMessage.body}<br>`);
            this.scrollToEnd();
          });
        });
      } else {
        $('#conversation').append(`<b>${getDisplayName(isAdmin, firstName)}: </b>${message}<br>`);
        this.scrollToEnd();
      }
    });
  }

  scrollToEnd() {
    this.chatRef.scrollTop = this.chatRef.scrollHeight;
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
    this.props.socket.emit('sendchat', message);
  }

  endChat() {
    this.props.socket.emit('sign-out');
  }

  render() {
    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          {/* TODO: Chat with (firstName) do we want this? */}
        </div>

        <div className="panel-body">
          <div
            className="chat-wrapper"
            style={chatStlye}
            ref={(ref) => { this.chatRef = ref; }}
            id="conversation"
          >
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
                type="button"
                className="btn btn-warning pull-left"
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
    );
  }

}

Chat.propTypes = {
  socket: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default Chat;
