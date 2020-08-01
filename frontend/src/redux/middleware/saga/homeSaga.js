import {
    FETCH_FAILED, FETCH_SUCCEEDED,FETCH_FRUITS
} from '../../actions/actionTypes/homeTypeActions';
import { put,takeLatest } from 'redux-saga/effects';
import { homeApi } from '../api/homeApi';

//takeLates chi lay action moi nhat
function* fetchFruits(){
   try {
       const receivedFruits = yield homeApi.getFruitsFromApi();
       yield put({ type:FETCH_SUCCEEDED, receivedFruits: receivedFruits });
   } catch (error) {
       yield put({ type: FETCH_FAILED, error})
   }
}
export function* watchFetchFruits() {
   yield takeLatest( FETCH_FRUITS, fetchFruits)
}