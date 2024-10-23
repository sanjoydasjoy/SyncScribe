import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js';

const noteRouter = express.Router()

noteRouter.post('/add', middleware, async (req, res) => {
    try {
        const { title, description } = req.body;


        const newNote = new Note({
            title,
            description,
            userId: req.user.id

        })

        await newNote.save()

        return res.status(200).json({ success: true, message: "Note Created Successfully" })

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ success: false, message: "error in adding note" })

    }

})

noteRouter.get('/',middleware, async (req, res) => {
    try {
        const notes = await Note.find({userId: req.user.id})
        return res.status(200).json({ success: true, notes })
    } catch (error) {
        return res.status(500).json({ success: false, message: "cant retrive notes" })
    }
})

noteRouter.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const updateNote = await Note.findByIdAndUpdate(id, req.body)
        return res.status(200).json({ success: true, updateNote })
    } catch (error) {
        return res.status(500).json({ success: false, message: "cant update notes" })
    }
})

noteRouter.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deleteNote = await Note.findByIdAndDelete(id)
        return res.status(200).json({ success: true, deleteNote })
    } catch (error) {
        return res.status(500).json({ success: false, message: "cant delete notes" })
    }
})


export default noteRouter;
