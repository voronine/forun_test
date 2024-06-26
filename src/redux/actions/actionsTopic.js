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