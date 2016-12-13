import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:8080'),
    };
    this.switchRoom = this.switchRoom.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.id;
    const socket = this.state.socket;
    socket.on('connect', function(){
        socket.emit('adduser', 'ali', id);
    });

    socket.on('updatechat', function (username, data) {
        $('#conversation').append('<b>'+ username + ':</b> ' + data + '<br>');
    });


    socket.on('updaterooms', function (rooms, current_room) {

        $('#rooms').empty();
        $.each(rooms, function(key, value) {
            if(value == current_room){
                $('#rooms').append('<div>' + value + '</div>');
            }
            else {
                $('#rooms').append('<div>' + value + '</div>');
            }
        });
    });

    $('#datasend').click( function() {
       var message = $('#data').val();
       $('#data').val('');
       socket.emit('sendchat', message);
     });

     $('#data').keypress(function(e) {
         if(e.which == 13) {
             $(this).blur();
             $('#datasend').focus().click();
         }
     });
  }

  switchRoom(room) {
    this.state.socket.emit('switchRoom', room);
  }

  render() {
    return (
      <div>
        <div>
          <b>ROOMS</b>
          <div id="rooms"></div>
        </div>

        <div >
          <div id="conversation"></div>
          <input id="data" />
          <input type="button" id="datasend" value="send" />
        </div>
      </div>
    );
  }
}

export default Chat;
