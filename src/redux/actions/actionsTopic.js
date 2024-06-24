import axios from 'axios'

export const addTopic = (topic) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/topic/add', topic);

        dispatch({ type: 'ADD_TOPIC', payload: response.data });
    } catch (error) {
        console.error('Error adding topic:', error);
        throw error;
    }
};

export const fetchTopics = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/topic');
        
        dispatch({ type: 'SET_TOPICS', payload: response.data });
    } catch (error) {
        console.error('Error fetching topics:', error);
    }
};

export const deleteTopic = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/topic/${id}`);
        
        dispatch({ type: 'DELETE_TOPIC', payload: id });
    } catch (error) {
        console.error('Error deleting topic:', error);
    }
};

export const updateTopic = (id, updatedTopic) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/topic/${id}`, updatedTopic);
        
        dispatch({ type: 'UPDATE_TOPIC', payload: response.data });
    } catch (error) {
        console.error('Error updating topic:', error);
    }
};
