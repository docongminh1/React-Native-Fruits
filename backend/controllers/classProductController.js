import ClassProduct from '../models/classProductModel';

const address = "http://192.168.1.103:3000/"

//lay danh sach
export const getListClassFruit = async(req, res) => {
    // console.log("test", brand)
    try{
        const listClassFruit = await ClassProduct.find()
        return res.json({
            resultCode: 1,
            fruits: listClassFruit,
            message: "Lấy danh sách lớp sản phẩm thành công"
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Lấy danh sách lớp sản phẩm thất bại"
        })
    }
};
//tim kiem tu khoa
// export const searchlistClassFruitByName = async(req, res) => {
//     const name_search = req.query.name ? { name: req.query.name } : {};
//     // name_search = name_search.toLowerCase()
//     try{
//         const listClassFruit = await ClassProduct.find({...name_search})
//         return res.json({
//             resultCode: 1,
//             fruits: listClassFruit
//         })
//     }catch(error){
//         console.log("err search name", error)
//         return res.json({
//             resultCode: -1,
//             message: "Không có sản phẩm bạn cần tìm"
//         })
//     }
// };

//tim kiem tu Id
// export const findlistClassFruitById = async(req, res) => {
//     const id = req.params.id;
//     try{
//         const listClassFruit = await ClassProduct.findById(id)
//         return res.json({
//             resultCode: 1,
//             fruits: listClassFruit
//         })
//     }catch(error){
//         console.log(error)
//         return res.json({
//             resultCode: -1,
//             message: "Id không tồn tại hoặc nhập sai"
//         })
//     }
// };

//tao danh sach
export const creatListClassFruit = async(req, res) => {
    const fs = require('fs')
    const file = req.file
    const body = req.body

    try{
        const randomNumber = Math.floor(Math.random() * 10000) + 1
        const imageClassName = `${file.originalname}_${randomNumber}.png`
        const tmp_path = file.path
        const target_path = 'uploads/' + imageClassName
        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)
        src.pipe(dest)
        src.on('end', async () => {
            fs.unlink(tmp_path, (err) => { console.log(err) })
            const filepath = target_path
            const fileName = imageClassName
            console.log("fileName:", fileName)
            console.log("filepath:", filepath)
            const listClassFruit = await ClassProduct.create({
                class: body.class,
                imageClass: address + filepath,
            })
            return res.json({
                resultCode: 1,
                message: "Tạo lớp danh sách thành công",
                data: listClassFruit
            })
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Tạo lớp danh sách thất bại"
        })
    }
};
//sua danh sach
export const updatelistClassFruit = async(req, res) => {
    const id = req.params.id;

    const fs = require('fs')
    const file = req.file
    const body = req.body

    try{
        const randomNumber = Math.floor(Math.random() * 10000) + 1
        const imageClassFruit = `${file.originalname}_${randomNumber}.png`
        const tmp_path = file.path
        const target_path = 'uploads/' + imageClassFruit
        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)
        src.pipe(dest)
        src.on('end', async () => {
            fs.unlink(tmp_path, (err) => { console.log(err) })
            const filepath = target_path
            const fileName = imageClassFruit
            // console.log("Aaa:", filepath)

            const listClassFruit = await ClassProduct.findById(id)
            await listClassFruit.updateOne({
                class: body.class || listClassFruit.class,
                imageClass: address + filepath || listClassFruit.imageClass,
            })
            return res.json({
                resultCode: 1,
                message: "Cập nhật lớp danh sách thành công",
                data: listClassFruit
            })
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Cập nhật lớp danh sách thất bại"
        })
    }
};

//xoa danh sach
export const deletelistClassFruit = async(req, res) => {
    const id = req.params.id;
    try{
        const listClassFruit = await ClassProduct.findById(id)
        return res.json({
            resultCode: 1,
            message: "Xóa lớp danh sách thành công",
            data: listClassFruit.deleteOne(), listClassFruit
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Xóa lớp danh sách thất bại"
        })
    }
};