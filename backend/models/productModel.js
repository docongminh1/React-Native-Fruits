import mongoose, { Schema } from 'mongoose';

// Define movie schema
const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  className:{
    type: String,
  },
  imageFruit: String,
  price: {
      type: Number,
      default: 0
  },
  brand: String,
  countInStock: {
      type: Number,
      default: 0
  },
  description: String,
});

// Export Mongoose model
//fruit se them s thanh fruits khi bien dich database
export default mongoose.model('fruit', productSchema);