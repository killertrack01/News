const express = require('express');
const router  = express.Router();

/**** **** **** **** **** **** **** **** **** ****
 * Call other controllers to use.
 * Reason: Collect them together to make them compact.
 **** **** **** **** **** **** **** **** **** ****/

router.use('/admin/login', require('./login'));
router.use('/admin/dashboard', require('./dashboard'));
router.use('/admin/products', require('./products'));
router.use('/admin/categories', require('./categories'));
router.use('/admin/product-tags', require('./product_tags'));
// router.use('/', require('./users'));

module.exports = router;