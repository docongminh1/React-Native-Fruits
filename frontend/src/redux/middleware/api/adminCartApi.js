import {API_FRUIT} from '../../../config/setting'

const urlGetListOrder = `${API_FRUIT}/api/order/getListOrder`;
const urlDeleteOrder = `${API_FRUIT}/api/order/deleteOrder`;

function* getOrderAdminFromApi(){
    const response = yield fetch(urlGetListOrder, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json',
        },
        body: '' ,
    }).then(response => response.json())
    console.warn('order List: ', response)
    
    return response.orders;
}

function* deleteOrderFromApi(orderId) {
    console.warn('delete order: ', orderId)
    const urlLink = `${urlDeleteOrder}/${orderId}`
    const response = yield fetch(urlLink, {
        method: 'DELETE',

    }).then(response => response.json())

    return response
}

export const adminCartApi = {
    getOrderAdminFromApi,
    deleteOrderFromApi
}