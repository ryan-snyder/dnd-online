import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '../api';

function* createCharacter(action) {
    try {
        const data = yield call(Api.createCharacter(action.payload.character, action.payload.user));
        yield put({type: "CREATE_CHARACTER_SUCCESS", data});
    } catch(error) {
        yield put({type: "FETCH_ERROR", error });
    }
}

export function* getCharacter(action){
    try {
        const data = yield call(Api.getCharacter(action.payload.id));
        yield put({type: "GET_CHARACTER_SUCCESS", data});
    } catch(error) {
        yield put({type: "FETCH_ERROR", error});
    }
}

export function* getCharacters() {
    try {
        const data = yield call(Api.getAllCharacters());
        yield put({type: "GET_ALL_CHARACTERS_SUCCESS", data});
    } catch(error) {
        yield put({type: "FETCH_ERROR", error});
    }
}

export function* getParties() {
    try {
        const data = yield call(Api.getAllParties());
        yield put({type: "GET_ALL_PARTIES_SUCCESS", data});
    } catch(error) {
        yield put({type: "FETCH_ERROR", error});
    }
}

function* mySaga() {
    yield takeEvery("GET_CHARACTER", getCharacter);
    yield takeLatest("GET_ALL_CHARACTERS", getCharacters);
    yield takeLatest("GET_ALL_PARTIES", getParties);
    yield takeEvery("CREATE_CHARACTER", createCharacter(action));
}

export default mySaga;
