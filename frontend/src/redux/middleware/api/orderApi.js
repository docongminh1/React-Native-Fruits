import {API_FRUIT} from '../../../config/setting'

const urlGetListFruit = `${API_FRUIT}/api/order/getListOrder`;
const urlCreateListFruit = `${API_FRUIT}/api/order/creatOrder`;
const urlUpdateListFruit = `${API_FRUIT}/api/order/updateOrder`;
const urlDeleteListFruit = `${API_FRUIT}/api/order/deleteOrder`;

function* getOrderFromApi() {
    const response = yield fetch(urlGetListFruit, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: '',
    }).then(response => response.json())

    return response.fruits;
}

function* createOrderFromApi(newFruit) {
    const response = yield fetch(urlCreateListFruit, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newFruit.name,
            imageFruit: newFruit.imageFruit,
            price: newFruit.price,
            brand: newFruit.brand,
            countInStock: newFruit.countInStock,
        }),
    })
    yield console.log(`response = ${JSON.stringify(response)}`)
    return yield (response.status === 201)
}

function* updateOrderFromApi(updatedFruit) {
    // console.warn('update: ', updatedFruit._id)

    const name = updatedFruit.name
    const price = updatedFruit.price
    const brand = updatedFruit.brand
    const countInStock = updatedFruit.countInStock
    const image = updatedFruit.imageFruit

    let bodyData = new FormData()

    bodyData.append('name', name)
    bodyData.append('price', price)
    bodyData.append('brand', brand)
    bodyData.append('countInStock', countInStock)
    bodyData.append('imageFruit', {
        // name: `${image.fileName}_${randomNumber}`,
        name: image.fileName,
        // name: image.fileName.replace("HEIC", 'JPG'),
        type: image.type,
        uri: image.uri,
        size: image.fileSize,
    })
    // console.log("bodyData", updatedFruit.imageFruit)

    const urlLink = `${urlUpdateListFruit}/${updatedFruit._id.toString()}`
    const response = yield fetch(urlLink, {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: bodyData
    })
        .then(response => response.json())
        .catch(err => {
            console.log("error:", err)
            return {
                resultCode: -1,
                message: 'Không kết nối được tới server 1',
                data: null
            }
        })
    console.log(`response = ${JSON.stringify(response)}`)
    return response
}

function* deleteOrderFromApi(deletedFruitId) {
    // console.warn('delete: ', deletedFruitId)
    const urlLink = `${urlDeleteListFruit}/${deletedFruitId}`
    const response = yield fetch(urlLink, {
        method: 'DELETE',

    }).then(response => response.json())

    //return yield (response.status === 200)

    return response
}

export const orderApi = {
    getOrderFromApi,
    createOrderFromApi,
    updateOrderFromApi,
    deleteOrderFromApi
}