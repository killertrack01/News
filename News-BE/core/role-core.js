const Admin = require('./admin-core');

class RoleCore extends Admin {

   /** Get Dynamic Tittle For Each Content **/
   getTittleModule = (key = '') => {
      var str = '';
      switch (this.url_module()) {
         case "roles":
            str = 'Role';
            switch (key) {
               case "roletitle":
                  str = 'Role Title';
                  break;
               case "roledescription":
                  str = 'Description';
                  break;
            }
            break;
         default:
            str = 'Dashboard';
            break;
      }
      return str;
   };
   /** Get View Main Content **/
   getViewMainContent = (key, array, pagination, count, arrayForm, arrayFormEdit) => {
      var str = "";
      switch (this.url_module()) {
         case "roles":
            switch (key) {
               case "table_data":
                  str += this.getRoleContent(array, pagination, count, arrayForm, arrayFormEdit);
                  break;
            }
            break;
         default:
            str += this.getDashboard();
            break;
      }
      return str;
   };
   // Get Role Content
   getRoleContent = (array = [], pagination = '', count, arrayForm = [], arrayFormEdit = []) => {
      var str = '';
      str += `<!-- /.row -->
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
              <div class="container-fluid">
              <!-- /.row -->
              <div class="row">
              	<div class="col-4">
              		<div class="card card-primary">
                    <div class="card-header">
                      <h3 class="card-title">` + this.url_module() + `</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form id="roleform"><div class="card-body">`;
                        str += `<div class="row">`;
                        arrayForm.forEach(e => {
                           if (e.tag === 'select') {
                              str += this.getSelect(e.data, e.name, e.id, e.required, e.disabled, e.col);
                           } else if (e.tag === 'textarea') {
                              str += this.getTextArea(e.name, e.id, e.rows, e.placeholder, e.required, e.disabled, e.col, e.value);
                           } else {
                              str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col, e.value);
                           }
                        });
                        str += `</div>`;
                        str += `<!-- card-body --></div>
                        <div class="card-footer">
                                <button type="submit" class="btn btn-green-basket btn-sm"> <i class="fa fa-save mr-1"></i>Create</button>
                                <button type="reset" class="btn btn-default btn-sm"> <i class="fas fa-ban mr-1"></i>Reset</button>
                              </div>
                              </form>
                          </div>
                    </div>
                    <div class="col-8">
                      <div class="card">
                        <div class="card-header">
                          <h3 class="card-title">` + this.getTittleModule() + ` 
                          <button type="button" class="btn bg-gradient-navy btn-sm ml-2"><i class="far fa-file-excel mr-1"></i> Export Excel</button>
                          </h3>
                            <div class="card-tools">
                              <form action"" method="GET">
                                <div class="input-group input-group-sm" style="width: 350px; margin-top: 2px;"> 
                                <input type="text" name="search" class="form-control float-right" placeholder="Search">
                                <div class="input-group-append">
                                  <button type="submit" class="btn bg-gradient-navy">
                                    <i class="fas fa-search text-light"></i>
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body table-responsive p-0">
                          <table class="table table-striped text-nowrap">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Role Title</th>
                                <th>Description</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>`;
                              array.forEach(e => {
                                 str += `<tr id="delete_` + e._id + `">
                                    <td>` + ++count + `</td>
                                    <td>` + e.roletitle +`</td>
                                    <td>` + e.role_description +`</td>
                                    <td>
                                        <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal-role-edit" onclick="getDataEdit('` + e._id + `')"><i class="fas fa-edit"></i></button>
                                        <button type="button" class="btn btn-default btn-sm" onclick="deleteRole('`+ e._id + `')"  data-toggle="modal" data-target="#modal-sm"><i class="fas fa-trash"></i></button>
                                    </td>
                                    </tr>`;
                              });
                              str += `</tbody>
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
                  <!-- /.card -->
                </div>
              </div>
              <!-- /.row -->
            </div>
        </div>
    </div>`
    str += `
    <div class="modal fade" id="modal-role-edit">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <input type="hidden" id="id-role-edit">`;
            str += `<form id="editRoleForm">`;
            arrayFormEdit.forEach(e => {
               if (e.tag === 'select') {
                   str += this.getSelect(e.data, e.name, e.id, e.required, e.disabled, e.col);
               } else if (e.tag === 'textarea') {
                   str += this.getTextArea(e.name, e.id, e.rows, e.placeholder, e.required, e.disabled, e.col);
               } else {
                   str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col);
               }
           })
            str += `</form>
            </div>
             <div class="modal-footer justify-content-between">
                 <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                 <button type="button" onclick="editRole()" class="btn bg-gradient-danger" data-dismiss="modal">Update category</button>
             </div>
         </div>
         <!-- /.modal-content -->
     </div>
     <!-- /.modal-dialog -->
 </div>`
      return str;
   };
}

module.exports = RoleCore
