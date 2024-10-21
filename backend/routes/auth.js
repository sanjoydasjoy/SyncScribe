import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({ success: false, message: "User already exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password: hashPassword
        })

        await newUser.save()

        return res.status(200).json({ success: true, message: "Accounted Created Successfully" })

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ success: false, message: "error in adding user" })

    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not exist" })
        }

        const checkpassword = await bcrypt.compare(password, user.password)

        if (!checkpassword) {
            return res.status(401).json({ success: false, message: "Wrong Credentials" })

        }

        const token = jwt.sign({id:user._id}, process.env.jwt_secret, {expiresIn: "5h"})

        return res
        .status(200)
        .json({ success: true, token, user: {name:user.name}, message: "Login Successfull" })

    } catch (error) {

        return res.status(500).json({ success: false, message: "error in login" })

    }
})

export default authRouter