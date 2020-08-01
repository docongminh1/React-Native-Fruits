import {API_FRUIT} from '../../../config/setting'

const urlGetListFruit = `${API_FRUIT}/api/getListFruit`;

function* getFruitsProductFromApi(){
    const response = yield fetch(urlGetListFruit, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json',
        },
        body: '' ,
    })
    .then(response => response.json())
    .then(responseJson => responseJson)

    return response.fruits;
    // return responseJson.fruits;
}

export const productApi = {
    getFruitsProductFromApi
}