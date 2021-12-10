const Admin = require("./admin-core");
class CategoryCore extends Admin {

    // ** Get title module **//
    getTittleModule(key = '') {
        var str = '';
        switch (this.url_module()) {
            case "categories":
                str = 'Categories';
                switch (key) {
                    case "category_title":
                        str = 'Category Name';
                        break;
                    case "parent_category":
                        str = 'Parent category name';
                        break;
                    case "alias":
                        str = 'Alias';
                        break;
                    case "description":
                        str = 'Description';
                        break;
                }
                break;
            default:
                str = 'Dashboard';
                break;
        }
        return str;
    }

    //** Get view main content **//
    getViewMainContent(tableData, arrForm, arrFormEdit, pagination) {
        return this.getCategoriesContent(tableData, arrForm, arrFormEdit, pagination);
    }

    //** Get Category content **//
    getCategoriesContent(tableData, arrForm, arrFormEdit, pagination) {
        var str = '';
        str += `<!-- /.row -->
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
              <div class="container-fluid">
              <!-- /.row -->
              <div class="row"> 
                <div class="col-4">
                <!-- Card for category form -->
                    <div class="card">
                    <div class="card-header">Create Category</div>
                        <div class="card-body">`;
        // -- Form create category 
        str += '<form id="addCate">';

        arrForm.forEach(e => {
            if (e.tag === 'textarea') {
                str += this.getTextArea(e.name, e.id, e.rows, e.placeholder, e.required, e.disabled, e.col);
            } else if(e.tag === 'input'){
                str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col);
            }else{
                str+='';
            }
        })
        str += `<div class="col-10">
                        <button type="submit" class="btn btn-green-basket btn-md"> <i class="fa fa-save mr-1"></i>
                            Create</button>
                            <button type="reset" class="btn btn-default btn-md"> <i class="fas fa-ban mr-1"></i>
                            Reset</button>
                        </div>`;
        str += `</form>
            </div>
                    </div>
              <!-- ./Card for category form -->
                    </div>
                <!-- ./col-3 -->
                <div class="col-8">`
                // --Table category 
        str += `<div class="card">
            <div class="card-header">
              <h3 class="card-title">` + this.getTittleModule() + `
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
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                `;
                
        tableData.forEach(e => {
            str += `
                <tr id="delete_` + e._id + `">

                  <td>`+ e.category_name +`</td>
                  <td>` + e.description + `</td>
                  <td>
                    <div class="btn-group">
                      <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal-edit" onclick="getCate('` + e._id + `')">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal-sm" onclick="deleteCate('` + e._id + `')">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>`
        })
        str += `
              </table>
            </div>
            <!-- /.card-body -->
            <div class="card-footer clearfix">
                <ul class="pagination pagination-sm m-0 float-left">
                <li class="page-item"><a class="page-link text-dark" href="#">«</a></li>
                ` + pagination + `
                <li class="page-item"><a class="page-link text-dark" href="#">»</a></li>
                </ul>
            </div>
          </div>
          </div>
                <!-- ./col-9 -->
              </div>
              <!-- /.row -->
            </div>
        </div>
    </div>
    <!-- /.row -->`;


        // --Modal pop-up form edit category
        str += `
    <div class="modal fade" id="modal-edit">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="editCate">
            <div class="modal-body">
                <input type="hidden" id="id_edit">`

        arrFormEdit.forEach(e => {
            if (e.tag === 'textarea') {
                str += this.getTextArea(e.name, e.id, e.rows, e.placeholder, e.required, e.disabled, e.col);
            } else if(e.tag === 'input'){
                str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col);
            }else{
                str+= '';
            }
        })
        str += `
           </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="submit"  class="btn bg-gradient-danger" >Update category</button>
            </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
    `

        return str;
    }

}
module.exports = CategoryCore;