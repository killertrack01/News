const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const Admin   = require('../core/admin-core');


router.get('/index' , (req , res) => {
    const adminclass = new Admin(req.originalUrl);
    const sidebar    = adminclass.sidebar_module(req.originalUrl);
    const viewMain   = adminclass.getViewMainContent();
    const main       = adminclass.getPath(); // use main for global variable
    res.render('index', {main, sidebar, viewMain}); // render view with main
});

module.exports = router;