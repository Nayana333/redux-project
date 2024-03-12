require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 5000
const { erroHandler, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const colors = require('colors')
connectDB()
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/', require('./routes/userRoute'))


app.use(errorHandler)

app.listen(port, () => {
    console.log(`server started in the port ${port}`);
})