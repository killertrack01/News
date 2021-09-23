const express = require('express');
const router  = express.Router();

router.get('/index' , (req , res)=>{
   let main = 'home/main';      // use main for global variable
   res.render('index', {main}); // render view with main 
});

module.exports = router;