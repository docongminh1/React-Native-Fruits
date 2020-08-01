import { 
    FETCH_FRUITS_PRODUCT, FETCH_SUCCEEDED_PRODUCT, FETCH_FAILED_PRODUCT
} from './actionTypes/productTypeAction'

export const fetchFruitsProductAction = (sort) =>{
   return{
       type: FETCH_FRUITS_PRODUCT,
       sort
   }
}

export const fetchSucceededProductAction = (receivedFruitsProduct) =>{
   return{
       type: FETCH_SUCCEEDED_PRODUCT,
       receivedFruitsProduct
   }
}

export const fetchFailedProductAction = (error) =>{
   return{
       type: FETCH_FAILED_PRODUCT,
       error
   }
}