const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const Admin   = require('../core/admin-core');


router.get('/index' , (req , res) => {
   const adminclass = new Admin(req.originalUrl);
   const sidebar    = adminclass.sidebar_module(req.originalUrl);
   const viewMain   = adminclass.getViewMainContent();
   const main       = adminclass.getPath(); // use main for global variable
   const moduleLink = adminclass.url_module();
   // const _script    = 0;
   res.render('index', {main, sidebar, viewMain, moduleLink}); // render view with main
});

module.exports = router;