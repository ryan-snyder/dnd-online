
import { state } from '../Reducer/Reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { characters, currentCharacter, parties } from '../sagas';
import { createReducerMap } from 'robodux';
import logger from 'redux-logger';
/**
 * TODO:
 * Change this to use redux/redux-saga
 */

export const saga = createSagaMiddleware(); 

const reducerObject = createReducerMap(state, characters, currentCharacter, parties);

const reducer = combineReducers(reducerObject);

const Store = createStore(
    reducer,
    applyMiddleware(saga, logger)
)

export default Store;
