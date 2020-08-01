const HOME_API = "http://192.168.1.103:3000"
const STU_API = "http://172.16.13.15:3000"

let home = true
let API
if (home) {
    API = HOME_API
} else {
    API = STU_API
}

const userProfile = {
    _id: 0,
    name: "",
    email: "",
    tel: "",
    password: "",
    isAdmin: false,
    isLogin: false
};

exports.API_FRUIT = API
exports.userProfile = userProfile