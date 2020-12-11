// @flow
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { createTable, createReducerMap, createAction, createAssign, createSlice } from 'robodux';
import Api from '../api';

/**
 * NOTE: These actions are seperate from our other actions
 * TODO: Add robodux to these actions, hook up to other actions?
 * State:
 * characters: [character],
 * currentCharacter: character,
 * parties: [party]
 */
//Make interfaces for character, and party
// TODO: Seperate into seperate interfaces
interface CharacterDefault {
    description: {
        name: string,
        playerName: string,
        age: string,
        gender: string,
        height: string,
        weight: string
    },
    class: {
        name: string
    },
    race: {
        name: string
    },
    level: number,
    alignment: string,
    background: {
        name: string
    },
    spells: {
        cantrips: [{
            name: string
        }],
        spells: [{
            name: string
        }]
    },
    equipment: Array<string>,
    stats: {
        abilities: {
            str: number,
            dex: number,
            con: number,
            int: number,
            wis: number,
            cha: number
        },
        feats: [{
            name: string
        }]
    },
    proficiencies: [{
        name: string
    }]
};

interface Character {
    id: string,
    character: CharacterDefault,
}

interface Characters {
    characters: Character[]
}

interface CharacterActions {
    mergeCharacter: Character;
    setCharacters: Characters
}
interface CurrentCharacter {
    currentCharacter: Character
}

export const characters: any = createSlice<Characters, CharacterActions>({
    name: 'characters',
    initialState: { characters: []},
    reducers: {
        mergeCharacter: (state, payload) => {
            state.characters= [
                ...state,
                payload
            ];
        },
        setCharacters: (state, payload) => {
            state.characters = payload; 
        }
    }
});

export const currentCharacter: any = createAssign<CurrentCharacter>({
    name: 'currentCharacter',
    initialState: {}
});
// These actions are simply performing those actions on the reducer state. not the api


const {
    set: setCurrentCharacter,
  } = currentCharacter.actions;
  // helper when there are multiple slices inside a single package -- which is
  // allowed and suggested.
  // selectors are always prefixed with `select`.  These should be exported so
  // other packages and the UI layer can use them

/**
 * Future Model for changes/saves:
 * Make changes to state
 * Make bulk updates/saves to database
 */
export function* onCreateCharacter(action: any): Generator<any, void, Character> {
    try {
        const data: Character = yield call(Api.createCharacter(action.payload.character, action.payload.user));
        yield put(characters.actions.mergeCharacter(data));
    } catch(error) {
        console.log(error);
        return; 
    }
}

export function* onGetCharacter(action: any): Generator<any, void, Character> { 
    try {
        const data: Character = yield call(Api.getCharacter(action.payload.id));
        yield put(setCurrentCharacter(data));
    } catch(error) {
        console.log(error);
    }
}

export function* onGetCharacters(): Generator<any, void, Characters> {
    try {
        const data: Characters = yield call(Api.getAllCharacters());
        yield put(characters.actions.setCharacters(data));
    } catch(error) {
        console.log(error);
    }
}

export function* getParties(): Generator<any, void, empty> {
    try {
        const data = yield call(Api.getAllParties());
        console.log('Got parties. work in progress')
    } catch(error) {
        yield put({type: "FETCH_ERROR", error});
    }
}

export const getCharacter: any = createAction<string>('GET_CHARACTER');
export const getCharacters: any = createAction<string>('GET_CHARACTERS');
export const createCharacter: any = createAction<string>('CREATE_CHARACTER');
function* mySaga(): Generator<any, void, empty> {
    yield takeEvery(`${getCharacter}`, onGetCharacter);
    yield takeLatest(`${getCharacters}`, onGetCharacters);
    //yield takeLatest("GET_ALL_PARTIES", getParties);
    yield takeEvery(`${createCharacter}`, onCreateCharacter);
}

export default mySaga;
