const Admin = require(`../core/admin-core`);

class ProductCore extends Admin {

    /** Get Dynamic Tittle For Each Content **/
  getTittleModule(key = '') {
    var str = '';
        switch (key) {
          case "productTitle": str = 'Product Title';
            break;
          case "tag": str = 'Tag';
            break;
          case "productAlias": str = 'Product Alias';
            break;
          case "price": str = 'Product price';
            break;
          case "discount": str = 'Discount';
            break;
          case "stock": str = 'Stock';
            break;
          case "sku": str = 'SKU';
            break;  
          case "photo": str = 'Product photo';
            break;  
          case "productTag": str = 'Tag';
            break;
          case "category": str = 'Category';
            break;
          case "supplier": str = 'Supplier';
            break;
          case "shortDescription": str = 'Short description';
            break;
    }
    return str;
  }

    getViewMainContent(key, array, pagination, count, pageNumber) {
        var str = ""; 
        switch (this.url_module()) {
            case "products":
                switch (key) {
                    case "table_data":
                        str += this.getProductContent(array, pagination, count, pageNumber);
                        break;
                    case "create":
                        str += this.getFormCreateProduct(array);
                        break;
                    case "edit":
                        str += this.getFormEditProduct(array);
                        break;
                }
                break;
            default:
                str += this.getDashboard();
                break;
        }
        return str;
    }

    buildHtmlInput(type='text', input_id = '', input_name = '',
           placeholder= '', required = false, disabled = false, value = ''){
    // Check required
    var is_required = (required === true) ? 'required = "required"' : '';
    // Check disabled
    var is_disabled = (disabled === true) ? 'disabled = "disabled"' : '';

    return `<input type="` + type +`" class="form-control rounded-0 ` + input_name  + `" name="`+ input_name +`" id="` + input_id + `" 
    value="` + value + `" placeholder="` + placeholder + `" `+ is_required +` ` + is_disabled + `>`;
    }

    buildHtmlInputFile(type='text', input_id = '', input_name = '',
           placeholder= '', required = false, disabled = false, multiple = false,accept = ''){
    // Check required
    var is_required = (required === true) ? 'required = "required"' : '';
    // Check disabled
    var is_disabled = (disabled === true) ? 'disabled = "disabled"' : '';
    // Check accept
    var is_accept = (accept != ``) ? 'accept = "'+ accept +'"' : '';
    
    var is_multiple = (multiple === true) ? 'multiple' : '';
    return `<input type="` + type +`" class="form-control rounded-0 ` + input_name  + `" name="`+ input_name +`" id="` + input_id + `" 
     placeholder="` + placeholder + `" `+ is_required +` ` + is_disabled + ` ` + is_multiple + ` `+ is_accept +`>`;
    }

    buildHtmlTag(type = `text`, input_id = ``, input_name = ``,
        placeholder = ``, required = false, disabled = false) {
        // Check required
        var is_required = (required === true) ? `required = "required"` : ``;
        // Check disabled
        var is_disabled = (disabled === true) ? `disabled = "disabled"` : ``;
        return `<input type="` + type + `" class="rounded-0 ` + input_name + `" id="` + input_id + `" 
        placeholder="` + placeholder + `" ` + is_disabled + `>`;
    }


    // Build HTML Select
        buildHtmlSelect(array=[], input_name='', input_id='',
        required= false, disabled= false, value='') {
    // Check Required
    var is_required = (required === true) ? 'required="required"' : '';
    // Check Disabled
    var is_disabled = (disabled === true) ? 'disabled="disabled"' : '';
    var str='<option value="" selected disabled>---Select---</option>';
    array.forEach(e=>{
        if(e.value == value){
            str += '<option value="'+ e.value +'" selected>' + e.name + '</option>';
        }else{
            str += '<option value="'+ e.value +'">' + e.name + '</option>';
        }
    
    });
    return `<select class="form-control custom-select rounded-0 `+ input_name +`" name="`+ input_name +`" id="`+ input_id +`" 
    value="` + value + `" `+ is_required +``+ is_disabled +`>` + str + `</select>`;
    }
    // Build HTML Textarea
    buildHtmlTextarea(input_name= '', input_id= '', rows= 3,
        placeholder='', required= false, disabled= false , value = '') {
    // Check Required
    var is_required = (required === true) ? 'required="required"' : '';
    // Check Disabled
    var is_disabled = (disabled === true) ? 'disabled="disabled"' : '';
    return `<textarea class="form-control rounded-0 `+ input_name +`" name="`+input_name+`" id="`+ input_id +`"  rows="`+ rows +`" placeholder="`+ placeholder +`"  
     `+ is_required +` `+ is_disabled +`>` + value + `</textarea>`;
    }

    getTag = (type, id, name, placeholder, required, disabled, col) => {
        var str = ``;
        var s_required = (required === true) ? ` <span class="required text-danger">*</span>` : ``;
        str += `<div class="col-` + col + `">`;
        str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
        str += `<div class="tag-container">`;
        str += this.buildHtmlTag(type, id, name, placeholder, required, disabled);
        str += `</div>`;
        str += `<div class="tag-suggest">`;
        str += `</div>`;
        str += `</div>`;

        return str;
    };

    getInput = (type, id, name, placeholder, required, disabled, col,value) => {
        var str = ``;
        var s_required = (required === true) ? ` <span class="required text-danger">*</span>` : ``;
        str += `<div class="col-` + col + `">`;
        str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
        str += this.buildHtmlInput(type, id, name, placeholder, required, disabled, value);
        str += `<small></small>`;
        str += `</div>`;

        return str;
    };
    getInputGourp = (type, id, name, placeholder, required, disabled, col, append, value) => {
        var str = ``;
        var s_required = (required === true) ? ` <span class="required text-danger">*</span>` : ``;

        str += `<div class="col-` + col + `">`; 
        str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
        str += `<div class="input-group `+ name +`-input-group">`;
        str += this.buildHtmlInput(type, id, name, placeholder, required, disabled , value);
        str += `<div class="input-group-append">`;
        str += `<span class="input-group-text">` + append + `</span>`;
        str += `</div>`;
        str += `<small></small>`;
        str += `</div>`;
        str += `</div>`;

        return str;
    };

    // Get Select
    getSelect(data, name, required, disabled, id, col , value) {
        var str = ``;
        var s_required = (required === true) ? ` <span class="required text-danger">*</span>` : ``;
        str += `<div class="col-` + col + `">`;
        str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
        str += this.buildHtmlSelect(data, name, id, required, disabled, value);
        str += `<small></small>`;
        str += `</div>`;
        
        return str;
    }

    // Get Textare
    getTextArea(name, id, rows, placeholder, required, disabled, col, value) {
        var str = ``;
        var s_required = (required === true) ? ` <span class="required text-danger">*</span>` : ``;
        str += `<div class="col-` + col + `">`;
        str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
        str += this.buildHtmlTextarea(name, id, rows, placeholder, required, disabled, value);
        str += `<small></small>`;
        str += `</div>`;
        return str;
    }
    getProductImage(type, id, name, placeholder, required, disabled, col, multiple, accept){
        var str = ``;
        var s_required = (required === true) ? ` <span class="required text-danger">*</span>` : ``;
        str += `<div class="col-` + col + `">`;
        str += `<div class="form-group files">`;
        str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
        str += `<div id="product_file_holder">`;
        str += this.buildHtmlInputFile(type, id, name, placeholder, required, disabled, multiple, accept);
        str += `</div>`;
        str += `</div>`;
        str += `</div>`;
        str += `<div class="col-12">`
        str += `<div class="row">`
        str += `<div class="col image_review">`
        str += `</div>`
        str += `</div>`
        str += `</div>`;
        return str;
    }

    // Get Products Content
    getProductContent(array, pagination, count , pageNumber) {
        var str = ``;
        str += `<!-- /.row -->
    <!-- Product content -->
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
              <div class="container-fluid">
              <!-- /.row -->
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">` + this.getTittleModule() + ` 
                      <a href="admin/products/add"><button type="button" class="btn btn-green-basket btn-sm ml-2" ><i class="fa fa-plus-square mr-1"></i> Add more data</button></a>
                      <button type="button" class="btn bg-gradient-navy btn-sm ml-2"><i class="far fa-file-excel mr-1"></i> Export Excel</button>
                      </h3>
                      <div class="card-tools">
                      	
                        <div class="input-group input-group-sm" style="width: 350px; margin-top: 2px;">
                        <button type="button" class="btn bg-gradient-navy btn-sm mr-2"> <i class="fas fa-sort text-light"></i> <span class="text-light">Filter</span></button>
                        <button type="button" class="btn bg-gradient-navy btn-sm mr-2"><i class="fas fa-sort text-light"></i> <span class="text-light">Sort</span></button>
                          <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
                          <div class="input-group-append">
                            <button type="submit" class="btn bg-gradient-navy">
                              <i class="fas fa-search text-light"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                      <table class="table table-striped text-nowrap">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Photo</th>
                            <th>Category</th>
                            <th>Supplier</th>
                            <th>Show/Hide</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>`
                        array.forEach((e) => {
                            var checked = (e.showHideProduct === true) ? 'checked' : '';
                            str += `<tr id="delete_ `+ e._id +` ">
                            <td>` + ++count + `</td>
                            <td>` + e.productTitle + `</td> 
                            <td>` + e.price + `$<br><small class="text-olive">Discount: `+ e.discount +`%</small></td>
                            <td>` + e.stock + ` <br><small class="text-olive">SKU: `+ e.sku +`</small></td>
                            <td><img src="/img/product/` + e.photo[0]  + `" width="100px" alt="Product image" ></td>
                            <td>` + e.categories + `</td>
                            <td>` + e.suppliers + `</td>
                            <td>
                            <div class="form-group">
                                      <div class="custom-control custom-switch">
                                          <input type="checkbox" class="custom-control-input showHideProduct" id="checkbox_`+ e._id + `" data-id="`+ e._id + `" ` + checked + `>
                                              <label class="custom-control-label" for="checkbox_`+ e._id + `">Hide/Show</label>
                                      </div>
                                  </div>
                            </td>
                            <td>
                                <div class="btn-group">
                                <a href="admin/`+ this.url_module() + `/edit/` + e._id + `">
                                <button type="button" class="btn btn-default btn-sm editProductBtn" 0d="`+ e._id +`">
                                    <i class="fas fa-edit"></i>
                                </button>
                                </a>
                                <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button type="button" class="btn btn-default btn-sm deleteProductBtn" data-id="`+ e._id +`" data-toggle="modal" data-target="#modal-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                                </div>
                            </td>
                            </tr>`
                        });
                        str +=  `</tbody>
                      </table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer clearfix">
                    <ul class="pagination pagination-sm m-0 float-left">
                    `+ pagination + `
                    </ul>
                </div>
              </div>
                  <!-- /.card -->
                </div>
              </div>
              <!-- /.row -->
            </div>
        </div>
    </div>
    <!-- /.row -->`;
    return str;
    }

    // Get Products create From
    getFormCreateProduct(array) {
        var str = ``;
        str += `<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">Product</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Products</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="card card-dark">
                <div class="card-header">
                    <h3 class="card-title">Create new product</h3>
                </div>
                <div class="card-body">
                    <form id="productCreateForm" enctype="multipart/form-data">
                        <div class="form-group">
                            <div class="row mb-2"><div class="col-sm-12 col-md-4 col-lg-4">`
        array.forEach(e => {
                if (e.id === `productTitle` || e.id === `productAlias`) {
                    str += `<div class="row mb-2">`
                    str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col);
                    str += `</div>`
                } else if (e.id === `price` || e.id === `discount`) {
                    str += `<div class="row mb-2">`
                    str += this.getInputGourp(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col, e.append);
                    str += `</div>`
                }
        });
        str += `<div class="row mb-2">`
        array.forEach(e => {
                if (e.id === `stock` || e.id === `sku`) {
                    str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col);
                }
        });
        str += `</div>
                 </div>
                 <div class="col-sm-12 col-md-4 col-lg-4">
                <div class="row mb-2">`
        array.forEach(e => {
            if (e.tag === `select`) {
                str += this.getSelect(e.data, e.name, e.required, e.disabled, e.id, e.col);
            }
        });

        str += `</div>`

        array.forEach(e => {
            if (e.tag === `tag`) {
                str += `<div class="row mb-2">`
                str += this.getTag(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col);
                str += `</div>`
            } else if (e.tag === `textarea`) {
                str += `<div class="row mb-2">`
                str += this.getTextArea(e.name, e.id, e.row, e.placeholder, e.required, e.disabled, e.col);
                str += `</div>`
            }
        });
        str += `</div>
        <div class="col-sm-12 col-md-4 col-lg-4">`
            array.forEach(e => {
                if (e.id === `photo`) {
                    str += `<div class="row mb-2">`
                    str += this.getProductImage(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col, e.multiple, e.accept);
                    str += `</div>`
                }
            });     
            str += `</div>
                            </div>
                            <!-----------------
                                --Long description
                                ------------------>
                            <div class="mb-2">
                                <label for="longDescription">Long description</label>
                                <textarea class="row summernote" name="longDescription" id="longDescription"></textarea>
                            </div>
                            
                            <div class="row mb-2">
                                <!------------------ 
                                --Show hide product
                                ------------------->
                                <div class="col-12">
                                    <div class="btn-group" id="status" data-toggle="buttons">
                                        <label class="btn btn-default btn-on-1 btn-sm active">
                                            <input type="radio" id="showProduct" class="radiobutton" value="1"
                                                name="showHideProduct">SHOW</label>
                                        <label class="btn btn-default btn-off-1 btn-sm ">
                                            <input type="radio" id="hideProduct" class="radiobutton" value="0"
                                                name="showHideProduct" checked="checked">HIDE</label>
                                    </div>
                                    <label id="showHideProductLabel" class="text-danger">Product will not be
                                        shown</label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-12">
                                <input type="submit" id="btnProductCreate" class="btn btn-green-basket" value="Create">
                                <input type="button" id="btnProductCreateReset" class=" btn btn-default" value="Reset">
                                <a href="admin/products/index"><input type="button" id="btnProductCreateCancel" class="btn bg-gradient-navy"
                                    value="Cancel"></a>
                            </div>
                            <div class="col-12 error">
                            <label></label>
                        </div>
                        </div>
                </div>
                </form>
            </div>
        </div>
</div>
    `;
        return str;
    }

    // Get Products edit From
    getFormEditProduct(array) {
        var str = ``;
        str += `<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">Product</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Products</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="card card-dark">
                <div class="card-header">
                    <h3 class="card-title">Edit product</h3>
                </div>
                <div class="card-body">
                    <form id="productUpdateForm" enctype="multipart/form-data">`;
                    array.forEach(e => {
                        if (e.id === `tag-input`) {
                            str +=`<input type="hidden" id="editTags" name="editTags" value="`+ e.value +`">`;
                        } 
                        if (e.id === `photo`) {
                            str +=`<input type="hidden" id="editPhotos" name="editPhotos" value="`+ e.value +`">`;
                        } 
                    });
                    str +=`
                        <div class="form-group">
                            <div class="row mb-2"><div class="col-sm-12 col-md-4 col-lg-4">`
        array.forEach(e => {
                if (e.id === `productTitle` || e.id === `productAlias`) {
                    str += `<div class="row mb-2">`
                    str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col, e.value);
                    str += `</div>`
                } else if (e.id === `price` || e.id === `discount`) {
                    str += `<div class="row mb-2">`
                    str += this.getInputGourp(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col, e.append, e.value);
                    str += `</div>`
                }
        });
        str += `<div class="row mb-2">`
        array.forEach(e => {
                if (e.id === `stock` || e.id === `sku`) {
                    str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col, e.value);
                }
        });
        str += `</div>
                 </div>
                 <div class="col-sm-12 col-md-4 col-lg-4">
                <div class="row mb-2">`
        array.forEach(e => {
            if (e.tag === `select`) {
                str += this.getSelect(e.data, e.name, e.required, e.disabled, e.id, e.col, e.value);
            }
        });

        str += `</div>`

        array.forEach(e => {
            if (e.tag === `tag`) {
                str += `<div class="row mb-2">`
                str += this.getTag(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col);
                str += `</div>`
            } else if (e.tag === `textarea`) {
                str += `<div class="row mb-2">`
                str += this.getTextArea(e.name, e.id, e.row, e.placeholder, e.required, e.disabled, e.col, e.value);
                str += `</div>`
            }
        });
        str += `</div>
        <div class="col-sm-12 col-md-4 col-lg-4">`
            array.forEach(e => {
                if (e.id === `photo`) {
                    str += `<div class="row mb-2">`
                    str += this.getProductImage(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col, e.multiple, e.accept);
                    str += `</div>`
                }
            });     
            str += `</div>
                            </div>
                            <!-----------------
                                --Long description
                                ------------------>
                            <div class="mb-2">
                                <label for="longDescription">Long description</label>
                                <textarea class="row summernote" name="longDescription" id="longDescription"></textarea>
                            </div>
                            
                            <div class="row mb-2">
                                <!------------------ 
                                --Show hide product
                                ------------------->
                                <div class="col-12">
                                    <div class="btn-group" id="status" data-toggle="buttons">`;
                                    array.forEach(e => {
                                        if (e.id === `showHideProduct`) {
                                            if(e.value == true){
                                                str += `<label class="btn btn-default btn-on-1 btn-sm active">
                                                <input type="radio" id="showProduct" class="radiobutton" value="1"
                                                    name="showHideProduct" checked="checked">SHOW</label>
                                            <label class="btn btn-default btn-off-1 btn-sm ">
                                                <input type="radio" id="hideProduct" class="radiobutton" value="0"
                                                    name="showHideProduct" >HIDE</label>
                                                    </div>
                                            <label id="showHideProductLabel" class="text-success">Product will be
                                            shown</label>`;
                                            }else{
                                                str += `<label class="btn btn-default btn-on-1 btn-sm active">
                                                <input type="radio" id="showProduct" class="radiobutton" value="1"
                                                    name="showHideProduct">SHOW</label>
                                            <label class="btn btn-default btn-off-1 btn-sm ">
                                                <input type="radio" id="hideProduct" class="radiobutton" value="0"
                                                    name="showHideProduct" checked="checked">HIDE</label>
                                                    </div>
                                            <label id="showHideProductLabel" class="text-danger">Product will not be
                                            shown</label>`;
                                            }
                                        }
                                    });     
                                        
                                    str +=`
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-12">
                                <input type="submit" id="btnProductUpdate" class="btn btn-green-basket" value="Update">
                                <input type="button" id="btnProductUpdateReset" class=" btn btn-default" value="Reset">
                                <a href="admin/products/index"><input type="button" id="btnProductUpdateCancel" class="btn bg-gradient-navy"
                                    value="Cancel"></a>
                            </div>
                            <div class="col-12 error">
                            <label></label>
                        </div>
                        </div>
                </div>
                </form>
            </div>
        </div>
</div>
    `;
        return str;
    }
}

module.exports = ProductCore;