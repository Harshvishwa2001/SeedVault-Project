const express = require('express');
const { mongoose } = require('mongoose');
const UserModel = require('./model/User');
const cors = require('cors')
const app = express();
const port = 5000;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { default: contactModel } = require('./model/Contact');
const Seed = require('./model/uploadSeed');

app.use(express.json());

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Order = require('./model/Order');

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: "duo6h5j7h",
    api_key: "344887171935246",
    api_secret: "UbK9aWFftC8a5pRUoxBAm5RLAbg"
});

// Set up storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'seed_vault',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage: storage });

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

app.get('/api/register', async (req, res) => {
    try {
        const allUsers = await UserModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "All Users retrieved successfully",
            count: allUsers.length,
            data: allUsers
        });
    } catch (error) {
        console.log("Error fetching users: ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users. Please try again later.",
            error: error.message
        });
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
});

// DELETE Route
app.delete('/api/register/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Attempt to find and remove the user
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Identity not found in the vault."
            });
        }

        // Return success: true so the frontend updates its state
        res.status(200).json({
            success: true,
            message: "User successfully purged from database.",
            data: deletedUser
        });

    } catch (error) {
        console.error("Backend Delete Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error during deletion."
        });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const response = new contactModel({ name, email, subject, message });
        await response.save();

        return res.status(201).json({
            success: true,
            message: "Message sent successfully!",
            data: response
        });
    } catch (error) {
        console.log("Not Sending message : ", error);
        return res.status(401).json({
            success: false,
            message: "Failed to send message. Please try again later.",
            data: error.message
        });
    }
})

app.get('/api/contact', async (req, res) => {
    try {
        const messages = await contactModel.find().sort({ createdAt: -1 });
        return res.status(201).json({
            success: true,
            message: "All Message",
            count: messages.length,
            data: messages
        })
    } catch (error) {
        console.log("Error fetching messages", error);
        return res.status(401).json({
            success: false,
            message: "Error fetching messages",
            data: error.message
        })
    }
})

app.delete('/api/contact/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletemessage = await contactModel.findByIdAndDelete(id);

        if (!deletemessage) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Message was deleted",
        });
    } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete message",
            error: error.message
        });
    }
});

app.post('/api/seeds', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file ? req.file.path : req.body.image;
        const seedData = {
            ...req.body,
            image: imagePath,
            // Optional: Ensure numbers are numbers
            price: req.body.price ? Number(req.body.price) : 0,
            rating: req.body.rating ? Number(req.body.rating) : 0
        };

        const newSeed = new Seed(seedData);
        const savedSeed = await newSeed.save();

        res.status(201).json(savedSeed);
    } catch (error) {
        // Detailed error logging helps you debug faster
        console.error("Upload Error:", error);
        res.status(400).json({
            message: "Database or Upload Error",
            error: error.message
        });
    }
});

app.put('/api/seeds/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedSeed = await Seed.findByIdAndUpdate(id, updateData, {
            new: true, // Returns the modified document
            runValidators: true
        });

        if (!updatedSeed) {
            return res.status(404).json({ message: "Seed not found" });
        }
        res.json(updatedSeed);
    } catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});

app.get('/api/seeds', async (req, res) => {
    try {
        const seeds = await Seed.find().sort({ createdAt: -1 });
        res.json(seeds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/seeds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSeed = await Seed.findByIdAndDelete(id);

        if (!deletedSeed) {
            return res.status(404).json({ message: "Seed not found" });
        }

        res.status(200).json({ message: "Seed deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
});

// POST: Save a new order 
app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET: Fetch all orders (for your Admin Dashboard)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ success: true });
    } catch (error) {
        // This catch block triggers the 500 error
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Running server on this port ${port}`)
})