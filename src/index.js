import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import upcomingMatchesReducer from './Store/reducer/upcomingMatches';
import predictionResultsReducer from './Store/reducer/predictionResults';
import matchResultPredictionInputReducer from './Store/reducer/matchResultPredictionInput';
import completedMatchesReducer from './Store/reducer/completedMatches';
import authReducer from './Store/reducer/auth';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    upcomingMatches: upcomingMatchesReducer,
    completedMatches: completedMatchesReducer,
    matchResultPredictionInput: matchResultPredictionInputReducer,
    auth: authReducer,
    predictionResults: predictionResultsReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
