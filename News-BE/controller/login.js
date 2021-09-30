const express = require('express');
const router = express.Router();

/** Invoke User Model **/
const USERMODEL = require('../models/users_model');

/** GET ROUTE **/
router.get('/index', (req, res) => {
    let main = 'login/main';                    // use main for global variable
    res.render('login', {main});  // render view with main
});

router.post("/users", async (req, res) => {
    // Create a new user
    try {
        const user = new USERMODEL(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/processlogin", async (req, res) => {
    try {
        const { username, password} = req.body;
        const user = await USERMODEL.findByCredentials(username, password);
        if (!user){
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await user.generateAuthToken();
        res.send({user, token});

    } catch (error) {
        res.status(400).send(error);
    }
});

/** POST ROUTE **/
// router.post('/process', (req, res) => {
//     var username = req.body.username
//     var password = req.body.password
//
//     USERMODEL.findOne({
//         username: username,
//         password: password
//         })
//         .then(data => {
//             if (data) {
//                 //console.log(data);
//                 var token = jwt.sign({_id: data._id}, 'mk')
//                 return res.json({
//                     message: 'Login Successful',
//                     token: token
//                 });
//             } else {
//                 console.log(data);
//                 return res.json('Login Fail !');
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json('Server Error !');
//         });
//
// });



module.exports = router;