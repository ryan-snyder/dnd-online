
import { state } from '../Reducer/Reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { characters, currentCharacter } from '../sagas';
import { createReducerMap } from 'robodux';
/**
 * TODO:
 * Change this to use redux/redux-saga
 */

export const saga = createSagaMiddleware(); 

const reducerObject = createReducerMap(state, characters, currentCharacter);

const reducer = combineReducers(reducerObject);

const Store = createStore(
    reducer,
    applyMiddleware(saga)
)

export default Store;
