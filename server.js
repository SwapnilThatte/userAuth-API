const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

// MongoDB Connection
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log(`Connected to MongoDB Database`);
})

// Home Page
app.get('/', (req, res) => {
    res.send("<h1>User Auth API</h1>")
})

// Importing Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

// Middlewares
app.use(express.json())


// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


app.listen(3000, () => {
    console.log("Server Started at port 3000");
})