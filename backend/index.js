import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import connectToMongoDB from './config/db.js'

import authRouter from './routes/auth.js'
import noteRouter from './routes/note.js'

dotenv.config();

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)


app.listen(port, () => {
    connectToMongoDB()
    console.log(`app is listening on port ${port}`)
})
