const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const cors = require('cors');
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors());
app.use( '/api',router)
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`);
})