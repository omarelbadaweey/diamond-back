const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    // ده العنوان الفريد لجهازك اللي المتصفح بيديهولنا
    endpoint: { type: String, required: true, unique: true },
    expirationTime: { type: Number, default: null },
    keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true }
    }
});

module.exports = mongoose.model('Subscription', subSchema);