import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './src/redux/reducers/index';
import rootSaga from './src/redux/middleware/saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

import App from './src/containers/App';

export default class frontend extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider> 
        );
    }
}

sagaMiddleware.run(rootSaga);
AppRegistry.registerComponent('frontend', () => frontend);
