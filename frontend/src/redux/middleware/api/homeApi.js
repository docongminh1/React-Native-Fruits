import {API_FRUIT} from '../../../config/setting'

// const urlGetListFruit = `${API_FRUIT}/api/getListFruit?brand=`;
const urlGetListFruit = `${API_FRUIT}/api/getListClassFruit`;

function* getFruitsFromApi(){
    // const response = yield fetch(urlGetListFruit+ "Việt Nam", {
    const response = yield fetch(urlGetListFruit, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json',
        },
        body: '' ,
    }).then(response => response.json())
    // console.warn('gggg: ', response)
    
    return response.fruits;
}

export const homeApi = {
    getFruitsFromApi
}