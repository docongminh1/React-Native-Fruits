import {API_FRUIT} from '../../../config/setting'

const urlLogin = `${API_FRUIT}/api/user/login`;

function* logIn(User) {
    console.log("Log In Api:", User)
    const response = yield fetch(urlLogin, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: User.email,
            password: User.password,
        }),
    }).then(response => response.json())
    console.log("Api Log in:", response)

    return response
}

export const userApi = {
    logIn
}