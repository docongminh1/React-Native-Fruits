import { 
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT
} from './actionTypes/cartTypeActions'

export const addToCart = (newCart) =>{
    return{
        type: CART_ADD_ITEM,
        newCart
    }
}

//Delete
export const removeFromCart = (productId) =>{
    return{
        type: CART_REMOVE_ITEM,
        productId
    }
}

export const saveShipping = (data) =>{
    return{
        type: CART_SAVE_SHIPPING,
        data
    }
}

export const savePayment = (data) =>{
    return{
        type: CART_SAVE_PAYMENT,
        data
    }
}