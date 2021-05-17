import config from '../config.js'
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: () => uuidv4()
    },
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    }
});

// encrypt password before save
userSchema.pre('save', function (next) {
    const user = this;
    if(!user.isModified || !user.isNew) {
        // don't rehash if it's an old user
        next();
    } else {
        bcrypt.hash(user.password, config.saltingRounds, (err, hash) => {
            if (err) {
                console.log('Error hashing password for user', user.name);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;