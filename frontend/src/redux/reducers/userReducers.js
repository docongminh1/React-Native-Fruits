import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USER_LOGOUT
} from '../actions/actionTypes/userTypeActions';

const userReducers = (users = [], action) => {
    // console.warn('test action admincart: ', action)
    switch (action.type) {
        

        default:
            return users;
    }
}

export default userReducers;