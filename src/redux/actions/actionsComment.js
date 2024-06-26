import axios from 'axios';

export const addComment = (comment) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        const response = await axios.post('http://localhost:5000/api/comment/add', comment, { headers });
        dispatch({ type: 'ADD_COMMENT', payload: response.data });
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

export const fetchComments = (topicId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/comment/topic/${topicId}`);
        dispatch({ type: 'SET_COMMENTS', payload: response.data });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};
