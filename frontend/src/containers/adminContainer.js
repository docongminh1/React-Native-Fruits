import {connect} from 'react-redux';
import AdminComponent from '../components/admin/adminComponent';
import { 
        addItemAction,
        fetchFruitsAdminAction, fetchSucceededAdminAction, fetchFailedAdminAction,
        updateItemAction, updateItemSuccessAction,
        deleteItemAction, deleteItemSuccessAction
} from '../redux/actions/adminAction';

const mapStateToProps = (state) => {
    return{
        fruits: state.adminReducers
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        onFetchFruitAdmin: () => {
            dispatch(fetchFruitsAdminAction())
        },
        onAddItem: (newFruit) => {
            dispatch(addItemAction(newFruit))
        },
        //Update
        onUpdateItem: (updatedFruit) => {
            dispatch(updateItemAction(updatedFruit))
        },
        onUpdateItemSuccess: (updatedFruit) => {
            dispatch(updateItemSuccessAction(updatedFruit))
        },
        //Delete
        onDeleteItem: (deletedFruitId) => {
            dispatch(deleteItemAction(deletedFruitId))
        }    
    }
}

const adminContainer = 
    connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
export default adminContainer;