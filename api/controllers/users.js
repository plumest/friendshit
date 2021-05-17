import config from '../config.js'
import mongoose from 'mongoose';
import User from '../models/users.js';

import bcrypt from 'bcrypt';

const connUri = config.connUri;

const add = (req, res) => {
    mongoose.connect(connUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            let result = {};
            let status = 201;

            if (!err) {
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
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        }
    );
}

const login = (req, res) => {
    const { name, password } = req.body;

    mongoose.connect(connUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            let result = {};
            let status = 200;
            if(!err) {
                User.findOne({name}, (err, user) => {
                    if (!err && user) {
                        // We could compare passwords in our model instead of below
                        bcrypt.compare(password, user.password).then(match => {
                            if (match) {
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
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        }
    );
}

export default { add, login };