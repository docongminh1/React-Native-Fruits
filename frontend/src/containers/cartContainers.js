import {connect} from 'react-redux';
import CartComponent from '../components/cart/cartComponent';
import { addToCart, removeFromCart, saveShipping, savePayment } from '../redux/actions/cartActions';

const mapStateToProps = (state) => {
    return{
        fruits: state.cartReducers
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onAddToCart: (newCart) => {
            dispatch(addToCart(newCart))
        },
        onRemoveFromCart: (productId) => {
            dispatch(removeFromCart(productId))
        },
        onSaveShipping: (data) => {
            dispatch(saveShipping(data))
        },
        onSavePayment: (data) => {
            dispatch(savePayment(data))
        }    
    }
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
export default cartContainer;