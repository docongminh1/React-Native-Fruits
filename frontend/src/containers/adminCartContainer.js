import {connect} from 'react-redux';
import AdminCartComponent from '../components/adminCart/adminCartComponent';
import { fetchAdminCartAction,
    deleteOrderAction
} from '../redux/actions/adminCartAction';

const mapStateToProps = (state) => {
    return{
        orders: state.adminCartReducers
    }
}


const mapDispatchToProps =(dispatch) => {
    return{
        onFetchAdminCart: () => {
            dispatch(fetchAdminCartAction())
        },   
        onDeleteOrder: (orderId) => {
            dispatch(deleteOrderAction(orderId))
        } 
    }
}

const adminCartContainer = connect(mapStateToProps, mapDispatchToProps)(AdminCartComponent);
export default adminCartContainer;