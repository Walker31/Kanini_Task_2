import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        tag : {
            type: String,
            enum: ['Work','Family','Friend'],
            required : true
        },
        role: {
            type: String,
            required: true
        },
        phone: {
            Personal: {
            type: String,
            required: true
            },
            Work: {
            type: String,
            required: false
            }
        },
        email: {
            Personal: {
            type: String,
            required: true
            },
            Work: {
            type: String,
            required: false
            }
        },
        birthday: {
            type: Date,
            required: true
        }
    },{ collection: 'Contacts' }
)

const Contact = mongoose.model('Contacts',ContactSchema);

export default Contact;

