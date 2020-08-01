import {
    FETCH_FAILED_ORDER, FETCH_SUCCEEDED_ORDER,FETCH_ORDERS,
    DELETE_ORDER, DELETE_ORDER_SUCCEEDED
} from '../../actions/actionTypes/adminCartTypeAction';
import { put,takeLatest } from 'redux-saga/effects';
import { adminCartApi } from '../api/adminCartApi';

//takeLates chi lay action moi nhat
function* fetchOrderAdmin(){
   try {
       const recievedOrders = yield adminCartApi.getOrderAdminFromApi();
       yield put({ type:FETCH_SUCCEEDED_ORDER, recievedOrders: recievedOrders });
   } catch (error) {
       yield put({ type: FETCH_FAILED_ORDER, error})
   }
}
export function* watchFetchOrderAdmin() {
   yield takeLatest( FETCH_ORDERS, fetchOrderAdmin)
}

function* deleteOrder(action){
    try {
        const result = yield adminCartApi.deleteOrderFromApi(action.orderId);
        if(result === true){
            yield put({ type: DELETE_ORDER_SUCCEEDED, deleteOrder: action.orderId})
            console.log("deleted Order", deleteOrder)
        }
    } catch (error) {
        
    }
}
export function* watchDeleteOrder() {
    yield takeLatest( DELETE_ORDER, deleteOrder)
}