import mongoose from 'mongoose';
const Schema = mongoose.Schema

const messages = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber:String,
    message: String
})
module.exports = mongoose.model('MessageDetails',messages);