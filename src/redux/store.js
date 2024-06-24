import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import commentReducer from './reducers/commentReducer';
import topicReducer from './reducers/topicReducer';

const rootReducer = combineReducers({
    comment: commentReducer,
    topics: topicReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
