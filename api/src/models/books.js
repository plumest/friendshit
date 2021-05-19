import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const { Boolean, Number } = Schema.Types


const bookSchema = new Schema({
    _id: {
        type: String,
        default: () => uuidv4()
    },
    owner: {
        type: 'String',
        required: true,
        trim: true
    },
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    pathHistory: [{
        name: {
            type: 'String',
            trim: true
        },
        history: [
            {
                c: {
                    type: 'String'
                },
                r: {
                    type: Number
                },
                x: {
                    type: Number
                },
                y: {
                    type: Number
                },
                isDummy: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    }]
});

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;
