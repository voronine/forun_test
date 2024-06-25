import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });

  try {
    const response = await axios.post('/api/register', userData);
    console.log('Registration response:', response.data);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Registration error:', error.response.data);
    dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.msg });
    throw error;
  }
};
