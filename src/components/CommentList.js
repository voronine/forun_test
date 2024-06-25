import React, { useState } from 'react';

const CommentList = ({ comments, userId, onEditComment, onDeleteComment }) => {
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditClick = (commentId, text) => {
    setEditCommentId(commentId);
    setEditText(text);
  };

  const handleSaveClick = (commentId) => {
    onEditComment(commentId, editText);
    setEditCommentId(null);
    setEditText('');
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment._id}>
          {editCommentId === comment._id ? (
            <div>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleSaveClick(comment._id)}>Save</button>
              <button onClick={() => setEditCommentId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>{comment.text}</p>
              {userId === comment.userId && (
                <div>
                  <button onClick={() => handleEditClick(comment._id, comment.text)}>Edit</button>
                  <button onClick={() => onDeleteComment(comment._id)}>Delete</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
