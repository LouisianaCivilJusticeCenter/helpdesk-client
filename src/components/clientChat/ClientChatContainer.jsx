import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';
import $ from 'jquery';

class ClientChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(`${window.location.protocol}//${window.location.hostname}:8080`),
      user: null,
    };
  }

  componentDidMount() {
    const context = this;
    const id = this.props.params.id;
    const socket = this.state.socket;
    const token = localStorage.getItem('token');
    socket.on('connect', () => {
      fetch(`/v1/users/${id}?access_token=${token}`)
      .then(res => res.json())
      .then(res => {
        if (res.meta.error) {
          localStorage.clear();
          browserHistory.push('/sign-in');
        } else {
          context.state.socket.emit('adduser', res.data[0]);
        }
      });
    });

    socket.on('updatechat', (username, data) => {
      $('#conversation').append('<b>'+ username + ':</b> ' + data + '<br>');
    });

    $('#datasend').click(() => {
      const message = $('#data').val();
      $('#data').val('');
      socket.emit('sendchat', message);
    });

    $('#data').keypress(function(e) {
      if (e.which === 13) {
        $(this).blur();
        $('#datasend').focus().click();
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <div id="conversation"></div>
          <input id="data" />
          <input type="button" id="datasend" value="send" />
        </div>
      </div>
    );
  }
}

export default ClientChatContainer;
