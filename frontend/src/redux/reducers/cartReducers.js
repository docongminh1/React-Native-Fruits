import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT
} from '../actions/actionTypes/cartTypeActions';

function cartReducers( state= { cartItems : [], shipping : {}, payment : {} }, action) {
    // console.warn('test action cart : ', action)
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.newCart
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
                return {
                    cartItems:
                    state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return { cartItems: [...state.cartItems, item] };
        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.productId) };
        case CART_SAVE_SHIPPING:
            return { ...state, shipping: action.data };

        case CART_SAVE_PAYMENT:
            return { ...state, payment: action.payload };

        default:
            return state;
    }
}

export { cartReducers }