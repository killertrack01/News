const express = require('express');
const router  = express.Router();

/**** **** **** **** **** **** **** **** **** ****
 * Call other controllers to use.
 * Reason: Collect them together to make them compact.
 **** **** **** **** **** **** **** **** **** ****/

router.use('/admin/login', require('./login'));
router.use('/admin/dashboard', require('./dashboard'));
// router.use('/admin/news', require('./news'));
router.use('/admin/categories', require('./categories'));
// router.use('/admin/news-tags', require('./news_tags'));
router.use('/admin/users', require('./users'));
router.use('/admin/roles', require('./roles'));

/**** **** **** **** **** **** **** **** **** ****
 * Call API.
 **** **** **** **** **** **** **** **** **** ****/

module.exports = router;