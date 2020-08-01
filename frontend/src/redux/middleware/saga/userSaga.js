import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USER_LOGOUT
} from '../../actions/actionTypes/userTypeActions';
import { put,takeLatest } from 'redux-saga/effects';
import { userApi } from '../api/userApi';

function* logIn(action){
    console.warn('Log in saga', action)  
    try {
        const result = yield userApi.logIn(action.User);
        if(result === true){
            yield put({ type: USER_SIGNIN_SUCCESS, sort: 'desc'})
        }
    } catch (error) {
        console.log(error)
    }
}
export function* watchLogIn() {
    yield takeLatest( USER_SIGNIN_REQUEST, logIn)
}
