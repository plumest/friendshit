import config from '../config.js'
import User from '../models/users.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = config.jwtSecret;

const add = (req, res) => {
    let result = {};
    let status = 201;

    const {name, password} = req.body;
    const user = new User({name, password});
    // document = instance of a model
    // TODO: We can hash the password here before we insert instead of in the model
    user.save()
        .then(user => {
            result.status = status;
            result.result = user;
        }).catch(err => {
            console.log(err)
            status = 500
            result.status = 500;
            result.error = err;
        }).finally(() => {
            res.status(status).send(result);
        });
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

const login = (req, res) => {
    const { name, password } = req.body;

    let result = {};
    let status = 200;

    User.findOne({name}, (err, user) => {
        if (!err && user) {
            // We could compare passwords in our model instead of below
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    // Create a token
                    const payload = { user: user.name };
                    const options = { expiresIn: '1d', issuer: 'https://scotch.io' };

                    result.token = jwt.sign(payload, jwtSecret, options);
                    result.status = status;
                    result.result = user;
                } else {
                    status = 401;
                    result.status = status;
                    result.error = 'Authentication error';
                }
                res.status(status).send(result);
            }).catch(err => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            });
        } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
}

export default { add, login, getAll };