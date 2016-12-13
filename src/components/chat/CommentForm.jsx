import React, { Component } from 'react';
import io from 'socket.io-client';
import CommentList from './CommentList.jsx';


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const that = this;
    this.socket = io();
    this.socket.on('comments', comments => {
      that.setState({ comments });
    });
    this.socket.emit('fetchComments');
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    const author = this.refs.author.getDOMNode().value;
    const text = this.refs.text.getDOMNode().value;
    const comment = { author, text };
    const submitButton = this.refs.submitButton.getDOMNode();
    submitButton.innerHTML = 'Posting comment...';
    submitButton.setAttribute('disabled', 'disabled');
    this.props.submitComment(comment, function (err) {
      that.refs.author.getDOMNode().value = '';
      that.refs.text.getDOMNode().value = '';
      submitButton.innerHTML = 'Post comment';
      submitButton.removeAttribute('disabled');
    });
  }

  render() {
    return (
      <div className="commentBox">
        <h3>Comments:</h3>
        <CommentList comments={this.state.comments} />
        <CommentForm submitComment={this.submitComment} />
      </div>
    );
  }
}

export default CommentForm;
