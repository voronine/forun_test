const initialState = {
    id: localStorage.getItem('token'),
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return { ...state, id: action.payload, error: null };
      case 'REGISTER_FAILURE':
        return { ...state, error: action.payload };
      case 'LOGOUT_USER':
        localStorage.removeItem('token');
        return { ...state, id: null, error: null };
      default:
        return state;
    }
  };
  
  export default userReducer;
  