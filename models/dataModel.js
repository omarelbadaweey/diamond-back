
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, "رقم الهاتف مطلوب"],
        minlength: [11, "رقم الهاتف يجب أن يكون 11 رقم"],
        maxlength: [11, "رقم الهاتف لا يمكن أن يتجاوز 11 رقم"],
        match: [/^[0-9]+$/, "يرجى إدخال أرقام فقط"]
    },
    time: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    select: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true 
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;