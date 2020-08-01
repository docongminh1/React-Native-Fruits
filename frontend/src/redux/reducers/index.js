import { combineReducers } from 'redux';
import homeReducers from './homeReducers';
import adminReducers from './adminReducers';
import productReducers from './productReducers'
import adminCartReducers from './adminCartReducers'
import userReducers from './userReducers'

const allReducers = combineReducers({
    homeReducers,
    adminReducers,
    productReducers,
    adminCartReducers,
    userReducers
});

export default allReducers;