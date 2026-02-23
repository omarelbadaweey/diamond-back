
const Data = require('../models/dataModel');

const Subscription = require('../models/subModel');
const webpush = require('web-push');

// إعداد المفاتيح (حط المفاتيح اللي طلعتلك هنا بدل الكلام ده)
webpush.setVapidDetails(
    'mailto:test@test.com',
    'BFwxFmzRQ60PN2bD-_6X2Vko24sskJpTaazjqdbAANDANyaTRWIwPsTEMs3LiqcGbR5sUbZRtAbJIqrrkeg1HAI',
    'iQBFpGnxkk7dA4wHiuGjEvWX6ctTthKiV7w060a6sX8'
);
const dataController = {

    createData: async (req, res) => {
        try {
            console.log("وصل طلب حجز جديد:", req.body); // ضيف السطر ده ضروري
            const { fullName, phoneNumber, day, time, doctorName, select } = req.body;

            // التحقق من التكرار
            const existingBooking = await Data.findOne({ day, time, doctorName });
            if (existingBooking) {
                return res.status(400).json({ message: "الموعد محجوز مع هذا الدكتور" });
            }

            // الحفظ الجديد
            const newData = new Data({
                fullName: fullName,
                phoneNumber: phoneNumber,
                day: day,
                time: time,
                doctorName: doctorName,
                select: select
            });

            const savedData = await newData.save();
            // console.log("البيانات بعد ما اتحفظت في المونجو:", savedData);

            res.status(201).json(savedData);


            // ... بعد ما الحجز يتسيف بنجاح (savedData)

            
// شغل الإشعارات في "الخلفية" عشان ميعطلش الحفظ
setImmediate(async () => {
    try {
        const payload = JSON.stringify({
            title: "حجز جديد! 🏥",
            body: `المريض ${fullName} حجز مع ${doctorName}`
        });
        const allSubs = await Subscription.find();
        allSubs.map(sub => {
            webpush.sendNotification(sub, payload).catch(err => console.error("خطأ إرسال:", err.message));
        });
    } catch (e) {
        console.error("فشل جلب الاشتراكات:", e);
    }
});


        } catch (error) {
            console.error("خطأ أثناء الحفظ:", error);
            res.status(500).json({ message: "خطأ في السيرفر", error: error.message });
        }
    },

    ///////
    deletedData: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await Data.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ message: "الحجز غير موجود" });
            }
            res.status(200).json({ message: "تم حذف الحجز بنجاح" });
        } catch (error) {
            res.status(500).json({ message: "خطأ في عملية الحذف", error: error.message });
        }
    },
    ///////
    getAllData: async (req, res) => {
        try {

            const allAppointments = await Data.find().sort({ createdAt: -1 });
            res.status(200).json(allAppointments);
        } catch (error) {
            res.status(500).json({ message: "خطأ في جلب البيانات", error: error.message });
        }
    },
    ////
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedBooking = await Data.findByIdAndUpdate(
                id,
                { isRead: true },
                { new: true }
            );

            if (!updatedBooking) {
                return res.status(404).json({ message: "الحجز غير موجود" });
            }

            res.status(200).json(updatedBooking);
        } catch (error) {
            res.status(500).json({ message: "خطأ في تحديث الحالة", error: error.message });
        }
    },


    // 1. دالة حفظ اشتراك الجهاز
    subscribe : async (req, res) => {
        try {
            const subscription = req.body;
            // بنحفظ الاشتراك في قاعدة البيانات
            await Subscription.findOneAndUpdate(
                { endpoint: subscription.endpoint },
                subscription,
                { upsert: true, new: true }
            );
            res.status(201).json({ message: "تم تسجيل الجهاز لاستقبال الإشعارات بنجاح" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = dataController;