const initialState = {
    user: null,
    loading: false,
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null
        };
      case 'REGISTER_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  