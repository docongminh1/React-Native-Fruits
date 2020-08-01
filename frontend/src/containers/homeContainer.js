import {connect} from 'react-redux';
import HomeComponent from '../components/home/homeComponent';
import { fetchFruitsAction
} from '../redux/actions/homeActions';

const mapStateToProps = (state) => {
    return{
        fruits: state.homeReducers
    }
}


const mapDispatchToProps =(dispatch) => {
    return{
        onFetchFruit: () => {
            dispatch(fetchFruitsAction())
        },   
    }
}

const homeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default homeContainer;