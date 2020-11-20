import React, {createContext, useReducer, useEffect} from "react";
import Reducer from '../Reducer/Reducer'


const initialState = {
    signedIn: false,
    user: {},
    onSignInPage: false
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    useEffect(() => {
       console.log(state);
    })
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;