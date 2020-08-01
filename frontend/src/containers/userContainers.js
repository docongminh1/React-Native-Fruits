import {connect} from 'react-redux';
import loginComponent from '../components/login/loginComponent';
import { 
    pressLoginAction
} from '../redux/actions/userActions';

const mapStateToProps = (state) => {
    return{
        users: state.userReducers
    }
}


const mapDispatchToProps =(dispatch) => {
    return{
        onPressLogin: (User) => {
            dispatch(pressLoginAction(User))
        },
    }
}

const userContainers = connect(mapStateToProps, mapDispatchToProps)(loginComponent);
export default userContainers;