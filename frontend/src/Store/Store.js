import React, {createContext, useReducer} from "react";
import { reducer, initial } from '../Reducer/Reducer'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
/**
 * TODO:
 * Change this to use redux/redux-saga
 */

export const saga = createSagaMiddleware(); 

const Store = createStore(
    reducer,
    applyMiddleware(saga)
)

export const Context = createContext(initial);
export default Store;