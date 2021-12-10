const express   = require('express');
const router    = express.Router();
const auth      = require('../middleware/auth');
const User      = require('../core/user-core');
// BCRYPT
const bcrypt    = require('bcryptjs');
const saltRound = 10;
// MODEL
const USERMODEL = require("../models/users_model");
const jwt       = require("jsonwebtoken");

/**** **** **** **** **** **** ****
 * ROUTE GET USER TABLE DATA
 **** **** **** **** **** **** ****/
router.get('/index(/:pageNumber)?', async (req, res) => {
	const userclass  = new User(req.originalUrl);
	const sidebar    = userclass.sidebar_module(req.originalUrl);
	const moduleLink = userclass.url_module();

	// SEARCH BY USERNAME
	var search = {trash: false};
	// Use req.query.search
	if (req.query.search != undefined) {
		search = {trash: false, username: {$regex: '.*' + req.query.search + '.*'} };
	} 

	// PAGINATION
	const pageNumber = req.params.pageNumber;
	const limit      = 5;
	var skip         = (pageNumber == undefined) ? 0 : (pageNumber - 1) * limit;

	// VIEW PAGINATION
	const userdata      = await USERMODEL.find({trash: false});
	// -- Estimate User Data
	const totalUserData = userdata.length;
	// -- Total Page That We Got
	const totalPage     = Math.ceil(totalUserData / limit);
	// -- Export View
	var page = '';
	var count = skip; // Count Number Of Record
	for (let index = 1; index <= totalPage; index++){
		page += `<li class="page-item"><a class="page-link text-dark" href="admin/users/index/`+ index +`">`+index+`</a></li>`;
	}

	USERMODEL
		.find(search)
		.sort({ _id: -1 })
		.limit(limit)
		.skip(skip)
		.exec((err, data) => {
			if (err) {
				res.send({ kq: 0, err });
			} else {
				const viewMain  = userclass.getViewMainContent('table_data', data, page, count);
				const main      = userclass.getPath(); // use main for global variable
				res.render('index', { main, sidebar, viewMain, moduleLink }); // render view with main
			}
		});
});

/**** **** **** **** **** **** ****
 * ROUTE GET USER PROFILE
 **** **** **** **** **** **** ****/
router.get('/profile', (req, res) =>  {
	const userclass  = new User(req.originalUrl);
	const sidebar    = userclass.sidebar_module(req.originalUrl);
	const moduleLink = userclass.url_module();
	const viewMain   = userclass.getViewMainContent('profile');
	const main       = userclass.getPath(); // use main for global variable
	res.render('index', { main, sidebar, viewMain, moduleLink }); // render view with main
});

/**** **** **** **** **** **** ****
 * ROUTE GET USER FORM CREATE
 **** **** **** **** **** **** ****/
router.get('/add', (req, res) => {
	const userclass  = new User(req.originalUrl);
	const sidebar    = userclass.sidebar_module(req.originalUrl);
	const moduleLink = userclass.url_module();
	
	const role = [
		{ name: 'Administration', value: 'Admin' },
		{ name: 'Moderator', value: 'Moderator' },
		{ name: 'User', value: 'Customer' }
	];
	const arrForm = [
		{ tag: 'input'   , col: 12, type: 'text'    , name: 'username'   , id: 'username'  , data: []  , row: 0, placeholder: 'Enter username..'   , required: false, disabled: '', value:'' },
		{ tag: 'input'   , col: 6 , type: 'password', name: 'password'   , id: 'password'  , data: []  , row: 0, placeholder: 'Enter password..'   , required: false, disabled: '' , value:''},
		{ tag: 'input'   , col: 6 , type: 'password', name: 're_password', id: 'repassword', data: []  , row: 0, placeholder: 'Re-enter password..', required: false, disabled: '' , value:''},
		{ tag: 'input'   , col: 6 , type: 'email'   , name: 'email'      , id: 'email'     , data: []  , row: 0, placeholder: 'Enter email..'      , required: false, disabled: '', value:''},
		{ tag: 'input'   , col: 6 , type: 'phone'   , name: 'phone'      , id: 'phone'     , data: []  , row: 0, placeholder: 'Enter phone..'      , required: false, disabled: '' , value:''},
		{ tag: 'input'   , col: 12, type: 'text'    , name: 'address'    , id: 'address'   , data: []  , row: 0, placeholder: 'Enter address..'    , required: false, disabled: '' , value:''},
		{ tag: 'select'  , col: 6 , type: 'select'  , name: 'role'       , id: 'role'      , data: role, row: 0, placeholder: ''                   , required: false, disabled: '' },
		{ tag: 'textarea', col: 12, type: ''        , name: 'note'       , id: 'note'      , data: []  , row: 5, placeholder: 'Enter note..'       , required: false, disabled: '' , value:''},
	];
	const viewMain = userclass.getViewMainContent('form', arrForm);
	const main     = userclass.getPath(); // use main for global variable
	res.render('index', { main, sidebar, viewMain, moduleLink }); // render view with main
});

/**** **** **** **** **** **** ****
 * ROUTE GET USER FORM EDIT
 **** **** **** **** **** **** ****/
 router.get('/edit(/:id)?', (req, res) => {
	const userclass  = new User(req.originalUrl);
	const sidebar    = userclass.sidebar_module(req.originalUrl);
	const moduleLink = userclass.url_module();
	const id = req.params.id;

	const role = [
		{ name: 'Administration', value: 'Admin' },
		{ name: 'Moderator', value: 'Moderator' },
		{ name: 'User', value: 'Customer' }
	];

	USERMODEL
	.find({_id: id})
	.exec((err, data) => {
		if (err) {
			res.send({kq: 0, err})
		} else {
			if (data != '') {
				const arrForm = [
					{ tag: 'input'    , col: 12 , type: 'text'     , name: 'username'    , id: 'username'   , data: []  , row: 0, placeholder: 'Enter username..'    , required: false, disabled: false, value: data[0].username },
					{ tag: 'input'    , col: 6  , type: 'password' , name: 'password'    , id: 'password'   , data: []  , row: 0, placeholder: 'Enter password..'    , required: false, disabled: true , value: '************'   },
					{ tag: 'input'    , col: 6  , type: 'password' , name: 're_password' , id: 'repassword' , data: []  , row: 0, placeholder: 'Re-enter password..' , required: false, disabled: true , value: '************'   },
					{ tag: 'input'    , col: 6  , type: 'email'    , name: 'email'       , id: 'email'      , data: []  , row: 0, placeholder: 'Enter email..'       , required: false, disabled: false, value: data[0].email    },
					{ tag: 'input'    , col: 6  , type: 'phone'    , name: 'phone'       , id: 'phone'      , data: []  , row: 0, placeholder: 'Enter phone..'       , required: false, disabled: false, value: data[0].phone    },
					{ tag: 'input'    , col: 12 , type: 'text'     , name: 'address'     , id: 'address'    , data: []  , row: 0, placeholder: 'Enter address..'     , required: false, disabled: false, value: data[0].address  },
					{ tag: 'select'   , col: 6  , type: 'select'   , name: 'role'        , id: 'role'       , data: role, row: 0, placeholder: ''                    , required: false, disabled: false, value: data[0].role     },
					{ tag: 'textarea' , col: 12 , type: ''         , name: 'note'        , id: 'note'       , data: []  , row: 5, placeholder: 'Enter note..'        , required: false, disabled: false, value: data[0].note     },
				];
				const viewMain = userclass.getViewMainContent('edit-form', arrForm);
				const main     = userclass.getPath(); // use main for global variable
				res.render('index', { main, sidebar, viewMain, moduleLink }); // render view with main
			}
		}
	});
});

/**** **** **** **** **** **** **** ****
 * ROUTE POST PROCESS CREATE NEW USER
 **** **** **** **** **** **** **** ****/
router.post('/process', (req, res) => {
	var flag = 1, error = '';
	const { username, password, repassword, email, phone, address, role, note } = req.body;
	if (username === '') {
		flag = 0;
		error = 'Username is required !';
	} else if (password === '') {
		flag = 0;
		error = 'Password is required !';
	} else if (repassword === '') {
		flag = 0;
		error = 'Re-Enter Password is required !';
	} else if (email === '') {
		flag = 0;
		error = 'Email is required !';
	} else if (phone === '') {
		flag = 0;
		error = 'Phone is required !';
	} else if (address === '') {
		flag = 0;
		error = 'Address is required !';
	} else if (role === '') {
		flag = 0;
		error = 'Role must be choose one of them !';
	}	
	if (flag == 1) {
		// CHECK USERNAME EXISTED
		USERMODEL
			.find({ username })
			.exec((err, data) => {
					if (err) {
						res.send({ kq: 0, err });
					} else {
						if (data == '') {
							// HASH PASSWORD BEFORE INSERT INTO DATABASE
							bcrypt.genSalt(saltRound, function (err, salt) {
								bcrypt.hash(password, salt, function (err, hash) {
									try {
										// GENERATE TOKEN FOR USER
										const user    = new USERMODEL();
										const token   = jwt.sign({ _id: user._id }, "mk");
										const tokens  = user.tokens.concat({ token });
										const objUser = { username, password: hash, email, phone, address, role, note, tokens };
										// INSERT OBJECT USER INTO DATABASE
										USERMODEL.create(objUser, (err, data) => {
											if (err) {
												res.send({ kq: 0, err });
											} else {
												res.send({ kq: 1, data });
											}
										});
									} catch (err) {
										res.send(err);
									}
								});
							});
						} else {
							res.send({ kq: 0, err: 'Username has existed !' });
						}
					}
			});
	} else {
		res.send({ kq: 0, err: error });
	}
});

/**** **** **** **** **** **** ****
 * ROUTE POST UPDATE STATUS USER
 **** **** **** **** **** **** ****/
router.post('/check-status', (req, res) => {
    var error, flag = 1;
    const { id, value } = req.body;
		if (flag == 1) {
			// CHECK ID USER EXISTED
			USERMODEL
					.find({ _id: id })
					.exec((err, data) => {
						if (err) {
							res.send({ kq: 0, err });
						} else {
							if (data != '') {
								// UPDATE STATUS TO TRUE FOR USER
								USERMODEL
									.updateMany({ _id: id }, { status: value }, (err, data) => {
										if (err) {
												res.send({ kq: 0, err });
										} else {
												res.send({ kq: 1, data });
										}
									});
							} else {
									res.send({ kq: 0, err: 'Data does not existed' });
							}
						}
					});
		} else {
			res.send({ kq: 0, err: error });
		}
});

/**** **** **** **** **** **** ****
 * ROUTE POST USER GOTO TRASH
 **** **** **** **** **** **** ****/
router.post('/user-trash', (req, res) => {
	var error, flag = 1;
	const { id } = req.body;
	if (flag == 1) {
		// CHECK ID USER EXISTED
		USERMODEL
			.find({ _id: id })
			.exec((err, data) => {
				if (err) {
					res.send({ kq: 0, err });
				} else {
					if (data != '') {
						// UPDATE TRASH TO TRUE FOR DELETE
						USERMODEL
							.updateMany({ _id: id }, { trash: true }, (err, data) => {
								if (err) {
									res.send({ kq: 0, err });
								} else {
									res.send({ kq: 1, data});
								}
							});
					} else {
						res.send({ kq: 0, err: 'Record does not existed !' });
					}
				}
			});
	} else {
		res.send({ kq: 0, err: error });
	}
});

module.exports = router;