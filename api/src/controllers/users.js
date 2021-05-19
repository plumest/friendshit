import config from '../config.js'
import User from '../models/users.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = config.jwtSecret;

const re = RegExp("^(?:(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))(?!.*(.)\\1{2,})[A-Za-z0-9!~<>,;:_=?*+#.\"&§%°()\\|\\[\\]\\-\\$\\^\\@\\/]{12,128}$");

const logging = require("$logging").getLogger(__filename);

const add = async (req, res) => {
    let result = {};
    let status = 201;

    const {name, password} = req.body;
    const user = new User({name, password});

    if (!re.test(password)) {
        status = 401;
        result.status = status;
        result.error = `12 to 128 character password requiring at least 3 out 4 (uppercase and lowercase letters, numbers and special characters) and no more than 2 equal characters in a row`;
        res.status(status).send(result);
    } else {
        await user.save()
        try {
            // Create a token
            const payload = {user: name, _id: user._id};
            const options = {expiresIn: '1d'};

            result.token = jwt.sign(payload, jwtSecret, options);
            result.status = status;
            result.result = user;
        }
        catch (err) {
            logging.error(err)
            status = 500
            result.status = 500;
            result.error = err.message;
        }
        finally {
            res.status(status).send(result);
        }
    }
}

const getAll = (req, res) => {
    let result = {};
    let status = 200;

    const payload = req.decoded;

    if (payload && payload.user === 'admin') {
        User.find({}, (err, users) => {
            if (!err) {
                result.status = status;
                result.error = err;
                result.result = users;
            } else {
                status = 500;
                result.status = status;
                result.error = err;
            }
            res.status(status).send(result);
        });
    } else {
        status = 401;
        result.status = status;
        result.error = `Authentication error`;
        res.status(status).send(result);
    }
}

const login = async (req, res) => {
    const { name, password } = req.body;

    let result = {};
    let status = 200;
try {
    const user = await User.findOne({name})
    if (user) {
        // We could compare passwords in our model instead of below
        try {
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                // Create a token
                const payload = {user: user.name, _id: user._id};
                const options = {expiresIn: '1d'};

                result.token = jwt.sign(payload, jwtSecret, options);
                result.status = status;
                result.result = { name: user.name, _id: user._id };
            } else {
                status = 401;
                result.status = status;
                result.error = 'Authentication error';
            }
            res.status(status).send(result);
        }
        catch(err) {
            status = 500;
            result.status = status;
            result.error = err.message;
            res.status(status).send(result);
        }
    } else throw new Error("User not found")
}
catch (err) {
    status = 404;
    result.status = status;
    result.error = err.message;
    res.status(status).send(result);
}
}

export default { add, login, getAll };
