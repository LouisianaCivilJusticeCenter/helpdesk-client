import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';
import $ from 'jquery';
import { chatWrapper as chatStlye } from '../../css/styles.js';


class ClientChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(`${window.location.protocol}//${window.location.hostname}:8080`),
      user: null,
    };
    this.sendChat = this.sendChat.bind(this);
    this.endChat = this.endChat.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
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

    // $('#datasend').click(() => {
    //   const message = $('#data').val();
    //   $('#data').val('');
    //   socket.emit('sendchat', message);
    // });
    // 
    // $('#data').keypress(function(e) {
    //   if (e.which === 13) {
    //     $(this).blur();
    //     $('#datasend').focus().click();
    //   }
    // });
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

  render() {
    return (
      <div className="row">
        <p className="text-center">
          Welcome! You can chat with an attorney below.
        </p>

        <div className="col-sm-6 col-sm-offset-3">
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
        </div>
      </div>
    );
  }
}

export default ClientChatContainer;
