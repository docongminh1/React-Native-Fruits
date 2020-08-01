import User from '../models/userModel';

export const getListUser = async (req, res) => {
    try {
        const listUser = await User.find()
        return res.json({
            resultCode: 1,
            users: listUser,
            message: "Lấy danh sách tài khoản thành công"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Lấy danh sách tài khoản thất bại"
        })
    }
};

// export const getListOrder = async(req, res) => {
//     try{
//         const listOrder = await Order.find()
//         return res.json({
//             resultCode: 1,
//             users: listOrder
//         })
//     }catch(error){
//         console.log(error)
//         return res.json({
//             resultCode: -1,
//             message: "Lay danh sach that bai"
//         })
//     }
// };

export const createUser = async (req, res) => {
    const body = req.body
    try {
        const listUser = await User.create({
            name: body.name,
            email: body.email,
            tel: body.tel,
            password: body.password,
            isAdmin: body.isAdmin,
        })
        return res.json({
            resultCode: 1,
            message: "Tạo tài khoản thành công",
            data: listUser
        })
    } catch (error) {
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Tạo tài khoản thất bại"
        })
    }
};

export const logIn = async (req, res) => {
    const body = req.body
    const signInUser = await User.findOne({
        tel: body.tel,
        // email: body.email,
        password: body.password,
    })
    try {
        if (signInUser) {
            const listUser = await new User({
                name: signInUser.name,
                email: signInUser.email,
                tel: signInUser.tel,
                password: signInUser.password,
                isAdmin: signInUser.isAdmin,
            })
            return res.json({
                resultCode: 1,
                message: "Đăng nhập thành công",
                data: listUser
            })
        }
        else {
            return res.json({
                resultCode: 1,
                message: "Sai tên tài khoản hoặc mật khẩu",
                data: null
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Đăng nhập thất bại",
            data: null
        })
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body

    try {
        const listUser = await User.findById(id)
        await listUser.updateOne({
            name: body.name || listUser.name,
            email: body.email || listUser.email,
            tel: body.tel || listUser.tel,
            password: body.password || listUser.password,
            isAdmin: body.isAdmin || listUser.isAdmin,
        })
        return res.json({
            resultCode: 1,
            message: "Cập nhật tài khoản thành công",
            data: listUser
        })
    } catch (error) {
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Cập nhật tài khoản thất bại"
        })
    }
};

//xoa danh sach
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const listUser = await User.findById(id)
        return res.json({
            resultCode: 1,
            message: "Xóa tài khoản thành công",
            data: listUser.deleteOne(), listUser
        })
    } catch (error) {
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Xóa tài khoản thất bại"
        })
    }
};