import express from 'express'
import routes from './routes/index.js'
import connectDB from './dbs/db.init.blog.js'
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

// app.use(cookieParser())

// init middleware


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


// init db
connectDB()

// init router
app.use('/', routes)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        stack: error.stack,
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

// handling error

export default app