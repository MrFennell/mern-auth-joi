import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/root';
import { composeWithDevTools } from 'redux-devtools-extension';

export default preloadedState => (
    createStore(
        reducer,
        preloadedState,
        composeWithDevTools(
        applyMiddleware(thunk),
        )
    )
);