import React, { useState } from 'react';

const CommentList = ({ comments }) => {
    const [editCommentId, setEditCommentId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleSaveClick = () => {
        setEditText('');
        setEditCommentId(null);
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
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;
