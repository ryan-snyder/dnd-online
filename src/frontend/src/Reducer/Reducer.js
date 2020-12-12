// @flow
import { combineReducers } from 'redux';
import { createTable, createReducerMap, MapEntity, createSlice, Action, createApp } from 'robodux';
/**
 * placeholder for reducer
 * NOTE: Stuff is fucked up right now
 * TODO: Create actions with robodux and hook up to Store
 */
/**
 * State: {
 *  user:
 *  signedIn:
 *  onSignInPage:
 *  characters:
 *  parties:
 *  currentCharacter,
 * }
 */
interface State {
    user: User;
    signedIn: Boolean;
    onSignedInPage: Boolean;
}
interface User {
    email: string;
    password: String;
    characters: Array<Object>;
    parties: Array<Object>;
    _id: string
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
