// @flow
import { call, put, putResolve, takeEvery, takeLatest } from 'redux-saga/effects'
import { createAssign, createSlice, createAction } from 'robodux';
import Api from '../api';
import { defaultCharacter } from '../util/util';

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
    setCharacters: Characters;
    removeCharacter: string;
    updateCharacter: Character;
    clearCharacters: empty;
}
interface CurrentCharacter {
    currentCharacter: Character
}

interface Party {
    id: number,
    members: Array<Object>,
    inviteURL: string
}

interface Parties {
    parties: Party[]
}
interface PartyActions {
    addParty: Party;
    setParties: Parties;
    removeParty: string;
    clearParties: empty;
}


export const characters: any = createSlice<Characters, CharacterActions>({
    name: 'characters',
    initialState: [],
    reducers: {
        mergeCharacter: (state, payload) => {
            return state.concat([payload.data]);
        },
        setCharacters: (state, payload) => payload.data,
        removeCharacter: (state, payload) => {
            const index = state.findIndex(char => char._id === payload);
            state.splice(index, 1);
        },
        updateCharacter: (state, payload) => {
           const index = state.findIndex(char => char._id === payload.id);
           state.splice(index, 1, {
               owner: state[index].owner,
               character: payload.character,
               _id: state[index]._id
            });
        },
        clearCharacters: (state) => { state = []; },

    }
});

export const parties: any = createSlice<Parties, PartyActions>({
    name: 'parties',
    initialState: [],
    reducers: {
        addParty: (state, payload) => {
            return state.concat([payload.data]);
        },
        setParties: (state, payload) => payload.data,
        removeParty: (state, payload) => {
            const index = state.findIndex(party => party._id === payload);
            state.splice(index, 1);
        },
        clearParties: (state) => { state = []; },
    }
});

export const currentCharacter: any = createAssign<CurrentCharacter>({
    name: 'currentCharacter',
    initialState: {
        character: defaultCharacter
    }
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
        const data: Character = yield call([this, Api.createCharacter], action.payload.character, action.payload.user);
        console.log('Created character');
        console.log(data);
        yield putResolve(characters.actions.mergeCharacter(data));
    } catch(error) {
        console.log(error);
        return; 
    }
}

export function* onGetCharacter(action: any): Generator<any, void, Character> { 
    try {
        const resp: Character = yield call(Api.getCharacter, action.payload.id);
        console.log('Got character');
        console.log(resp);
        yield put(setCurrentCharacter(resp));
    } catch(error) {
        console.log(error);
    }
}

export function* onGetCharacters(): Generator<any, void, Characters> {
    try {
        const resp: Characters = yield call(Api.getAllCharacters);
        console.log('Got All characters');
        console.log(resp);
        yield put(characters.actions.setCharacters(resp));
    } catch(error) {
        console.log(error);
    }
}

export function* onUpdateCharacter(action: any): Generator<any, void, empty> {
    try {
        yield call(Api.updateCharacter, action.payload.id, action.payload.character);
        yield put(characters.actions.updateCharacter(action.payload));
    } catch(error) {
        console.log(error);
    }
}

export function* onDeleteCharacter(action: any): Generator<any, void, string> {
    try {
        yield call(Api.deleteCharacter, action.payload.id);
        yield put(characters.actions.removeCharacter(action.payload.id));
    } catch(error) {
        console.log(error);
    }
}

export function* onDeleteParty(action: any): Generator<any, void, string> {
    try {
        const resp = yield call(Api.deleteParty, action.payload.id);
        console.log(resp);
        yield put(parties.actions.removeParty(action.payload.id));
    } catch(error) {
        console.log(error);
    }
}

export function* onGetParties(): Generator<any, void, empty> {
    try {
        const data = yield call(Api.getAllParties);
        console.log(data);
        yield put(parties.actions.setParties(data));
    } catch(error) {
        yield put({type: "FETCH_ERROR", error});
    }
}

export function* onCreateParty(action: any): Generator<any, void, Party> {
    try {
        const data: Party = yield call(Api.createParty, action.payload.name);
        console.log('Created party');
        yield put(parties.actions.addParty(data));
    } catch(error) {
        console.log(error);
    }
}

export const getCharacter: any = createAction<string>('GET_CHARACTER');
export const getCharacters: any = createAction<string>('GET_CHARACTERS');
export const createCharacter: any = createAction<string>('CREATE_CHARACTER');
export const getParties: any = createAction<string>('GET_PARTIES');
export const createParty: any = createAction<string>('CREATE_PARTY');
export const deleteCharacter: any = createAction<string>('DELETE_CHARACTER');
export const deleteParty: any = createAction<string>('DELETE_PARTY');
export const updateCharacter: any = createAction<string>('UPDATE_CHARACTER');

function* mySaga(): Generator<any, void, empty> {
    yield takeEvery(`${getCharacter}`, onGetCharacter);
    yield takeLatest(`${getCharacters}`, onGetCharacters);
    yield takeLatest(`${getParties}`, onGetParties);
    yield takeEvery(`${createCharacter}`, onCreateCharacter);
    yield takeEvery(`${createParty}`, onCreateParty);
    yield takeEvery(`${deleteCharacter}`, onDeleteCharacter);
    yield takeEvery(`${deleteParty}`, onDeleteParty);
    yield takeEvery(`${updateCharacter}`, onUpdateCharacter);
}

export default mySaga;
