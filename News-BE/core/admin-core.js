class AdminCore {
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
      { name: "Dashboard"     , icon: "tachometer-alt" , link: "dashboard"     },
      { name: "News"          , icon: "newspaper"      , link: "news"          },
      { name: "Categories"    , icon: "list"           , link: "categories"    },
      { name: "News Tags"     , icon: "tags"           , link: "news-tags"     },
      { name: "Advertisement" , icon: "ad"             , link: "advertisement" },
      { name: "Feedback"      , icon: "comment-dots"   , link: "feedback"      },
      { name: "Roles"         , icon: "hand-sparkles"  , link: "roles"         },
      { name: "Users"         , icon: "users"          , link: "users"         }
    ];
    var str = "";
    var active = "";
    arrayMenu.forEach((element) => {
      active = link.indexOf(element.link) === -1 ? "" : "active";
      str +=
        `<li class="nav-item"><a href="admin/` + element.link + `/index" class="nav-link ` + active + `"><i class="nav-icon mr-2 fas fa-` + element.icon + `"></i><p>` + element.name + `</p></a></li>`;
    });
    return str;
  }
  /** Get Dynamic Tittle For Each Content **/
  getTittleModule(key = '') {
    var str = '';
    switch (this.url_module()) {
      case "products": str = 'Products';
        switch (key) {
          case "username": str = 'Product Title';
            break;
        }
      break;
      case "categories": str = 'Categories';
        break;
      case "product-tags": str = 'Product Tags';
        break;
      case "users": str = 'Users';
        break;
      default:  str = 'Dashboard';
        break;
    }
    return str;
  }
  /** Get View Main Content **/
  getViewMainContent(key, array) {
    var str = "";
    switch (this.url_module()) {
      case "products":
        switch (key){
          case "table_data":
            str += this.getProductContent();
            break;
          case "form":
            str += this.getFormProduct(array);
            break;
        }
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

  /**** **** **** **** **** **** ****
   * BUILD DYNAMIC HTML INPUT
   **** **** **** **** **** **** ****/
  // Build HTML Input
  buildHtmlInput(type='text', input_id = '', input_name = '',
           placeholder= '', required = false, disabled = false, value=''){
    // Check required
    var is_required = (required === true) ? 'required = "required"' : '';
    // Check disabled
    var is_disabled = (disabled === true) ? 'disabled = "disabled"' : '';
    return `<input type="` + type +`" class="form-control rounded-0 ` + input_name  + `" name="`+ input_name +`" id="` + input_id + `" 
            placeholder="` + placeholder + `" ` + is_required + ` ` + is_disabled + ` value="`+ value +`">
            <span class="error error_`+ input_name +` invalid-feedback"></span>`;
            
  }
  // Build HTML Select
  buildHtmlSelect(array=[], input_name='', input_id='',
            required= false, disabled= false, id ='') {

    var is_required = (required === true) ? 'required="required"' : ''; // Check Required
    var is_disabled = (disabled === true) ? 'disabled="disabled"' : ''; // Check Disabled
    var str = '';
    var selected = '';

    str += `<option value="">-- Select Option --</option>`;
    array.forEach(e => {
      // Check for when user update record.
      if (id !== ''){ selected =  (e._id == id) ? 'selected' : ''}
      str += `<option value ="`+ e.value +`" `+ selected +`>` + e.name + `</option>`;
    });
    return `<select class="form-control custom-select rounded-0 `+ input_name +`" name="` + input_name +`" id ="`+ input_id +`" 
            `+ is_required +``+ is_disabled +`>` + str + `</select>`;
  }
  // Build HTML Textarea
  buildHtmlTextarea(input_name= '', input_id= '', rows= 3,
              placeholder='', required= false, disabled= false, value='') {
    // Check Required
    var is_required = (required === true) ? 'required="required"' : '';
    // Check Disabled
    var is_disabled = (disabled === true) ? 'disabled="disabled"' : '';
    return `<textarea class="form-control rounded-0 `+ input_name +`" name="`+input_name+`" id="`+ input_id +`"  rows="`+ rows +`" placeholder="`+ placeholder +`"  
            `+ is_required +` `+ is_disabled +`>`+value+`</textarea>`;
  }

  /**** **** **** **** **** **** ****
   * AGGREGATE DYNAMIC INPUT
   **** **** **** **** **** **** ****/
  getInput(type, id, name, placeholder, required, disabled, col, value) {
    var str = '';
    var s_required = (required === true) ? ' <span class="required text-danger">*</span>' : '';
    str += `<div class="col-sm-`+ col +`">`;
    str += `<div class="form-group">`;
    str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
    str +=  this.buildHtmlInput(type, id, name, placeholder, required, disabled, value);
    str += `</div>`;
    str += `</div>`;

    return str;
  };
  // Get Select
  getSelect(data, name, required, disabled, id, col, value){
    var str = '';
    var s_required = (required === true) ? ' <span class="required text-danger">*</span>' : '';
    str += `<div class="col-sm-`+ col +`">`;
    str += `<div class="form-group">`;
    str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
    str += this.buildHtmlSelect(data, name, required, disabled, id, value);
    str += `</div>`;
    str += `</div>`;
    return str;
  }
  // Get Textare
  getTextArea(name, id, rows, placeholder, required, disabled, col, value){
    var str = '';
    var s_required = (required === true) ? ' <span class="required text-danger">*</span>' : '';
    str += `<div class="col-sm-`+ col +`">`;
    str += `<div class="form-group">`;
    str += `<label for="">` + this.getTittleModule(name) + s_required + `</label>`;
    str += this.buildHtmlTextarea(name, id, rows, placeholder, required, disabled, value);
    str += `</div>`;
    str += `</div>`;
    return str;
  }

}
module.exports = AdminCore;
