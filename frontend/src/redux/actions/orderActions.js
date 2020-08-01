import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,

    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,

    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,

    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,

    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
} from './actionTypes/orderTypeActions'

export const createOrder = (newOrder) => {
    return {
        type: ORDER_CREATE_REQUEST,
        newOrder
    }
}

export const listMyOrders = (sort) => {
    return {
        type: MY_ORDER_LIST_REQUEST,
        sort
    }
}
export const listMyOrderSucceededAction = (receivedOrder) => {
    return {
        type: MY_ORDER_LIST_SUCCESS,
        receivedOrder
    }
}

export const listMyOrderFailedAction = (error) => {
    return {
        type: MY_ORDER_LIST_FAIL,
        error
    }
}

export const listOrders = (sort) => {
    return {
        type: ORDER_LIST_REQUEST,
        sort
    }
}
export const listOrderSucceededAction = (receivedOrder) => {
    return {
        type: ORDER_LIST_SUCCESS,
        receivedOrder
    }
}

export const listOrderFailedAction = (error) => {
    return {
        type: ORDER_LIST_FAIL,
        error
    }
}

export const detailsOrder = (orderId) => {
    return {
        type: ORDER_DETAILS_REQUEST,
        orderId
    }
}
export const detailsOrderSucceededAction = (data) => {
    return {
        type: ORDER_DETAILS_SUCCESS,
        data
    }
}

export const detailsOrderFailedAction = (error) => {
    return {
        type: ORDER_DETAILS_FAIL,
        error
    }
}

export const payOrder = (paymentResult) => {
    return {
        type: ORDER_PAY_REQUEST,
        paymentResult
    }
}
export const payOrderSucceededAction = (data) => {
    return {
        type: ORDER_PAY_SUCCESS,
        data
    }
}
export const payOrderFailedAction = (error) => {
    return {
        type: ORDER_PAY_FAIL,
        error
    }
}

export const deleteOrder = (orderId) => {
    return {
        type: ORDER_DELETE_REQUEST,
        orderId
    }
}
export const deleteOrderSucceededAction = (data) => {
    return {
        type: ORDER_DETAILS_SUCCESS,
        data
    }
}

export const deleteOrderFailedAction = (error) => {
    return {
        type: ORDER_DETAILS_FAIL,
        error
    }
}