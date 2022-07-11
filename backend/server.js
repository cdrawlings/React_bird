const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/bird', require('./routes/birdRoutes'))

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))