
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const dataSchema = new Schema({
//     fullName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     phoneNumber: {
//         type: String,
//         required: [true, "رقم الهاتف مطلوب"],
//         minlength: [11, "رقم الهاتف يجب أن يكون 11 رقم"],
//         maxlength: [11, "رقم الهاتف لا يمكن أن يتجاوز 11 رقم"],
//         match: [/^[0-9]+$/, "يرجى إدخال أرقام فقط"]
//     },
//     time: {
//         type: String,
//         required: true
//     },
//     day: {
//         type: String,
//         required: true
//     },
//     select: {
//         type: String,
//         required: true
//     },
//     doctorName: {
//         type: String,
//         required: true 
//     },
//     isRead: {
//         type: Boolean,
//         default: false
//     }
// });

// const Data = mongoose.model('Data', dataSchema);
// module.exports = Data;



///////////////////////////////////////////////////////////////////////////////

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "الاسم الكامل مطلوب"],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, "رقم الهاتف مطلوب"],
        minlength: [11, "رقم الهاتف يجب أن يكون 11 رقم"],
        maxlength: [11, "رقم الهاتف لا يمكن أن يتجاوز 11 رقم"],
        match: [/^[0-9]+$/, "يرجى إدخال أرقام فقط"]
    },
    // حقل الفرع أو المدينة (إجباري)
    branch: {
        type: String,
        required: [true, "اختيار الفرع أو المدينة مطلوب"],
        trim: true
    },
    time: {
        type: String,
        required: [true, "وقت الحجز مطلوب"]
    },
    day: {
        type: String,
        required: [true, "يوم الحجز مطلوب"]
    },
    // حقل الخدمة (اختياري الآن)
    select: {
        type: String,
        required: false 
    },
    // حقل الطبيب (اختياري الآن)
    doctorName: {
        type: String,
        required: false 
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // ضفت لك timestamps عشان تعرف وقت الحجز اتعمل ميتى بالظبط

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;