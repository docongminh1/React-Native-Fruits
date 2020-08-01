import { 
    FETCH_FRUITS, FETCH_SUCCEEDED, FETCH_FAILED
} from '../actions/actionTypes/homeTypeActions';

const homeReducers = (fruits = [], action) => {
    // console.warn('test action: ', action)
    switch(action.type) {
        case FETCH_SUCCEEDED:
            return action.receivedFruits;
        case FETCH_FAILED:
            return [];
        
        default:
            return fruits;
    }
}

export default homeReducers;