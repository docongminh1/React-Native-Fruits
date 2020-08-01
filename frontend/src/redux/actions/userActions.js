import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USER_LOGOUT
} from './actionTypes/userTypeActions'


export const pressLoginAction = (User) => {
    return{
        type: USER_SIGNIN_REQUEST,
        User
    }
}

export const updateInfoAction = (updateUser) => {
    return{ 
        type: USER_UPDATE_REQUEST, 
        updateUser
    };
}


export const logout = () => {
    return{ 
        type: USER_LOGOUT
    }
}