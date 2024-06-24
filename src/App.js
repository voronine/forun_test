import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addTopic, fetchTopics, deleteTopic, updateTopic } from './redux/actions/actionsTopic';
import { fetchComments, addComment, updateComment, deleteComment } from './redux/actions/actionsComment';
import TopicList from './components/TopicList';
import CommentList from './components/CommentList';
import RegistrationForm from './components/RegistrationForm';

Modal.setAppElement('#root'); // Устанавливаем элемент приложения для модального окна

const App = () => {
  const dispatch = useDispatch();
  const topics = useSelector(state => state.topics.topics);
  const comments = useSelector(state => state.comments ? state.comments.comments : []);
  const userId = useSelector(state => state.user ? state.user.id : null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTopicId) {
      dispatch(fetchComments(selectedTopicId));
    }
  }, [dispatch, selectedTopicId]);

  const handleTopicClick = (topicId) => {
    setSelectedTopicId(topicId);
  };

  const handleAddTopic = async () => {
    if (newTopicTitle.trim() !== '' && userId) {
      const newTopic = {
        title: newTopicTitle,
        userId: userId
      };
      await dispatch(addTopic(newTopic));
      dispatch(fetchTopics());
      setNewTopicTitle('');
    } else {
      setShowRegistration(true);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== '' && selectedTopicId && userId) {
      const comment = {
        text: newComment,
        userId: userId,
        topicId: selectedTopicId
      };
      await dispatch(addComment(comment));
      dispatch(fetchComments(selectedTopicId));
      setNewComment('');
    } else {
      setShowRegistration(true);
    }
  };

  const handleEditComment = (commentId, text) => {
    const updatedComment = { text };
    dispatch(updateComment(commentId, updatedComment));
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleDeleteTopic = (topicId) => {
    dispatch(deleteTopic(topicId));
  };

  const handleEditTopic = (topicId) => {
    dispatch(updateTopic(topicId));
  };

  const closeModal = () => {
    setShowRegistration(false);
  };

  return (
    <div>
      <Modal
        isOpen={showRegistration}
        onRequestClose={closeModal}
        contentLabel="Registration Modal"
      >
        <RegistrationForm />
        <button onClick={closeModal}>Close</button>
      </Modal>

      {selectedTopicId ? (
        <div>
          <button onClick={() => setSelectedTopicId(null)}>Back to Topics</button>
          <h2>Comments for Topic</h2>
          {comments.length > 0 ? (
            <CommentList
              comments={comments}
              userId={userId}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          ) : (
            <div>Loading comments...</div>
          )}
          <div>
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      ) : (
        <div>
          {topics.length > 0 ? (
            <TopicList
              topics={topics}
              onTopicClick={handleTopicClick}
              onDeleteTopic={handleDeleteTopic}
              onEditTopic={handleEditTopic}
              userId={userId}
            />
          ) : (
            <div>No topics available</div>
          )}
          <div>
            <input
              type="text"
              placeholder="Enter new topic"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
            />
            <button onClick={handleAddTopic}>Add Topic</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
