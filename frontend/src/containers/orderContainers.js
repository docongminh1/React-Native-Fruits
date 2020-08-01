import {connect} from 'react-redux';
import OrderComponent from '../components/order/orderComponent';
import { 
    createOrder,
    listMyOrders, listMyOrderSucceededAction, listMyOrderFailedAction,
    listOrders, listOrderSucceededAction, listOrderFailedAction,
    detailsOrder, detailsOrderSucceededAction, detailsOrderFailedAction,
    payOrder, payOrderSucceededAction, payOrderFailedAction,
    deleteOrder, deleteOrderSucceededAction, deleteOrderFailedAction
} from '../redux/actions/orderActions';

const mapStateToProps = (state) => {
    return{
        orders: state.orderReducers
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        onCreateOrder: (newOrder) => {
            dispatch(createOrder(newOrder))
        },
        onListMyOrders: () => {
            dispatch(listMyOrders())
        },
        onListOrders: () => {
            dispatch(listOrders())
        },
        onDetailsOrder: (orderId) => {
            dispatch(detailsOrder(orderId))
        },
        onPayOrder: (paymentResult) => {
            dispatch(payOrder(paymentResult))
        },
        onDeleteOrder: (orderId) => {
            dispatch(deleteOrder(orderId))
        }    
    }
}

const orderContainer = 
    connect(mapStateToProps, mapDispatchToProps)(OrderComponent);
export default orderContainer;