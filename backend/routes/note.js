import express from 'express'
import Note from '../models/Note.js'

const noteRouter = express.Router()

noteRouter.post('/add', async (req, res) => {
    try {
        const { title, description } = req.body;
        

        const newUser = new Note({
            title,
            description,
            
        })

        await newUser.save()

        return res.status(200).json({ success: true, message: "Accounted Created Successfully" })

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ success: false, message: "error in adding user" })

    }

})

export default noteRouter;
