
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "الاسم مطلوب"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "البريد الإلكتروني مطلوب"],
        match: [/.+\@.+\..+/, "يرجى إدخال بريد إلكتروني صحيح"],
        lowercase: true
    },


    message: {
        type: String,
        required: [true, "تفاصيل المشروع مطلوبة"],

    },
}, { timestamps: true }); 

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;