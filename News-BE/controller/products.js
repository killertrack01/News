const express      = require('express');
const router       = express.Router();
const auth         = require('../middleware/auth');
const Product      = require('../core/product-core');
const PRODUCTMODEL = require('../models/products_model');
const multer       = require('multer');
var fileName       = [];
/**** **** **** **** **** **** ****
 * ROUTE GET PRODUCT TABLE DATA
 **** **** **** **** **** **** ****/
router.get('/index(/:pageNumber)?' ,async (req , res) => {
   const userclass    = new Product(req.originalUrl);
   const productclass = new Product(req.originalUrl);
   const moduleLink   = userclass.url_module();
   const sidebar      = productclass.sidebar_module(req.originalUrl);
   const action       = 'index';

   // PAGINATION
	const pageNumber = req.params.pageNumber;
	const limit      = 5;
	var skip         = (pageNumber == undefined) ? 0 : (pageNumber - 1) * limit;

	// VIEW PAGINATION
	const productdata      = await  PRODUCTMODEL.find({trash: false});
	// -- Estimate User Data
	const totalProductData = productdata.length;
	// -- Total Page That We Got
	const totalPage     = Math.ceil(totalProductData / limit);
	// -- Export View
	var page = `<li class="page-item"><a class="page-link text-dark" href="admin/products/index/1">«</a></li>`;
	var count = skip; // Count Number Of Record
	for (let index = 1; index <= totalPage; index++){
		if(index == pageNumber){
         page += `<li class="page-item active" style="background-color: red"><a class="page-link text-dark" href="admin/products/index/`+ index +`">`+index+`</a></li>`;
      }else{
         page += `<li class="page-item"><a class="page-link text-dark" href="admin/products/index/`+ index +`">`+index+`</a></li>`;
      }
	}

   page += `<li class="page-item"><a class="page-link text-dark" href="admin/products/index/`+ totalPage +`">»</a></li>`;
   
   PRODUCTMODEL
   .find({trash: false})
    .sort({_id: -1})
    .limit(limit)
	 .skip(skip)
    .exec((err, data)=>{
        if(err){
            res.send({kq:0, err});
        }else{
         const viewMain   = productclass.getViewMainContent('table_data',data, page, count);
         const main       = productclass.getPath(); // use main for global variable
         res.render('index', {main, sidebar, viewMain, moduleLink, action, pageNumber}); // render view with main
        }
    })
});



/**** **** **** **** **** **** ****
 * ROUTE GET PRODUCT FORM CREATE
 **** **** **** **** **** **** ****/
router.get('/add' , (req , res) => {
   const productclass = new Product(req.originalUrl);
   const moduleLink = productclass.url_module();
   const sidebar    = productclass.sidebar_module(req.originalUrl);
   const action    = 'add';
   const categoryData = [
      { name: 'category 1'    , value: 'category' },
      { name: 'category 2'    , value: 'category' },
      { name: 'category 3'    , value: 'category' }
   ];

   const supplierData = [
      { name: 'supplier 1'    , value: 'supplier' },
      { name: 'supplier 2'    , value: 'supplier' },
      { name: 'supplier 3'    , value: 'supplier' }
   ];

   const tagData = [
      {name: 'Vegestable'},
      {name: 'Fruit'},
      {name: 'Dry Food'},
      {name: 'Organic Vegetables'}
   ];

   const arrForm    = [
      { tag: 'input'    , type: 'text' , name: 'productTitle'     , id: 'productTitle'     , data: []           , row: 0, col: 12 , placeholder: 'Enter product title...'              , required: true , disabled: false, append: ``  , multiple: false, accept: ``                      },
      { tag: 'input'    , type: 'text' , name: 'productAlias'     , id: 'productAlias'     , data: []           , row: 0, col: 12 , placeholder: 'Alias will auto generate by name...' , required: false, disabled: false, append: ``  , multiple: false, accept: ``                      },
      { tag: 'input'    , type: 'text' , name: 'price'            , id: 'price'            , data: []           , row: 0, col: 12 , placeholder: 'Enter product price...'              , required: true , disabled: false, append: `$` , multiple: false, accept: ``                      },
      { tag: 'input'    , type: 'text' , name: 'discount'         , id: 'discount'         , data: []           , row: 0, col: 12 , placeholder: 'Enter discount for product...'       , required: false, disabled: false, append: `%` , multiple: false, accept: ``                      },
      { tag: 'input'    , type: 'text' , name: 'stock'            , id: 'stock'            , data: []           , row: 0, col: 6  , placeholder: 'Enter product stock...'              , required: true , disabled: false, append: ``  , multiple: false, accept: ``                      },
      { tag: 'input'    , type: 'text' , name: 'sku'              , id: 'sku'              , data: []           , row: 0, col: 6  , placeholder: 'Enter product SKU...'                , required: false, disabled: false, append: ``  , multiple: false, accept: ``                      },
      { tag: 'input'    , type: 'file' , name: 'photo'            , id: 'photo'            , data: []           , row: 0, col: 12 , placeholder: ''                                    , required: false, disabled: false, append: ``  , multiple: true , accept: `image/png, image/jpeg` },
      { tag: 'tag'      , type: 'text' , name: 'productTag'       , id: 'tag-input'        , data: tagData      , row: 0, col: 12 , placeholder: 'Enter product tags...'               , required: false, disabled: false, append: ``  , multiple: false, accept: ``                      },
      { tag: 'select'   , type: ''     , name: 'category'         , id: 'categories'       , data: categoryData , row: 0, col: 6  , placeholder: ''                                    , required: true , disabled: false, append: ``  , multiple: false, accept: ``                      },
      { tag: 'select'   , type: ''     , name: 'supplier'         , id: 'suppliers'        , data: supplierData , row: 0, col: 6  , placeholder: ''                                    , required: false, disabled: false, append: ``  , multiple: false, accept: ``                      },
      { tag: 'textarea' , type: ''     , name: 'shortDescription' , id: 'shortDescription' , data: []           , row: 4, col: 12 , placeholder: 'Enter short description...'          , required: true , disabled: false, append: ``  , multiple: false, accept: ``                      }
   ];
   
   const viewMain   = productclass.getViewMainContent('create', arrForm);
   const main       = productclass.getPath(); // use main for global variable
   res.render('index', {main, sidebar, viewMain, moduleLink, action}); // render view with main
});

/**** **** **** **** **** **** ****
 * ROUTE GET PRODUCT FORM EDIT
 **** **** **** **** **** **** ****/
 router.get('/edit(/:id)?' , (req , res) => {
   const productclass = new Product(req.originalUrl);
   const moduleLink = productclass.url_module();
   const sidebar    = productclass.sidebar_module(req.originalUrl);
   const action    = 'edit';
   const id    = req.params.id;
   const categoryData = [
      { name: 'category 1'    , value: 'category' },
      { name: 'category 2'    , value: 'category 2' },
      { name: 'category 3'    , value: 'category 3' }
   ];

   const supplierData = [
      { name: 'supplier 1'    , value: 'supplier' },
      { name: 'supplier 2'    , value: 'supplier 2' },
      { name: 'supplier 3'    , value: 'supplier 3' }
   ];

   const tagData = [
      {name: 'Vegestable'},
      {name: 'Fruit'},
      {name: 'Dry Food'},
      {name: 'Organic Vegetables'}
   ];

   PRODUCTMODEL
	.find({_id: id})
	.exec((err, data) => {
		if (err) {
			res.send({kq: 0, err})
		} else {
			if (data != '') {
            console.log(data);
            console.log(data[0].sku);

            const tags = [];

            data[0].tag.forEach(function(e){
               tags.push(e.value);
            });

            console.log(tags);

				const arrForm    = [
               { tag: 'input'     , type: 'text'  , name: 'productTitle'     , id: 'productTitle'     , data: []           , row: 0, col: 12 , placeholder: 'Enter product title...'              , required: true , disabled: false, value: data[0].productTitle     , append: ``  , multiple: false , accept: ``                      },
               { tag: 'input'     , type: 'text'  , name: 'productAlias'     , id: 'productAlias'     , data: []           , row: 0, col: 12 , placeholder: 'Alias will auto generate by name...' , required: false, disabled: false, value: data[0].productAlias     , append: ``  , multiple: false , accept: ``                      },
               { tag: 'input'     , type: 'text'  , name: 'price'            , id: 'price'            , data: []           , row: 0, col: 12 , placeholder: 'Enter product price...'              , required: true , disabled: false, value: data[0].price            , append: `$` , multiple: false , accept: ``                      },
               { tag: 'input'     , type: 'text'  , name: 'discount'         , id: 'discount'         , data: []           , row: 0, col: 12 , placeholder: 'Enter discount for product...'       , required: false, disabled: false, value: data[0].discount         , append: `%` , multiple: false , accept: ``                      },
               { tag: 'input'     , type: 'text'  , name: 'stock'            , id: 'stock'            , data: []           , row: 0, col: 6  , placeholder: 'Enter product stock...'              , required: true , disabled: false, value: data[0].stock            , append: ``  , multiple: false , accept: ``                      },
               { tag: 'input'     , type: 'text'  , name: 'sku'              , id: 'sku'              , data: []           , row: 0, col: 6  , placeholder: 'Enter product SKU...'                , required: false, disabled: false, value: data[0].sku              , append: ``  , multiple: false , accept: ``                      },
               { tag: 'input'     , type: 'file'  , name: 'photo'            , id: 'photo'            , data: []           , row: 0, col: 12 , placeholder: ''                                    , required: false, disabled: false, value: data[0].photo            , append: ``  , multiple: true  , accept: `image/png, image/jpeg` },
               { tag: 'input'     , type: 'radio' , name: 'showHideProduct'  , id: 'showHideProduct'  , data: []           , row: 0, col: 12 , placeholder: ''                                    , required: false, disabled: false, value: data[0].showHideProduct  , append: ``  , multiple: false , accept: ``                      },
               { tag: 'tag'       , type: 'text'  , name: 'productTag'       , id: 'tag-input'        , data: tagData      , row: 0, col: 12 , placeholder: 'Enter product tags...'               , required: false, disabled: false, value:         tags             , append: ``  , multiple: false , accept: ``                      },
               { tag: 'select'    , type: ''      , name: 'category'         , id: 'categories'       , data: categoryData , row: 0, col: 6  , placeholder: ''                                    , required: true , disabled: false, value: data[0].categories       , append: ``  , multiple: false , accept: ``                      },
               { tag: 'select'    , type: ''      , name: 'supplier'         , id: 'suppliers'        , data: supplierData , row: 0, col: 6  , placeholder: ''                                    , required: false, disabled: false, value: data[0].suppliers        , append: ``  , multiple: false , accept: ``                      },
               { tag: 'textarea'  , type: ''      , name: 'shortDescription' , id: 'shortDescription' , data: []           , row: 4, col: 12 , placeholder: 'Enter short description...'          , required: true , disabled: false, value: data[0].shortDescription , append: ``  , multiple: false , accept: ``                      },
               { tag: 'sumernote' , type: ''      , name: 'longDescription'  , id: 'longDescription'  , data: []           , row: 4, col: 12 , placeholder: 'Enter long description...'           , required: true , disabled: false, value: data[0].longDescription  , append: ``  , multiple: false , accept: ``                      }
            ];
				const viewMain   = productclass.getViewMainContent('edit', arrForm);
            const main       = productclass.getPath(); // use main for global variable
            res.render('index', {main, sidebar, viewMain, moduleLink, action, id, tags:tags}); // render view with main
			}
		}
	});

   
});


// define storage for images
const storage = multer.diskStorage({
   // destination for file
   destination: function(req,file,cb){
      cb(null,'./public/img/product');
   },

   //create file name ([date add].extenstion) 
   filename: function(req,file,cb){
      var name = Date.now() + file.originalname;

      name = name.replace(/ + /g, " ");
  
      name = name.replace(/ /g, "-");

      console.log(file);
      cb(null,name);
      fileName.push(name);
   }
});

// upload parameter
const upload = multer({storage: storage});

/**** **** **** **** **** **** ****
 * ROUTE upload product photo
 **** **** **** **** **** **** ****/
router.post('/processfile', upload.array('photo',6), (req, res) => {
   res.send("upload success");
 });

/**** **** **** **** **** **** ****
 * ROUTE CREATE PRODUCT
 **** **** **** **** **** **** ****/
router.post('/createProduct' , (req , res) => {

   const {productTitle, productAlias, categories, suppliers, price, stock, sku, discount, shortDescription, longDescription, showHideProduct} = req.body;
   
   const productTag = req.body['tag[]'];
   console.log(req.body['tag[]']);
   const tag = [];
   const photo = fileName;
   fileName = [];

   productTag.forEach(item => {
      tag.push({
         value: item,
      });
   }); 

   console.log(tag);

   const objProduct = {productTitle, productAlias, categories, suppliers, price, stock, sku, discount, shortDescription, longDescription, tag, photo ,showHideProduct};
   
   PRODUCTMODEL.create(objProduct,(err,data) =>{
      if(err){
         console.log(err);
         res.send({kq:0 ,err});
      }else{
         console.log(objProduct.photo);
         console.log(data);
         res.send({kq:1 ,data});
      }
   });
});

/**** **** **** **** **** **** ****
 * ROUTE Update PRODUCT
 **** **** **** **** **** **** ****/
 router.post('/updateProduct' , (req , res) => {

   const {id, productTitle, productAlias, categories, suppliers, price, stock, sku, discount, shortDescription, longDescription, showHideProduct} = req.body;
   
   const productTag = req.body['tag[]'];
   console.log(req.body['tag[]']);
   const tag = [];
   const photo = fileName;
   fileName = [];

   productTag.forEach(item => {
      tag.push({
         value: item,
      });
   }); 

   console.log(tag);

   const objProduct = {productTitle, productAlias, categories, suppliers, price, stock, sku, discount, shortDescription, longDescription, tag, photo ,showHideProduct};
   
   PRODUCTMODEL
   .find({_id: id})
   .exec((err,data)=>{
      if(err){
         res.send({kq:0, err});
      }else{
         PRODUCTMODEL.updateOne({_id: id}, objProduct, (update_err,update_data) =>{
            if(update_err){
               res.send({kq:0, update_err});
            }else{
               res.send({kq:1, update_data});
            }
         });
      }
   });
});

/**** **** **** **** **** **** ****
 * ROUTE DELETE PRODUCT
 **** **** **** **** **** **** ****/

router.post('/product-trash',(req , res)=>{
   const id = req.body.id;
   console.log(req.body);
   
   PRODUCTMODEL
   .find({_id: id})
   .exec((err,data)=>{
      if(err){
         res.send({kq:0, err});
      }else{
         PRODUCTMODEL.updateOne({_id: id}, {trash: true}, (update_err,update_data) =>{
            if(update_err){
               res.send({kq:0, update_err});
            }else{
               res.send({kq:1, update_data});
            }
         });
      }
   });
});

/**** **** **** **** **** **** ****
 * ROUTE SHOW/HIDE PRODUCT
 **** **** **** **** **** **** ****/

 router.post('/showHideProduct',(req , res)=>{
   const id = req.body.id;
   const value = req.body.value;
   console.log(req.body);

   PRODUCTMODEL
   .find({_id: id})
   .exec((err,data)=>{
      if(err){
         res.send({kq:0, err});
      }else{
         PRODUCTMODEL.updateOne({_id: id}, {showHideProduct: value}, (update_err,update_data) =>{
            if(update_err){
               res.send({kq:0, update_err});
            }else{
               res.send({kq:1, update_data});
            }
         });
      }
   });
});
module.exports = router;


