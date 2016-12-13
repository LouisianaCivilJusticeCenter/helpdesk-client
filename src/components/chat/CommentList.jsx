import React, { PropTypes } from 'react';

const CommentList = ({ comments }) => {
  let Comments = (<div>Loading comments...</div>);
  if (comments) {
    Comments = comments.map((comment) =>
      (<Comment comment={comment} />)
    );
  }
  return (
    <div className="commentList">
      {Comments}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.object,
};

export default CommentList;
