import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';
import $ from 'jquery';
import Chat from '../Chat.jsx';

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
    // 
    // socket.on('updatechat', (username, message) => {
    //   $('#conversation').append(`<b>${username}:</b> ${message}<br />`);
    // });
  }

  render() {
    return (
      <div className="row">
        <p className="text-center">
          Welcome! You can chat with an attorney below.
        </p>

        <div className="col-sm-6 col-sm-offset-3">
          <Chat socket={this.state.socket} />
        </div>
      </div>
    );
  }
}

ClientChatContainer.propTypes = {
  params: PropTypes.object.isRequired,
};

export default ClientChatContainer;
