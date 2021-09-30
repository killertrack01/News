const jwt       = require('jsonwebtoken');
const USERMODEL = require('../models/users_model');

const auth = async (req, res, next) => {
    const token    = req.header("Authorization");
    const data = jwt.verify(token, "mk");

    try {
        const user = await USERMODEL.findOne({_id: data._id, "tokens.token": token});
        if (!user){
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error){
        res.status(401).send({error: "Not authorized to access this resource"});
    }
};

module.exports = auth;