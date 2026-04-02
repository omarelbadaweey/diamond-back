// const express = require('express');
// const mongoose = require('mongoose');
// const router = require('./routes');
// const cors = require('cors');
// require("dotenv").config()

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use( '/api',router)
// const PORT = process.env.PORT || 5000;
// mongoose.set('bufferCommands', false);
// mongoose.connect(process.env.DB_CONNECTION_URL)
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

// app.listen(PORT , () => {
//     console.log(`Server is running on PORT ${PORT}`);
// })


// module.exports = app;


const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;

// 1. شيل السطر ده أو خليه true عشان تدي مساحة للمونجوز يعالج الطلبات
mongoose.set('bufferCommands', true); 

// 2. اربط الداتا بايز الأول وبعدين شغل السيرفر داخل الـ .then()
mongoose.connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // مش هنشغل السيرفر غير لما نتأكد إننا Connected
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = app;