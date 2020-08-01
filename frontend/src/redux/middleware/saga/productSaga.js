import {
    FETCH_FAILED_PRODUCT, FETCH_SUCCEEDED_PRODUCT,FETCH_FRUITS_PRODUCT
} from '../../actions/actionTypes/productTypeAction';
import { put,takeLatest } from 'redux-saga/effects';
import { productApi } from '../api/productApi';

//takeLates chi lay action moi nhat
function* fetchFruitsProduct(){
   try {
       const receivedFruitsProduct = yield productApi.getFruitsProductFromApi();
       yield put({ type:FETCH_SUCCEEDED_PRODUCT, receivedFruitsProduct: receivedFruitsProduct });
   } catch (error) {
       yield put({ type: FETCH_FAILED_PRODUCT, error})
   }
}
export function* watchFetchFruitsProduct() {
   yield takeLatest( FETCH_FRUITS_PRODUCT, fetchFruitsProduct)
}