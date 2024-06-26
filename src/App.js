import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, logoutUser } from './redux/actions/actionsUser';
import { addTopic, fetchTopics } from './redux/actions/actionsTopic';
import { fetchComments, addComment } from './redux/actions/actionsComment';
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
    const token = localStorage.getItem('token');
    if (token) {
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
        topicId: selectedTopicId
      };
      await dispatch(addComment(comment));
      dispatch(fetchComments(selectedTopicId));
      setNewComment('');
    } else {
      setShowRegistration(true);
    }
  };

  const closeModal = () => {
    setShowRegistration(false);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
    // добавить доп действия обновление состояния авторизации
    dispatch({ type: 'REGISTER_SUCCESS' });
  };

  const handleLogout = () => {
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
