const express = require('express');
const router  = express.Router();

/****
 * Call other controllers to use.
 * Reason: Collect them together to make them compact.
 ****/
router.use('/admin/dashboard', require('./dashboard'));
// router.use('/', require('./products'));
// router.use('/', require('./categories'));
// router.use('/', require('./users'));

module.exports = router;