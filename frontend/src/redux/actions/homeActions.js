import { 
    FETCH_FRUITS, FETCH_SUCCEEDED, FETCH_FAILED
} from './actionTypes/homeTypeActions'

export const fetchFruitsAction = (sort) =>{
   return{
       type: FETCH_FRUITS,
       sort
   }
}

export const fetchSucceededAction = (recievedFruits) =>{
   return{
       type: FETCH_SUCCEEDED,
       recievedFruits
   }
}

export const fetchFailedAction = (error) =>{
   return{
       type: FETCH_FAILED,
       error
   }
}