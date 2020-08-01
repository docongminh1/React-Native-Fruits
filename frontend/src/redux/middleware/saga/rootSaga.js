import { call, all, fork } from 'redux-saga/effects';

import { watchFetchFruits } from './homeSaga';
import { watchFetchFruitsAdmin, watchAddFruit, watchUpdateFruit, watchDeleteFruit } from './adminSaga';
import { watchFetchFruitsProduct } from './productSaga';
import { watchFetchOrderAdmin, watchDeleteOrder } from './adminCartSaga'
import { watchLogIn } from './userSaga'

export default function* rootSaga(){
    // yield call(watchFetchFruits); 
        //thuc hien song song cac action (fork)
        yield fork(watchFetchFruits)

        yield fork(watchFetchFruitsAdmin)
        yield fork(watchAddFruit)
        yield fork(watchUpdateFruit)
        yield fork(watchDeleteFruit)

        yield fork(watchFetchFruitsProduct)

        yield fork(watchFetchOrderAdmin)
        yield fork(watchDeleteOrder)

        yield fork(watchLogIn)
    
}