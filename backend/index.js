import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postRouter from './Routes/PostsRoutes.js'
import userDataRouter from './Routes/UserDataRoutes.js'
import chatRouter from './Routes/ChatRoutes.js'
import multer from 'multer'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const upload = multer({})

app.use(express.json({extended:true,limit:'2mb'}))
app.use(express.urlencoded({extended:true,limit:'2mb'}))
app.use(cors())
app.use(cookieParser())

const port = process.env.PORT;
const url=process.env.CONNECTION_URL

app.get('/', (req, res) => {
    res.send('hi')
})

const CONNECTION_URL = url
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log('Server listening on port:', port)
        })
    })
    .catch(err => console.log(err))
// app.get('/post', postRouter)
// app.post('/post', postRouter) use the below instead of above

app.use('/post', postRouter) //Here '/post' is mentioned,so in routes, only mention '/'
app.use('/', userDataRouter) 
app.use('/chats', chatRouter) 
