import express, { Router } from 'express';

var multer = require('multer')
var upload = multer({ dest: 'uploads' })

const classProductController = require("./controllers/classProductController")
const productController = require("./controllers/productController")
const orderController = require("./controllers/orderController")
const userController = require("./controllers/userController")

// Initialize the router
const router = Router();

router.get('/', (req, res) => {
    res.json({
        resultCode: 1,
        message: 'Api working done',
        data: null,
    })
})

//class
router.route('/getListClassFruit')
    .get(classProductController.getListClassFruit)
router.route('/creatListClassFruit')
    .post(upload.single('imageClass'), classProductController.creatListClassFruit)
router.route('/updateListClassFruit/:id')
    .put(upload.single('imageClass'), classProductController.updatelistClassFruit)
router.route('/deleteListClassFruit/:id')
    .delete(classProductController.deletelistClassFruit)

//product
router.route('/getListFruit')
    .get(productController.getListFruit)
router.route('/findListFruitById/:id')
    .get(productController.findListFruitById)
router.route('/searchListFruitByName')
    .get(productController.searchListFruitByName)
router.route('/creatListFruit')
    .post(upload.single('imageFruit'), productController.creatListFruit)
router.route('/updateListFruit/:id')
    .put(upload.single('imageFruit'), productController.updateListFruit)
router.route('/deleteListFruit/:id')
    .delete(productController.deleteListFruit)

//order
router.route('/order/getListOrder')
    .get(orderController.getListOrder)
router.route('/order/creatOrder')
    .post(orderController.creatOrder)
// router.route('/order/updateOrder')
//     .put(orderController.updateOrder)
router.route('/order/deleteOrder/:id')
    .delete(orderController.deleteOrder)

//user
router.route('/user/getListUser')
    .get(userController.getListUser)
router.route('/user/createUser')
    .post(userController.createUser)
router.route('/user/login')
    .post(userController.logIn)
router.route('/user/updateUser/:id')
    .put(userController.updateUser)
router.route('/user/deleteUser/:id')
    .delete(userController.deleteUser)

export default router;