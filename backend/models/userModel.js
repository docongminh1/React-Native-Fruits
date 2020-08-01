import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: { 
        type: String, 
        // required: true 
    },
    email: {
        type: String, 
        // required: true, 
        unique: true, 
        index: true, 
        dropDups: true,
    },
    tel: {
        type: String, 
        // required: true, 
        unique: true, 
        index: true, 
        dropDups: true,
    },
    password: { 
        type: String, 
        // required: true 
    },
    isAdmin: { 
        type: Boolean, 
        // required: true, 
        default: false 
    },
});

export default mongoose.model('User', userSchema);
