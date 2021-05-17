import config from '../config.js'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// schema maps to a collection
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    user: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    notes: [{
        note: {
            type: 'String',
            required: true,
            trim: true,
            unique: true
        }
    }]
});

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;