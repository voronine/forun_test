import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, logoutUser } from './redux/actions/actionsUser';
import { addTopic, fetchTopics, deleteTopic, updateTopic } from './redux/actions/actionsTopic';
import { fetchComments, addComment, updateComment, deleteComment } from './redux/actions/actionsComment';
import TopicList from './components/TopicList';
import CommentList from './components/CommentList';
import RegistrationForm from './components/RegistrationForm';

Modal.setAppElement('#root');

const App = () => {
  const dispatch = useDispatch();
  const topics = useSelector(state => state.topics.topics);
  const comments = useSelector(state => state.comments ? state.comments.comments : []);
  const userId = useSelector(state => state.user ? state.user.id : null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTopicId) {
      dispatch(fetchComments(selectedTopicId));
    }
  }, [dispatch, selectedTopicId]);

  useEffect(() => {
    // Проверяем наличие токена в localStorage при загрузке страницы
    const token = localStorage.getItem('token');
    if (token) {
      // Диспатчим успешную регистрацию с токеном
      dispatch({ type: 'REGISTER_SUCCESS', payload: token });
    }
  }, [dispatch]);

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

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
    // Можно добавить дополнительные действия, например, обновление состояния авторизации
    dispatch({ type: 'REGISTER_SUCCESS' }); // Диспатчим действие успешной регистрации
  };

  const handleLogout = () => {
    // Очистка токена из localStorage при выходе из системы
    localStorage.removeItem('token');
    dispatch(logoutUser());
  };

  return (
    <div>
      <Modal
        isOpen={showRegistration}
        onRequestClose={closeModal}
        contentLabel="Регистрационная форма"
      >
        <RegistrationForm onClose={closeModal} onSuccess={handleRegistrationSuccess} />
        <button onClick={closeModal}>Закрыть</button>
      </Modal>

      <Modal
        isOpen={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
        contentLabel="Подтверждение регистрации"
      >
        <h2>Вы успешно зарегистрированы!</h2>
      </Modal>

      {userId ? (
        <button onClick={handleLogout}>Выйти</button>
      ) : (
        <button onClick={() => setShowRegistration(true)}>Регистрация</button>
      )}

      {selectedTopicId ? (
        <div>
          <button onClick={() => setSelectedTopicId(null)}>Назад к темам</button>
          <h2>
            {topics.find(topic => topic._id === selectedTopicId)?.title || "Загрузка..."}
          </h2>
          {comments.length > 0 ? (
            <CommentList
              comments={comments}
              userId={userId}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          ) : (
            <div>Загрузка комментариев...</div>
          )}
          <div>
            <input
              type="text"
              placeholder="Добавить комментарий"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!userId}
            />
            <button onClick={handleAddComment} disabled={!userId}>Добавить комментарий</button>
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
            <div>Нет доступных тем</div>
          )}
          <div>
            <input
              type="text"
              placeholder="Введите новую тему"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              disabled={!userId}
            />
            <button onClick={handleAddTopic} disabled={!userId}>Добавить тему</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
