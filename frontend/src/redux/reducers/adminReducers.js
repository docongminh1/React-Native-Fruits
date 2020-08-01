import {
    ADD_FRUIT,
    FETCH_FRUITS_ADMIN, FETCH_SUCCEEDED_ADMIN, FETCH_FAILED_ADMIN,
    UPDATE_FRUIT, UPDATE_SUCCEEDED,
    DELETE_FRUIT, DELETE_SUCCEEDED
} from '../actions/actionTypes/adminTypeAction';

const adminReducers = (fruits = [], action) => {
    // console.warn('test action admin : ', action)
    switch (action.type) {
        case FETCH_SUCCEEDED_ADMIN:
            return action.receivedFruitsAdmin;
        case FETCH_FAILED_ADMIN:
            return [];

        case UPDATE_SUCCEEDED:
            return fruits.map(
                eachFruit =>
                    (eachFruit._id.toString() === action.updatedFruit._id.toString())
                        ? {
                            ...eachFruit,
                            name: action.updatedFruit.name,
                            imageFruit: action.updatedFruit.imageFruit,
                            price: action.updatedFruit.price,
                            brand: action.updatedFruit.brand,
                            countInStock: action.updatedFruit.countInStock
                        }
                        : eachFruit,
                        // console.log("test reducer:", action.updatedFruit.brand)
            )

        case DELETE_SUCCEEDED:
            const filteredFruits = fruits.filter(eachFruit => {
                return eachFruit._id.toString() !== action.deletedFruitId.toString();
            })
            // console.log("reducerDelete:", filteredFruits)
            return filteredFruits;

        default:
            return fruits;
    }
}

export default adminReducers;