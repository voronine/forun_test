import axios from 'axios';


export const addComment = (comment) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/comment/add', comment);
        
        dispatch({ type: 'ADD_COMMENT', payload: response.data });
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error; 
    }
};

export const fetchComments = (topicId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/comment/${topicId}`);
        
        dispatch({ type: 'SET_COMMENTS', payload: response.data });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};

export const deleteComment = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/comment/${id}`);
        
        dispatch({ type: 'DELETE_COMMENT', payload: id });
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};

export const updateComment = (id, updatedComment) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/comment/${id}`, updatedComment);
        
        dispatch({ type: 'UPDATE_COMMENT', payload: response.data });
    } catch (error) {
        console.error('Error updating comment:', error);
    }
};
