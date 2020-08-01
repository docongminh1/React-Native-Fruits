import mongoose, { Schema } from 'mongoose';

const shippingSchema = {  
    city: { 
        type: String, 
        // required: true 
    },
    address: { 
        type: String, 
        // required: true 
    },
    note: { 
        type: String, 
        // required: true 
    },
};

const userSchema = {  
    userId: { 
        type: String, 
        // required: true 
    },
    username: { 
        type: String, 
        // required: true 
    },
    email: { 
        type: String, 
        // required: true 
    },
    sdt: { 
        type: String, 
        // required: true 
    },
};

const orderItemSchema = new Schema({
    name: { 
        type: String, 
        // required: true 
    },
    quantity: { 
        type: Number, 
        // required: true,
        default: 0 
    },
    imageFruit: { 
        type: String, 
        // required: true 
    },
    price: { 
        type: String, 
        // required: true 
    }
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'fruit',
    //     required: true
    // },
});

const orderSchema = new Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user: userSchema,
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: { 
        type: String 
    },
    itemsPrice: { 
        type: Number 
    },
    taxPrice: { 
        type: Number 
    },
    shippingPrice: { 
        type: Number 
    },
    totalPrice: { 
        type: Number 
    },
    isPaid: { 
        type: Boolean, 
        default: false 
    },
    shipForParents: { 
        type: Boolean, 
        default: false 
    },
    // paidAt: { type: Date },
    isDelivered: { 
        type: String, 
        // default: false 
    },
    // deliveredAt: { type: Date },
},
{
    //set createdAt va updatedAt
    timestamps: true
});

export default mongoose.model('order', orderSchema);