const express       = require('express');
const mongoose      = require('mongoose');
const router        = express.Router();
const auth          = require('../middleware/auth');
const Category      = require('../core/category-core');
const CATEGORYMODEL = require('../models/categories_model');

/**** **** **** **** **** **** ****
 * ROUTE GET CATEGORY INDEX
 **** **** **** **** **** **** ****/
router.get('/index(/:pageNum)?', async(req, res) => {
    const cateAdmin = new Category(req.originalUrl);
    const sidebar = cateAdmin.sidebar_module(req.originalUrl);
    const moduleLink = cateAdmin.url_module();

    //  PAGINATION 
    var skip;
    const pageNum = req.params.pageNum;
    const limit = 6;
    skip = (pageNum == undefined) ? 0 : (pageNum - 1) * limit;

    // VIEW PAGINATION
    const data_category = await CATEGORYMODEL.find({trash: false });
    // -- Estimate Category Data
    const sumData = data_category.length;
    // -- Total Page That We got
    const sumPage = Math.ceil(sumData / limit);
    // -- Export View
    var str = '';
    for (let index = 1; index <= sumPage; index++) {
        str += ' <li class="page-item"><a class="page-link text-dark" href="admin/' + moduleLink + '/index/' + index + '">' + index + '</a></li>'
    }


    // Form array 
    // --Array for Category form create
    const arrForm = [
        { tag: 'input'   , type: 'text'  , name: 'category_name' , id: 'category_name' , data: []         , row: 0, placeholder: 'Enter category title...', required: true , disabled: false, col: 12 },
        { tag: 'input'   , type: 'text'  , name: 'alias'          , id: 'alias'          , data: []         , row: 0, placeholder: 'Alias will be generated', required: false, disabled: true , col: 12 },
        { tag: 'textarea', type: ''      , name: 'description'    , id: 'description'    , data: []         , row: 5, placeholder: 'Enter Description...'   , required: false, disabled: false, col: 12 },
    ];
    // --Array for Category form edit
    const arrFormEdit = [
        { tag: 'input'   , type: 'text'  , name: 'category_name' , id: 'category_name-edit' , data: []         , row: 0, placeholder: 'Enter category title...', required: true , disabled: false, col: 12 },
        { tag: 'input'   , type: 'text'  , name: 'alias'          , id: 'alias-edit'          , data: []         , row: 0, placeholder: 'Alias will be generated', required: false, disabled: true , col: 12 },
        { tag: 'textarea', type: ''      , name: 'description'    , id: 'description-edit'    , data: []         , row: 5, placeholder: 'Enter Description...'   , required: false, disabled: false, col: 12 },
    ];

    CATEGORYMODEL
        .find({trash: false })
        .limit((limit))
        .skip((skip))
        .exec((err, tableData) => {
            if (err) {
                res.send({ kq: 0, err });
            } else {
                const viewMain = cateAdmin.getViewMainContent(tableData, arrForm, arrFormEdit, str);
                const main = cateAdmin.getPath(); // use main for global variable
                res.render('index', { main, sidebar, viewMain, moduleLink }); // render view with main    
            }
        })
});

/**** **** **** **** **** **** ****
 * ROUTE CREATE NEW CATEGORY 
 **** **** **** **** **** **** ****/
router.post('/add', (req, res) => {
    var category_name, alias, description;

    category_name  = req.body.category_name;
    alias = req.body.alias;
    description = req.body.description;
    
    const category = { category_name, alias, description };
    
    CATEGORYMODEL.find({ category_name }).exec((err, data) => {
        if (err) {
            res.send({ kq: 0, err });
        } else {
            if (data == "") {
                CATEGORYMODEL.create(category, (err1, data1) => {
                    if (err1) {
                        res.send({ kq: 0, err1 });
                    } else {
                        res.send({ kq: 1, data1 });
                    }
                })
            } else {
                res.send({ kq: 0, err: 'Category name is exsit' });
            }
        }
    })
});
/**** **** **** **** **** **** ****
 * ROUTE GET CATEGORY FORM EDIT
 **** **** **** **** **** **** ****/
router.get('/category-get(/:id)?', (req, res) => {

    var id = req.params.id;

    CATEGORYMODEL
        .findById({ _id: id, trash: false })
        .exec((err, data) => {
            if (err) {
                res.send({ kq: 0, err });
            } else {
                res.send({ kq: 1, data });
            }
        })
})

/**** **** **** **** **** **** ****
 * ROUTE EDIT CATEGORY
 **** **** **** **** **** **** ****/
router.post('/edit', (req, res) => {
        var id, category_name, alias,description;
        
        id = req.body.id;
        category_name = req.body.category_name;
        alias = req.body.alias;
        description = req.body.description;

    // --Find category by id 
        CATEGORYMODEL
        .find({_id:id})
        .exec((err,data)=>{
            if (err) {
                res.send({kq:0,err})
            }else{
                // --Update category
                        CATEGORYMODEL
                        .updateOne({ _id: id }, { $set: { category_name: category_name, alias: alias, description: description } })
                        .exec((err1,data1)=>{
                            if (err1) {
                                res.send({kq:0,err1})
                            }else{
                                res.send({kq:1,data1})
                            }
                        })
            } 
        })   
    })

/**** **** **** **** **** **** ****
 * ROUTE DELETE CATEGORY
 **** **** **** **** **** **** ****/
router.post('/category-trash', (req, res) => {

    var id;
    id = req.body.id;

    // --Find category by id 
    CATEGORYMODEL
        .find({ _id: id })
        .exec((err, data) => {
            if (err) {
                res.send({ kq: 0, err })
            } else {
                // --Process to delete
                CATEGORYMODEL
                .updateOne({ _id: id }, { trash: true }, (err2, data2) => {
                    if (err2) {
                        res.send({ kq: 0, err2 });
                    } else {
                        res.send({ kq: 1 });
                    }
                })
            }
        })
})


module.exports = router;