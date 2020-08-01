import mongoose, { Schema } from 'mongoose';

// Define movie schema
const classProductSchema = new Schema({
  class: {
    type: String,
    unique: true,
  },
  imageClass: String,
});

// Export Mongoose model
//classProduct se them s thanh fruits khi bien dich database
export default mongoose.model('classProduct', classProductSchema);