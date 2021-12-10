const Admin = require('./admin-core');

class UserCore extends Admin {

	/** Get Dynamic Tittle For Each Content **/
	getTittleModule = (key = '') => {
		var str = '';
		switch (this.url_module()) {
			case "users": str = 'User';
				switch (key) {
					case "username": str = 'Username';
						break;
					case "password": str = 'Password';
						break;
					case "re_password": str = 'Re-enter Password';
						break;
					case "email": str = 'Email';
						break;
					case "phone": str = 'Phone Number';
						break;
					case "address": str = 'Address';
						break;
					case "role": str = 'Role';
						break;
					case "note": str = 'Note';
						break;
				}
				break;
			default: str = 'Dashboard';
				break;
		}
		return str;
	};
	/** Get View Main Content **/
	getViewMainContent = (key, array, pagination, count) => {
		var str = "";
		switch (this.url_module()) {
			case "users":
				switch (key) {
					case "table_data":
						str += this.getUserContent(array, pagination, count);
						break;
					case "form":
						str += this.getFormUser(array);
						break;
					case "edit-form":
						str += this.getFormEditUser(array);
						break;
					case "profile":
						str += this.getProfileUser();
						break;
				}
				break;
			default:
				str += this.getDashboard();
				break;
		}
		return str;
	};
	// Get User Content
	getUserContent = (array = [], pagination = '', count) => {
		var str = '';
		str += `<!-- /.row -->
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
              <div class="container-fluid">
              <div class="row">
                <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                  <div class="card bg-light d-flex flex-fill">
                    <div class="card-header text-muted border-bottom-0">
                      Adminstration
                    </div>
                    <div class="card-body pt-0">
                      <div class="row pt-2">
                        <div class="col-7">
                          <h2 class="lead"><b>Uzumaki Naruto</b></h2>
                          <p class="text-muted text-sm"><b>About: </b> Shop Owner</p>
                          <ul class="ml-4 mb-0 fa-ul text-muted">
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Address: Demo Street 123, Demo City 04312, NJ</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone #: + 800 - 12 12 23 52</li>
                          </ul>
                        </div>
                        <div class="col-5 text-center">
                          <img src="./img/user2-160x160.jpg" alt="user-avatar" class="img-circle img-fluid">
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <div class="text-right">
                        <a href="#" class="btn btn-sm bg-teal">
                          <i class="fas fa-comments"></i>
                        </a>
                        <a href="#" class="btn btn-sm btn-primary">
                          <i class="fas fa-user"></i> View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.row -->
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">` + this.getTittleModule() + ` 
                      <button type="button" class="btn btn-green-basket btn-sm ml-2"><a class="text-light" href="admin/`+ this.url_module() + `/add"><i class="fa fa-plus-square mr-1"></i> Add more data</a></button>
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
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email/Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>`;
                            array.forEach(e => {
                              // Check checked status
                              var checked = (e.status === true) ? 'checked' : '';
                              str += `<tr id="delete_` + e._id + `">
                              <td>`+ ++count + `</td>
                              <td><img alt="Avatar" class="table-avatar" src="/img/user2-160x160.jpg" width="40"></td>
                              <td>`+ e.username + ` <br/> <small class="text-olive">` + e.role + ` </small></td>
                              <td>`+ e.email + ` <br/> <small class="text-olive"><i class="fa fa-phone-alt text-black mr-1"></i> ` + e.phone + ` </small></td>
                              <td>`+ e.address + `</td>
                              <td>
                                  <div class="form-group">
                                      <div class="custom-control custom-switch">
                                          <input type="checkbox" class="custom-control-input" id="checkbox_`+ e._id + `" onclick="checkStatus('` + e._id + `')" ` + checked + `>
                                              <label class="custom-control-label" for="checkbox_`+ e._id + `">Hide/Show</label>
                                      </div>
                                  </div>
                              </td>
                              <td>
                                  <a href="admin/`+ this.url_module() + `/edit/` + e._id + `"><button type="button" class="btn btn-default btn-sm"><i class="fas fa-edit"></i></button></a>
                                  <button type="button" class="btn btn-default btn-sm"><i class="fas fa-eye"></i></button>
                                  <button type="button" class="btn btn-default btn-sm" onclick="deleteUser('`+ e._id + `')"  data-toggle="modal" data-target="#modal-sm"><i class="fas fa-trash"></i></button>
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
                        `+ pagination + `
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
    </div>`;
		return str;
	};
	// Get User From
	getFormUser = array => {
		var str = '';
		str += `<!-- /.row -->
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
              <div class="container-fluid">
              <!-- /.row -->
              <div class="row justify-content-center">
                <div class="col-5">
                 <div class="card card-primary">
                    <div class="card-header">
                      <h3 class="card-title">`+ this.url_module() + `</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form id="userform"><div class="card-body">`;
									  str += `<div class="row">`;
                      array.forEach(e => {
                        if (e.tag === 'select') {
                          str += this.getSelect(e.data, e.name, e.id, e.required, e.disabled, e.col);
                        } else if (e.tag === 'textarea') {
                          str += this.getTextArea(e.name, e.id, e.rows, e.placeholder, e.required, e.disabled, e.col, e.value);
                        } else {
                          str += this.getInput(e.type, e.id, e.name, e.placeholder, e.required, e.disabled, e.col, e.value);
                        }
                      });
                      str += `</div>`;
                      str += `<!-- card-body --></div><div class="card-footer">
                    <button type="submit" class="btn btn-green-basket btn-sm"> <i class="fa fa-save mr-1"></i>Create</button>
                    <button type="reset" class="btn btn-default btn-sm"> <i class="fas fa-ban mr-1"></i>Reset</button>
                    <button type="button" class="btn btn-default btn-sm"><a class="text-dark" href="admin/`+ this.url_module() + `/index"> 
                    <i class="far fa-arrow-alt-circle-left mr-1"></i> Cancle</a></button>
                    </div>
                    </form>
                 </div>
                </div>
                <div class="col-4">
                    <!-- Default box -->
                      <div class="card">
                        <div class="card-header">
                          <h3 class="card-title">Guide for user</h3>
                
                          <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                              <i class="fas fa-minus"></i>
                            </button>
                          </div>
                        </div>
                        <div class="card-body">
                          <p><b>Symbol:</b> <span class="required text-danger">(*)</span>  Must be enter, User cannot leave the blank fields.. !</p>
                          <p><b>Password:</b></p>
                           <ul>
                                <li>A password should be alphanumeric.</li>
                                <li>First letter of the password should be capital.</li>
                                <li>Password must contain a special character (@, $, !, &, etc).</li>
                                <li>Password length must be greater than 8 characters.</li>
                                <li>One of the most important that the password fields should not be empty.</li>
                           </ul>
                           <p><b>Email:</b> Must be enter with format (Ex: admin@gmai.com | hotmail.com | etc.)</p>
                           <p><b>Phone Number:</b> Must be enter with format 0909 099 9871</p>
                           <p><b>Role:</b> Must be select at least one of them</p>
                        </div>
                      </div>
                      <!-- /.card -->
                </div>
              </div>
              <!-- /.row -->
          </div>
        </div>
    </div>`;
		return str;
	};
	// Get User From
	getFormEditUser = array => {
		var str = '';
		str += `<!-- /.row -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
            <!-- /.row -->
            <div class="row justify-content-center">
              <div class="col-5">
               <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">`+ this.url_module() + `</h3>
                  </div>
                  <!-- /.card-header -->
                  <!-- form start -->
                  <form id="userform"><div class="card-body">`;
                    str += `<div class="row">`;
                      array.forEach(e => {
                        if (e.tag == 'select') {
                          str += this.getSelect(e.data, e.name, e.id, e.required, e.disabled, e.col);
                        } else if (e.tag == 'textarea') {
                          str += this.getTextArea(e.name, e.id, e.rows, e.placeholder, e.required, e.disabled, e.col, e.value);
                        } else {
                          str += this.getInput(e.type, e.name, e.id, e.placeholder, e.required, e.disabled, e.col, e.value);
                        }
                      });
                      str += `</div>`;
                      str += `<!-- card-body --></div><div class="card-footer">
								<button type="submit" class="btn btn-green-basket btn-sm"> <i class="fa fa-save mr-1"></i>Create</button>
								<button type="reset" class="btn btn-default btn-sm"> <i class="fas fa-ban mr-1"></i>Reset</button>
								<button type="button" class="btn btn-default btn-sm"><a class="text-dark" href="admin/`+ this.url_module() + `/index"> 
								<i class="far fa-arrow-alt-circle-left mr-1"></i> Cancle</a></button>
                  	</div>
                  </form>
               </div>
              </div>
              <div class="col-4">
                  <!-- Default box -->
                    <div class="card">
                      <div class="card-header">
                        <h3 class="card-title">Guide for user</h3>
              
                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                      </div>
                      <div class="card-body">
                        <p><b>Symbol:</b> <span class="required text-danger">(*)</span>  Must be enter, User cannot leave the blank fields.. !</p>
                        <p><b>Password:</b></p>
                         <ul>
                              <li>A password should be alphanumeric.</li>
                              <li>First letter of the password should be capital.</li>
                              <li>Password must contain a special character (@, $, !, &, etc).</li>
                              <li>Password length must be greater than 8 characters.</li>
                              <li>One of the most important that the password fields should not be empty.</li>
                         </ul>
                         <p><b>Email:</b> Must be enter with format (Ex: admin@gmai.com | hotmail.com | etc.)</p>
                         <p><b>Phone Number:</b> Must be enter with format 0909 099 9871</p>
                         <p><b>Role:</b> Must be select at least one of them</p>
                      </div>
                    </div>
                    <!-- /.card -->
              </div>
            </div>
            <!-- /.row -->
        </div>
      </div>
  </div>`;
		return str;
	};
	// Get User Profile
	getProfileUser = () => {
		var str = '';
		str += `<!-- /.row -->
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
              <div class="container-fluid">
                   <div class="row">
                      <div class="col-md-3">
            
                        <!-- Profile Image -->
                        <div class="card card-primary card-outline">
                          <div class="card-body box-profile">
                            <div class="text-center">
                              <img class="profile-user-img img-fluid img-circle"
                                   src="/img/user2-160x160.jpg"
                                   alt="User profile picture">
                            </div>
            
                            <h3 class="profile-username text-center">Uzumaki Naruto</h3>
            
                            <p class="text-muted text-center">User</p>
            
                            <ul class="list-group list-group-unbordered mb-3">
                              <li class="list-group-item">
                                <b>Purchased</b> <a class="float-right">30</a>
                              </li>
                              <li class="list-group-item">
                                <b>Cancel Orders</b> <a class="float-right">3</a>
                              </li>
                              <li class="list-group-item">
                                <b>Oders Delivering</b> <a class="float-right">5</a>
                              </li>
                            </ul>
                          </div>
                          <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
            
                        <!-- About Me Box -->
                        <div class="card card-primary">
                          <div class="card-header">
                            <h3 class="card-title">About Me</h3>
                          </div>
                          <!-- /.card-header -->
                          <div class="card-body">
                            <strong><i class="fas fa-envelope-open-text mr-1"></i> Email</strong>
                            <p class="text-muted">
                             admin@gmail.com
                            </p>
                            <hr>
                            <strong><i class="fas fa-map-marker-alt mr-1"></i> Phone</strong>
                            <p class="text-muted">0908 099 789</p>
                            <hr>
                            <strong><i class="fas fa-map-marker-alt mr-1"></i> Address</strong>
                            <p class="text-muted">400 Cach Mang Thang 8, District 3, Ward 6, TPHCM</p>
                            <hr>
                            <strong><i class="far fa-file-alt mr-1"></i> Notes</strong>
                            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                          </div>
                          <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                      </div>
                      <!-- /.col -->
                      <div class="col-md-9">
                        <div class="card">
                          <div class="card-header p-2">
                            <ul class="nav nav-pills">
                              <li class="nav-item"><a class="nav-link active" href="#orders" data-toggle="tab">Orders</a></li>
                              <li class="nav-item"><a class="nav-link" href="#personal" data-toggle="tab">Personal</a></li>
                            </ul>
                          </div><!-- /.card-header -->
                          <div class="card-body">
                            <div class="tab-content">
                              <div class="active tab-pane" id="orders">
                                <!-- Post -->
                                <div class="post">
                                  <div class="user-block">
                                    <img class="img-circle img-bordered-sm" src="/img/user2-160x160.jpg" alt="user image">
                                    <span class="username">
                                      <a href="#">Jonathan Burke Jr.</a>
                                      <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                    </span>
                                    <span class="description">Shared publicly - 7:30 PM today</span>
                                  </div>
                                  <!-- /.user-block -->
                                  <p>
                                    Lorem ipsum represents a long-held tradition for designers,
                                    typographers and the like. Some people hate it and argue for
                                    its demise, but others ignore the hate as they create awesome
                                    tools to help create filler text for everyone from bacon lovers
                                    to Charlie Sheen fans.
                                  </p>
            
                                  <p>
                                    <a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
                                    <a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</a>
                                    <span class="float-right">
                                      <a href="#" class="link-black text-sm">
                                        <i class="far fa-comments mr-1"></i> Comments (5)
                                      </a>
                                    </span>
                                  </p>
            
                                  <input class="form-control form-control-sm" type="text" placeholder="Type a comment">
                                </div>
                                <!-- /.post -->
            
                                <!-- Post -->
                                <div class="post clearfix">
                                  <div class="user-block">
                                    <img class="img-circle img-bordered-sm" src="/img/user2-160x160.jpg" alt="User Image">
                                    <span class="username">
                                      <a href="#">Sarah Ross</a>
                                      <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                    </span>
                                    <span class="description">Sent you a message - 3 days ago</span>
                                  </div>
                                  <!-- /.user-block -->
                                  <p>
                                    Lorem ipsum represents a long-held tradition for designers,
                                    typographers and the like. Some people hate it and argue for
                                    its demise, but others ignore the hate as they create awesome
                                    tools to help create filler text for everyone from bacon lovers
                                    to Charlie Sheen fans.
                                  </p>
            
                                  <form class="form-horizontal">
                                    <div class="input-group input-group-sm mb-0">
                                      <input class="form-control form-control-sm" placeholder="Response">
                                      <div class="input-group-append">
                                        <button type="submit" class="btn btn-danger">Send</button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <!-- /.post -->
            
                                <!-- Post -->
                                <div class="post">
                                  <div class="user-block">
                                    <img class="img-circle img-bordered-sm" src="/img/user2-160x160.jpg" alt="User Image">
                                    <span class="username">
                                      <a href="#">Adam Jones</a>
                                      <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                    </span>
                                    <span class="description">Posted 5 photos - 5 days ago</span>
                                  </div>
                                  
            
                                  <p>
                                    <a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
                                    <a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</a>
                                    <span class="float-right">
                                      <a href="#" class="link-black text-sm">
                                        <i class="far fa-comments mr-1"></i> Comments (5)
                                      </a>
                                    </span>
                                  </p>
            
                                  <input class="form-control form-control-sm" type="text" placeholder="Type a comment">
                                </div>
                                <!-- /.post -->
                              </div>
                              <div class="tab-pane" id="personal">
                                <form class="form-horizontal">
                                  <div class="form-group row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-10">
                                      <input type="email" class="form-control" id="inputName" placeholder="Name">
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-10">
                                      <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <label for="inputName2" class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-10">
                                      <input type="text" class="form-control" id="inputName2" placeholder="Name">
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <label for="inputExperience" class="col-sm-2 col-form-label">Experience</label>
                                    <div class="col-sm-10">
                                      <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <label for="inputSkills" class="col-sm-2 col-form-label">Skills</label>
                                    <div class="col-sm-10">
                                      <input type="text" class="form-control" id="inputSkills" placeholder="Skills">
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <div class="offset-sm-2 col-sm-10">
                                      <div class="checkbox">
                                        <label>
                                          <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <div class="offset-sm-2 col-sm-10">
                                      <button type="submit" class="btn btn-danger">Submit</button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <!-- /.tab-pane -->
                            </div>
                            <!-- /.tab-content -->
                          </div><!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                      </div>
                      <!-- /.col -->
                    </div>
              </div>
          </div>
        </div>`;
		return str;
	}
}

module.exports = UserCore