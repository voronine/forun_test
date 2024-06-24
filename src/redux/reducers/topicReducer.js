const initialState = {
    topics: [],
};

const topicReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOPICS':
            return {
                ...state,
                topics: action.payload,
            };
        case 'ADD_TOPIC':
            return {
                ...state,
                topics: [...state.topics, action.payload],
            };
        case 'DELETE_TOPIC':
            return {
                ...state,
                topics: state.topics.filter(topic => topic._id !== action.payload),
            };
        case 'UPDATE_TOPIC':
            return {
                ...state,
                topics: state.topics.map(topic =>
                    topic._id === action.payload._id ? action.payload : topic
                ),
            };
        default:
            return state;
    }
};

export default topicReducer;
