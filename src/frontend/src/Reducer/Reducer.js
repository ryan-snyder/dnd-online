// @flow
import { createSlice } from 'robodux';

interface User {
    email: string;
    password: String;
    characters: Array<Object>;
    parties: Array<Object>;
    _id: string
}

interface State {
    user: User;
    signedIn: Boolean;
    onSignedInPage: Boolean;
}

interface StateActions {
    signOut: null; 
    setSignedIn: Boolean;
    setOnSignInPage: Boolean;
    setUser: User
}


export const state: any = createSlice<State, StateActions>({
    name: 'userState',
    initialState: {
        user: {},
        signedIn: false,
        onSignedInPage: false
    },
    reducers: {
        signOut: (state) => {
            state.user = {};
            state.signedIn = false;
        },
        setSignedIn: (state, payload) => {
            state.signedIn = payload;
        },
        setOnSignInPage: (state, payload) => {
            console.log('setting onSignedInPage');
            state.onSignedInPage = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        }
    }
});
