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
        default:
            return state;
    }
};

export default topicReducer;
