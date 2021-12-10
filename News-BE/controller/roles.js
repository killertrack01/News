const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Role = require('../core/role-core');
// MODEL
const ROLEMODEL = require("../models/role_model");
const jwt = require("jsonwebtoken");


/**** **** **** **** **** **** ****
 * ROUTE GET ROLE TABLE DATA
 **** **** **** **** **** **** ****/
router.get('/index(/:pageNumber)?', async (req, res) => {
	const roleclass = new Role(req.originalUrl);
	const sidebar = roleclass.sidebar_module(req.originalUrl);
	const moduleLink = roleclass.url_module();

	// SEARCH BY USERNAME
	var search = { trash: false };
	// Use req.query.search
	if (req.query.search != undefined) {
		search = { trash: false, username: { $regex: '.*' + req.query.search + '.*' } };
	}

	// PAGINATION
	const pageNumber = req.params.pageNumber;
	const limit = 5;
	var skip = (pageNumber == undefined) ? 0 : (pageNumber - 1) * limit;

	// VIEW PAGINATION
	const roledata = await ROLEMODEL.find({ trash: false });
	// -- Estimate User Data
	const totalRoleData = roledata.length;
	// -- Total Page That We Got
	const totalPage = Math.ceil(totalRoleData / limit);
	// -- Export View
	var page = '';
	var count = skip; // Count Number Of Record
	for (let index = 1; index <= totalPage; index++) {
		page += `<li class="page-item"><a class="page-link text-dark" href="admin/roles/index/` + index + `">` + index + `</a></li>`;
	}

	// ARRAY CREATE FORM
	const arrForm = [
		{ tag: 'input', col: 12, type: 'text', name: 'roletitle'       , id: 'roletitle'      , data: [], row: 0, placeholder: 'Enter role title..' , required: false, disabled: '', value: '' },
		{ tag: 'input', col: 12, type: 'text', name: 'role_description', id: 'roledescription', data: [], row: 0, placeholder: 'Enter description..', required: false, disabled: '', value: '' },
	];

	// ARRAY EDIT FORM
	const arrFormEdit = [
		{ tag: 'input', col: 12, type: 'text', name: 'roletitle-edit'      , id: 'roletitle-edit'      , data: [], row: 0, placeholder: 'Enter role title..' , required: false, disabled: '', value: '' },
		{ tag: 'input', col: 12, type: 'text', name: 'roledescription-edit', id: 'roledescription-edit', data: [], row: 0, placeholder: 'Enter description..', required: false, disabled: '', value: '' },
	];

	ROLEMODEL
		.find(search)
		.sort({ _id: -1 })
		.limit(limit)
		.skip(skip)
		.exec((err, data) => {
			if (err) {
				res.send({ kq: 0, err });
			} else {
				const viewMain = roleclass.getViewMainContent('table_data', data, page, count, arrForm, arrFormEdit);
				const main = roleclass.getPath(); // use main for global variable
				res.render('index', { main, sidebar, viewMain, moduleLink }); // render view with main
			}
		});
});

/**** **** **** **** **** **** **** ****
 * ROUTE POST PROCESS CREATE NEW ROLE
 **** **** **** **** **** **** **** ****/
router.post('/process', (req, res) => {

	var flag = 1, error = '';
	const { roletitle, role_description } = req.body;

	if (roletitle == '') {
		flag = 0;
		error = 'Role title is required !';
	} else if (role_description == '') {
		flag = 0;
		error = 'Description is required !';
	}
	if (flag == 1) {
		// CHECK USERNAME EXISTED
		ROLEMODEL
			.find({ roletitle })
			.exec((err, data) => {
				if (err) {
					res.send({ kq: 0, err });
				} else {
					if (data == '') {
						try {
							const objRole = { roletitle, role_description };
							// INSERT OBJECT ROLE INTO DATABASE
							ROLEMODEL.create(objRole, (err, data) => {
								if (err) {
									res.send({ kq: 0, err });
								} else {
									res.send({ kq: 1, data });
								}
							});
						} catch (err) {
							res.send(err);
						}
					} else {
						res.send({ kq: 0, err: 'Role title has existed !' });
					}
				}
			});
	} else {
		res.send({ kq: 0, err: error });
	}
});


/**** **** **** **** **** **** **** ****
 * ROUTE GET VIEW ROLE DATA TO EDIT
 **** **** **** **** **** **** **** ****/
router.get('/role-edit(/:id)?', (req, res) => {

	var id = req.params.id;

	ROLEMODEL
		.findById({ _id: id, trash: false })
		.exec((err, data) => {
			if (err) {
				res.send({ kq: 0, err });
			} else {
				res.send({ kq: 1, data });
			}
		})
})

/**** **** **** **** **** **** **** ****
 * ROUTE GET ROLE DATA TO EDIT
 **** **** **** **** **** **** **** ****/
router.post('/edit', (req, res) => {

	var flag = 1, error = '';
	const { id, roletitle, role_description } = req.body;

	if (roletitle == '') {
		flag = 0;
		error = 'Role title is required !';
	} else if (role_description == '') {
		flag = 0;
		error = 'Description is required !';
	}
	if (flag == 1) {
		if (err) {
			res.send({ kq: 0, err });
		} else {
			if (data == '') {
				// UPDATE RECORE ROLE INTO DATABASE
				ROLEMODEL
					.updateOne({ _id: id }, { $set: { roletitle: roletitle, role_description: role_description } })
					.exec()
					.then((data) => {
						res.send({ kq: 1, data });
					}).catch((err) => {
						res.send({ kq: 0, err })
						console.log(err);
					})
			} else {
				res.send({ kq: 0, err: 'Role title has existed !' });
			}
		}
	}
});


/**** **** **** **** **** **** ****
 * ROUTE POST ROLE GOTO TRASH
 **** **** **** **** **** **** ****/
router.post('/role-trash', (req, res) => {
	var error, flag = 1;
	const { id } = req.body;
	if (flag == 1) {
		// CHECK ID USER EXISTED
		ROLEMODEL
			.find({ _id: id })
			.exec((err, data) => {
				if (err) {
					res.send({ kq: 0, err });
				} else {
					if (data != '') {
						// UPDATE TRASH TO TRUE FOR DELETE
						ROLEMODEL
							.updateMany({ _id: id }, { trash: true }, (err, data) => {
								if (err) {
									res.send({ kq: 0, err });
								} else {
									res.send({ kq: 1, data });
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