import React, { PropTypes } from 'react';

const Comment = ({ comment }) => (
  <div className="comment">
    <span className="author">{comment.author}</span> said:<br />
    <div className="body">{comment.text}</div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
