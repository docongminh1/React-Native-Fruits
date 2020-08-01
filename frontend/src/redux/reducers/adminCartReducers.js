import {
    FETCH_FAILED_ORDER, FETCH_SUCCEEDED_ORDER, FETCH_ORDERS,
    DELETE_ORDER_SUCCEEDED, DELETE_ORDER
} from '../actions/actionTypes/adminCartTypeAction';

const adminCartReducers = (orders = [], action) => {
    // console.warn('test action admincart: ', action)
    switch (action.type) {
        case FETCH_SUCCEEDED_ORDER:
            return action.recievedOrders;
        case FETCH_FAILED_ORDER:
            return [];
            
        case DELETE_ORDER_SUCCEEDED:
            const filteredOrders = fruits.filter(eachOrder => {
                return eachOrder._id.toString() !== action.orderId.toString();
            })
            // console.log("reducerDelete:", filteredOrders)
            return filteredOrders;


        default:
            return orders;
    }
}

export default adminCartReducers;