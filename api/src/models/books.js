import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// schema maps to a collection
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: () => uuidv4()
    },
    owner: {
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