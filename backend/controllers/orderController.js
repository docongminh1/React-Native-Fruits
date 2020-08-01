import Order from '../models/orderModel';

//lay toan bo danh sach
export const getListOrder = async (req, res) => {
    try {
        const listOrder = await Order.find()
        return res.json({
            resultCode: 1,
            orders: listOrder,
            message: "Lấy danh sách giỏ hàng thành công"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Lấy danh sách giỏ hàng thất bại"
        })
    }
};

//lay danh sach theo user
// export const getListOrder = async(req, res) => {
//     try{
//         const listOrder = await Order.find()
//         return res.json({
//             resultCode: 1,
//             fruits: listOrder
//         })
//     }catch(error){
//         console.log(error)
//         return res.json({
//             resultCode: -1,
//             message: "Lay danh sach that bai"
//         })
//     }
// };

//tao order
export const creatOrder = async (req, res) => {
    const body = req.body
    try {
        const listOrder = await Order.create({
            user: body.user,
            orderItems: body.orderItems,
            shipping: body.shipping,
            payment: body.payment,
            itemsPrice: body.itemsPrice,
            taxPrice: body.taxPrice,
            shippingPrice: body.shippingPrice,
            totalPrice: body.totalPrice,
            isDelivered: body.isDelivered,
            shipForParents: body.shipForParents,
            isPaid: body.isPaid
        })
        return res.json({
            resultCode: 1,
            message: "Tạo giỏ hàng thành công",
            data: listOrder
        })
    } catch (error) {
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Tạo giỏ hàng thất bại"
        })
    }
};
//sua danh sach
// export const updateOrder = async (req, res) => {
//     const id = req.params.id;
//     const body = req.body

//     try {
//         const listOrder = await Order.findById(id)
//         await listOrder.updateOne({
//             user: body.user || listOrder.user,
//             orderItems: body.orderItems || listOrder.orderItems , 
//             shipping: body.shipping || listOrder.shipping,
//             payment: body.payment || listOrder.payment,
//             itemsPrice: body.itemsPrice || listOrder.itemsPrice,
//             taxPrice: body.taxPrice || listOrder.taxPrice,
//             shippingPrice: body.shippingPrice || listOrder.shippingPrice,
//             totalPrice: body.totalPrice || listOrder.totalPrice
//         })
//         return res.json({
//             resultCode: 1,
//             message: "Update gio hang thanh cong",
//             data: listOrder
//         })
//     } catch (error) {
//         console.log(error)
//         return res.json({
//             resultCode: -1,
//             message: "Update gio hang that bai"
//         })
//     }
// };

//xoa danh sach
export const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const listOrder = await Order.findById(id)
        return res.json({
            resultCode: 1,
            message: "Xóa giỏ hàng thành công",
            data: listOrder.deleteOne(), listOrder
        })
    } catch (error) {
        console.log(error)
        return res.json({
            resultCode: -1,
            message: "Xóa giỏ hàng thất bại"
        })
    }
};