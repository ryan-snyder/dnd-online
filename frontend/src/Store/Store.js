import React, {createContext, useReducer} from "react";
import Reducer from '../Reducer/Reducer'
/**
 * TODO:
 * Change this to use redux/redux-saga
 */
const initialState = {
    signedIn: false,
    user: {},
    onSignInPage: false,
    characters: [],
    parties: []
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;