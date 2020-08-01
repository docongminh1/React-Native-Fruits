import { 
    FETCH_FRUITS_PRODUCT, FETCH_SUCCEEDED_PRODUCT, FETCH_FAILED_PRODUCT
} from '../actions/actionTypes/productTypeAction';

const productReducers = (fruits = [], action) => {
    // console.warn('test action product: ', action)
    // console.log('test action product: ', action)
    switch(action.type) {
        case FETCH_SUCCEEDED_PRODUCT:
            return action.receivedFruitsProduct;
        case FETCH_FAILED_PRODUCT:
            return [];
        
        default:
            return fruits;
    }
}

export default productReducers;