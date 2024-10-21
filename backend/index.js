import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectToMongoDB from './config/db.js'

dotenv.config();

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)


app.listen(port, () => {
    connectToMongoDB()
    console.log(`app is listening on port ${port}`)
})