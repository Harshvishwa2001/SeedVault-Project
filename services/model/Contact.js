import mongoose from "mongoose"; 
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true, // FIXED: added the 'q'
        enum: ['Seed Inquiry', 'Distribution Partnership', 'Technical Support', 'Other'],
        default: 'Seed Inquiry' // FIXED: moved outside the values object
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Using 'Contact' (Capitalized) is the industry standard for models
const contactModel = mongoose.models.contact || mongoose.model('contact', contactSchema);

export default contactModel;