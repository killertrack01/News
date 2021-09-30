class Admin {
	constructor(url = "") {
		this.url = url;
	}
	/** Get Dynamic Url **/
	url_module() {
		return this.url.split("/")[2]; // /admin/dashboard/index => split => [,admin,dashboard,index]
	}
	/** Get Dynamic Path **/
	getPath() {
		return "partials/main";
	}
	/** Dynamic Sidebar Module **/
	sidebar_module(link) {
		var arrayMenu = [
			{ name: "Dashboard"   , icon: "tachometer-alt", link: "dashboard" },
			{ name: "Products"    , icon: "carrot", link: "products" },
			{ name: "Categories"  , icon: "list", link: "categories" },
			{ name: "Product Tags", icon: "tags", link: "product-tags" },
			{ name: "Supplier"    , icon: "dolly", link: "suppliers" },
			{ name: "Gallery"     , icon: "photo-video", link: "gallery" },
			{ name: "Sales" 	  , icon: "shipping-fast", link: "sales"},
			{ name: "Invoices" 	  , icon: "receipt", link: "invoices"},
			{ name: "Users"       , icon: "users", link: "users" }
		];
		var str = "";
		var active = "";
		arrayMenu.forEach((element) => {
			active = link.indexOf(element.link) === -1 ? "" : "active";
			str +=
				`<li class="nav-item"><a href="admin/` + element.link +`/index" class="nav-link `+ active+`"><i class="nav-icon fas fa-` + element.icon +`"></i><p>` + element.name +`</p></a></li>`;
		});
		return str;
	}
    /** Get Dynamic Tittle For Each Content **/
    getTittleModule(){
        var str = '';
        switch (this.url_module()) {
            case "products":
				str = 'Products';
				break;
			case "categories":
				str = 'Categories';
				break;
			case "product-tags":
				str = 'Product Tags';
				break;
			case "users":
				str = 'Users';
				break;
			default:
				str = 'Dashboard';
				break;
        }
        return str;
    }
    /** Get View Main Content **/
	getViewMainContent() {
		var str = "";
		switch (this.url_module()) {
			case "products":
				str += this.getProductContent();
				break;
			case "categories":
				str += this.getCategoriesContent();
				break;
			case "product-tags":
				str += this.getProductTagContent();
				break;
			case "users":
				str += this.getUsersContent();
				break;
			default:
				str += this.getDashboard();
				break;
		}
		return str;
	}
	/** Get Dashboard Content **/
	getDashboard() {
		return `<!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
              <div class="container-fluid">
                  <div class="row mb-2">
                      <div class="col-sm-6">
                          <h1 class="m-0 text-dark">Dashboard</h1>
                      </div><!-- /.col -->
                      <div class="col-sm-6">
                          <ol class="breadcrumb float-sm-right">
                              <li class="breadcrumb-item"><a href="#">Home</a></li>
                              <li class="breadcrumb-item active">Dashboard v1</li>
                          </ol>
                      </div><!-- /.col -->
                  </div><!-- /.row -->
              </div><!-- /.container-fluid -->
          </div>
          <!-- /.content-header -->
      
          <!-- Main content -->
          <section class="content">
              <div class="container-fluid">
                  <!-- Small boxes (Stat box) -->
                  <div class="row">
                      <div class="col-lg-3 col-6">
                          <!-- small box -->
                          <div class="small-box bg-gradient-info">
                              <div class="inner">
                                  <h3>150</h3>
      
                                  <p>New Orders</p>
                              </div>
                              <div class="icon">
                                  <i class="ion ion-bag"></i>
                              </div>
                              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                          </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                          <!-- small box -->
                          <div class="small-box bg-success">
                              <div class="inner">
                                  <h3>53<sup style="font-size: 20px">%</sup></h3>
      
                                  <p>Bounce Rate</p>
                              </div>
                              <div class="icon">
                                  <i class="ion ion-stats-bars"></i>
                              </div>
                              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                          </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                          <!-- small box -->
                          <div class="small-box bg-gradient-warning">
                              <div class="inner">
                                  <h3>44</h3>
      
                                  <p>User Registrations</p>
                              </div>
                              <div class="icon">
                                  <i class="ion ion-person-add"></i>
                              </div>
                              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                          </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                          <!-- small box -->
                          <div class="small-box bg-gradient-danger">
                              <div class="inner">
                                  <h3>65</h3>
      
                                  <p>Unique Visitors</p>
                              </div>
                              <div class="icon">
                                  <i class="ion ion-pie-graph"></i>
                              </div>
                              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                          </div>
                      </div>
                      <!-- ./col -->
                  </div>
                  <!-- /.row -->
                  <div class="row">
                      <div class="col-lg-6 col-6">
                          <!-- PIE CHART -->
                          <div class="card card-danger">
                              <div class="card-header">
                                  <h3 class="card-title">Pie Chart</h3>
      
                                  <div class="card-tools">
                                      <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                          <i class="fas fa-minus"></i>
                                      </button>
                                      <button type="button" class="btn btn-tool" data-card-widget="remove">
                                          <i class="fas fa-times"></i>
                                      </button>
                                  </div>
                              </div>
                              <div class="card-body">
                                  <canvas id="pieChart"
                                          style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                              </div>
                              <!-- /.card-body -->
                          </div>
                          <!-- /.card -->
                      </div>
                      <div class="col-lg-6 col-6">
                          <!-- BAR CHART -->
                          <div class="card card-success">
                              <div class="card-header">
                                  <h3 class="card-title">Bar Chart</h3>
      
                                  <div class="card-tools">
                                      <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                          <i class="fas fa-minus"></i>
                                      </button>
                                      <button type="button" class="btn btn-tool" data-card-widget="remove">
                                          <i class="fas fa-times"></i>
                                      </button>
                                  </div>
                              </div>
                              <div class="card-body">
                                  <div class="chart">
                                      <canvas id="barChart"
                                              style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                                  </div>
                              </div>
                              <!-- /.card-body -->
                          </div>
                          <!-- /.card -->
                      </div>
                  </div>
              </div><!-- /.container-fluid -->
          </section>
          <!-- /.content -->
      </div>
      `;
	}
	/** Get Products Content **/
	getProductContent() {
		return `<!-- /.row -->
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
                      <button type="button" class="btn btn-green-basket btn-sm ml-2"><i class="fa fa-plus-square mr-1"></i> Add more data</button>
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
                            <th>Image</th>
                            <th>SKU</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Image</td>
                            <td>CC-111</td>
                            <td>Ca Chua Da Lat</td>
                            <td>30.000 Vnd</td>
                            <td>100</td>
                            <td>Rau Cai</td>
                            <td><div class="form-group">
									<div class="custom-control custom-switch">
									  <input type="checkbox" class="custom-control-input" id="customSwitch1">
									  <label class="custom-control-label" for="customSwitch1">Show/Hide</label>
									</div>
								 </div>
                  			</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm"  data-toggle="modal" data-target="#modal-sm">
                                    <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Image</td>
                            <td>CC-111</td>
                            <td>Ca Chua Da Lat</td>
                            <td>30.000 Vnd</td>
                            <td>100</td>
                            <td>Rau Cai</td>
                            <td><div class="form-group">
									<div class="custom-control custom-switch">
									  <input type="checkbox" class="custom-control-input" id="customSwitch2">
									  <label class="custom-control-label" for="customSwitch2">Show/Hide</label>
									</div>
								 </div>
                  			</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm"  data-toggle="modal" data-target="#modal-sm">
                                    <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer clearfix">
                        <ul class="pagination pagination-sm m-0 float-left">
                        <li class="page-item"><a class="page-link text-dark" href="#">«</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">1</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">2</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">3</a></li>
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
    </div>
    <!-- /.row -->`;
	}
    /** Get Categories Content **/
    getCategoriesContent(){
		return `<!-- /.row -->
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
                      <button type="button" class="btn btn-green-basket btn-sm ml-2"><i class="fa fa-plus-square mr-1"></i> Add more data</button>
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
                            <th>Image</th>
                            <th>SKU</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Image</td>
                            <td>CC-111</td>
                            <td>Ca Chua Da Lat</td>
                            <td>30.000 Vnd</td>
                            <td>100</td>
                            <td>Rau Cai</td>
                            <td><div class="form-group">
									<div class="custom-control custom-switch">
									  <input type="checkbox" class="custom-control-input" id="customSwitch1">
									  <label class="custom-control-label" for="customSwitch1">Show/Hide</label>
									</div>
								 </div>
                  			</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm"  data-toggle="modal" data-target="#modal-sm">
                                    <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Image</td>
                            <td>CC-111</td>
                            <td>Ca Chua Da Lat</td>
                            <td>30.000 Vnd</td>
                            <td>100</td>
                            <td>Rau Cai</td>
                            <td><div class="form-group">
									<div class="custom-control custom-switch">
									  <input type="checkbox" class="custom-control-input" id="customSwitch2">
									  <label class="custom-control-label" for="customSwitch2">Show/Hide</label>
									</div>
								 </div>
                  			</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm"  data-toggle="modal" data-target="#modal-sm">
                                    <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer clearfix">
                        <ul class="pagination pagination-sm m-0 float-left">
                        <li class="page-item"><a class="page-link text-dark" href="#">«</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">1</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">2</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">3</a></li>
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
    </div>
    <!-- /.row -->`;
    }
	/** Get Product Tags Content **/
	getProductTagContent(){
		return `<!-- /.row -->
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
                      <button type="button" class="btn btn-green-basket btn-sm ml-2"><i class="fa fa-plus-square mr-1"></i> Add more data</button>
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
                            <th>Image</th>
                            <th>SKU</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Image</td>
                            <td>CC-111</td>
                            <td>Ca Chua Da Lat</td>
                            <td>30.000 Vnd</td>
                            <td>100</td>
                            <td>Rau Cai</td>
                            <td><div class="form-group">
									<div class="custom-control custom-switch">
									  <input type="checkbox" class="custom-control-input" id="customSwitch1">
									  <label class="custom-control-label" for="customSwitch1">Show/Hide</label>
									</div>
								 </div>
                  			</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm"  data-toggle="modal" data-target="#modal-sm">
                                    <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Image</td>
                            <td>CC-111</td>
                            <td>Ca Chua Da Lat</td>
                            <td>30.000 Vnd</td>
                            <td>100</td>
                            <td>Rau Cai</td>
                            <td><div class="form-group">
									<div class="custom-control custom-switch">
									  <input type="checkbox" class="custom-control-input" id="customSwitch2">
									  <label class="custom-control-label" for="customSwitch2">Show/Hide</label>
									</div>
								 </div>
                  			</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm">
                                    <i class="fas fa-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-default btn-sm"  data-toggle="modal" data-target="#modal-sm">
                                    <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer clearfix">
                        <ul class="pagination pagination-sm m-0 float-left">
                        <li class="page-item"><a class="page-link text-dark" href="#">«</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">1</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">2</a></li>
                        <li class="page-item"><a class="page-link text-dark" href="#">3</a></li>
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
    </div>
    <!-- /.row -->`;
	}
}
module.exports = Admin;
