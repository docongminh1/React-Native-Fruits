import {
    ADD_FRUIT,
    FETCH_FRUITS_ADMIN, FETCH_SUCCEEDED_ADMIN, FETCH_FAILED_ADMIN,
    UPDATE_FRUIT, UPDATE_SUCCEEDED,
    DELETE_FRUIT, DELETE_SUCCEEDED
} from '../../actions/actionTypes/adminTypeAction';
import { put,takeLatest } from 'redux-saga/effects';
import { adminApi } from '../api/adminApi';

//takeLates chi lay action moi nhat
function* fetchFruitsAdmin(){
   try {
       const receivedFruitsAdmin = yield adminApi.getFruitsAdminFromApi();
       yield put({ type:FETCH_SUCCEEDED_ADMIN, receivedFruitsAdmin: receivedFruitsAdmin });
   } catch (error) {
       yield put({ type: FETCH_FAILED_ADMIN, error})
   }
}
export function* watchFetchFruitsAdmin() {
   yield takeLatest( FETCH_FRUITS_ADMIN, fetchFruitsAdmin)
}

function* addNewFruit(action){
    // console.warn('addNewFruit', action)  
    try {
        const result = yield adminApi.createFruitsAdminFromApi(action.newFruit);
        if(result === true){
            yield put({ type: FETCH_FRUITS_ADMIN, sort: 'desc'})
        }
    } catch (error) {
        
    }
}
export function* watchAddFruit() {
    yield takeLatest( ADD_FRUIT, addNewFruit)
}

//update movie
function* updateFruit(action){
    try {
        const result = yield adminApi.updateFruitsAdminFromApi(action.updatedFruit);
        if(result === true){
            yield put({ type: UPDATE_SUCCEEDED, updatedFruit: action.updatedFruit})
        }
    } catch (error) {
        
    }
}
export function* watchUpdateFruit() {
    yield takeLatest( UPDATE_FRUIT, updateFruit)
}

//delete
function* deleteFruit(action){
    try {
        const result = yield adminApi.deleteFruitsAdminFromApi(action.deletedFruitId);
        if(result === true){
            yield put({ type: DELETE_SUCCEEDED, deletedFruit: action.deletedFruitId})
            console.log("deletedFruit",deletedFruit)
        }
    } catch (error) {
        
    }
}
export function* watchDeleteFruit() {
    yield takeLatest( DELETE_FRUIT, deleteFruit)
}