import { 
    FETCH_ORDERS, FETCH_SUCCEEDED_ORDER, FETCH_FAILED_ORDER,
    DELETE_ORDER, DELETE_ORDER_SUCCEEDED
} from './actionTypes/adminCartTypeAction'

export const fetchAdminCartAction = (sort) =>{
   return{
       type: FETCH_ORDERS,
       sort
   }
}

export const fetchSucceededOrderAction = (recievedOrders) =>{
   return{
       type: FETCH_SUCCEEDED_ORDER,
       recievedOrders
   }
}

export const fetchFailedOrderAction = (error) =>{
   return{
       type: FETCH_FAILED_ORDER,
       error
   }
}

export const deleteOrderAction = (orderId) =>{
    return{
        type: DELETE_ORDER,
        orderId
    }
}

export const deleteOrderSuccessAction = (orderId) =>{
    return{
        type: DELETE_ORDER_SUCCEEDED,
        orderId
    }
}