// models/user.js
import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  nickname: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: false
  },
})
export default mongoose.model('User', userSchema);
