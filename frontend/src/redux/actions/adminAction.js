import { 
    ADD_FRUIT,
    FETCH_FRUITS_ADMIN, FETCH_SUCCEEDED_ADMIN, FETCH_FAILED_ADMIN,
    UPDATE_FRUIT, UPDATE_SUCCEEDED,
    DELETE_FRUIT, DELETE_SUCCEEDED
} from './actionTypes/adminTypeAction'

export const addItemAction = (newFruit) =>{
    return{
        type: ADD_FRUIT,
        //2 cach giong nhau
        //newFruit: newFruit
        newFruit
    }
}

export const fetchFruitsAdminAction = (sort) =>{
   return{
       type: FETCH_FRUITS_ADMIN,
       sort
   }
}

export const fetchSucceededAdminAction = (receivedFruitsAdmin) =>{
   return{
       type: FETCH_SUCCEEDED_ADMIN,
       receivedFruitsAdmin
   }
}

export const fetchFailedAdminAction = (error) =>{
   return{
       type: FETCH_FAILED_ADMIN,
       error
   }
}

//Update
export const updateItemAction = (updatedFruit) =>{
    return{
        type: UPDATE_FRUIT,
        updatedFruit
    }
}

export const updateItemSuccessAction = (updatedFruit) =>{
    return{
        type: UPDATE_SUCCEEDED,
        updatedFruit
    }
}

//Delete
export const deleteItemAction = (deletedFruitId) =>{
    return{
        type: DELETE_FRUIT,
        deletedFruitId
    }
}

export const deleteItemSuccessAction = (deletedFruitId) =>{
    return{
        type: DELETE_SUCCEEDED,
        deletedFruitId
    }
}