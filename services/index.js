const express = require('express');
const { default: mongoose } = require('mongoose');
const UserModel = require('./model/User');
const cors = require('cors')
const app = express();
const port = 5000;
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));

const ConnectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB Connect Sucessfully ${con.connection.host}`)
    } catch (error) {
        console.log(`MongoDB Not Connect ${error}`)
        process.exit();
    }
}

ConnectDb();

// backend/index.js
app.post('/api/register', async (req, res) => {
    try {
        console.log("Data received from frontend:", req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Fields are missing" });
        }
        const userexist = await UserModel.findOne({ email }); // returns null if not found
        if (userexist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new UserModel({ email, password });
        await newUser.save();
        console.log("New User Create :", newUser)

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error("BACKEND CRASH LOG:", err); // Look at your terminal for this!
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'as123456789',
            { expiresIn: '10h' }
        );
        res.status(200).json({ message: "Login successful", token, user: { id: user._id, email: user.email } })
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
})

app.listen(port, () => {
    console.log(`Running server on this port ${port}`)
})