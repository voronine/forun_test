import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import commentReducer from './reducers/commentReducer';
import topicReducer from './reducers/topicReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    comments: commentReducer,
    topics: topicReducer,
    user: userReducer

});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
