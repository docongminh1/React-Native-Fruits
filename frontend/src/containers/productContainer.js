import {connect} from 'react-redux';
import ProductComponent from '../components/products/productComponent';
import { fetchFruitsProductAction
} from '../redux/actions/productActions';

const mapStateToProps = (state) => {
    return{
        fruits: state.productReducers
    }
}


const mapDispatchToProps =(dispatch) => {
    return{
        onFetchFruitProduct: () => {
            dispatch(fetchFruitsProductAction())
        },   
    }
}

const productContainer = connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
export default productContainer;