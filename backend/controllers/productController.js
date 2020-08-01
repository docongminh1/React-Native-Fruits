import Product from '../models/productModel';

const address = "http://192.168.1.103:3000/"

//lay danh sach
export const getListFruit = async(req, res) => {
    // const brand = req.query.brand ? { brand: req.query.brand } : {};
    const className = req.query.className ? { className: req.query.className } : {};
    // console.log("test", brand)
    try{
        const listFruit = await Product.find({...className})
        return res.json({
            resultCode: 1,
            fruits: listFruit,
            message: "Lấy danh sách sản phẩm thành công"
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Lấy danh sách sản phẩm thất bại"
        })
    }
};
//tim kiem tu khoa
export const searchListFruitByName = async(req, res) => {
    const name_search = req.query.name ? { name: req.query.name } : {};
    // name_search = name_search.toLowerCase()
    try{
        const listFruit = await Product.find({...name_search})
        return res.json({
            resultCode: 1,
            fruits: listFruit
        })
    }catch(error){
        console.log("err search name", error)
        return res.json({
            resultCode: -1,
            message: "Không có sản phẩm bạn cần tìm"
        })
    }
};
//tim kiem tu Id
export const findListFruitById = async(req, res) => {
    const id = req.params.id;
    try{
        const listFruit = await Product.findById(id)
        return res.json({
            resultCode: 1,
            classFruit: listFruit
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Id không tồn tại hoặc nhập sai"
        })
    }
};
//tao danh sach
export const creatListFruit = async(req, res) => {
    const fs = require('fs')
    const imageFruit = req.file
    const body = req.body

    try{
        const randomNumber = Math.floor(Math.random() * 10000) + 1
        // const imageFruit = `${file.originalname}_${randomNumber}.png`
        // const tmp_path = file.path
        const imageName = `${imageFruit.originalname}_${randomNumber}.png`
        const tmp_path = req.file.path
        const target_path = 'uploads/' + imageName
        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)
        src.pipe(dest)
        src.on('end', async () => {
            fs.unlink(tmp_path, (err) => { console.log(err) })
            const filepath = target_path
            const fileName = imageName
            console.log("fileName:", fileName)
            console.log("filepath:", filepath)
            const listFruit = await Product.create({
                name: body.name,
                className: body.className,
                //imageFruit: "http://192.168.1.102:3000/" + filepath,
                imageFruit: address + filepath,
                price: body.price,
                brand: body.brand,
                countInStock: body.countInStock,
                description: body.description,
            })
            return res.json({
                resultCode: 1,
                message: "Tạo danh sách thành công",
                data: listFruit
            })
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Tạo danh sách thất bại"
        })
    }
};
//sua danh sach
export const updateListFruit = async(req, res) => {
    const id = req.params.id;

    const fs = require('fs')
    const file = req.file
    const body = req.body

    try{
        const randomNumber = Math.floor(Math.random() * 10000) + 1
        const imageFruit = `${file.originalname}_${randomNumber}.png`
        const tmp_path = file.path
        const target_path = 'uploads/' + imageFruit
        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)
        src.pipe(dest)
        src.on('end', async () => {
            fs.unlink(tmp_path, (err) => { console.log(err) })
            const filepath = target_path
            const fileName = imageFruit
            // console.log("Aaa:", filepath)

            const listFruit = await Product.findById(id)
            await listFruit.updateOne({
                name: body.name || listFruit.name,
                className: body.className || listFruit.className,
                // imageFruit: "http://192.168.1.102:3000/" + filepath || listFruit.imageFruit,
                imageFruit: address + filepath || listFruit.imageFruit,
                price: body.price || listFruit.price,
                brand: body.brand || listFruit.brand,
                countInStock: body.countInStock || listFruit.countInStock,
                description: body.description || listFruit.description,
            })
            return res.json({
                resultCode: 1,
                message: "Cập nhật danh sách thành công",
                data: listFruit
            })
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Cập nhật danh sách thất bại"
        })
    }
};

//xoa danh sach
export const deleteListFruit = async(req, res) => {
    const id = req.params.id;
    try{
        const listFruit = await Product.findById(id)
        return res.json({
            resultCode: 1,
            message: "Xóa danh sách thành công",
            data: listFruit.deleteOne(), listFruit
        })
    }catch(error){
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Xóa danh sách thất bại"
        })
    }
};