const express          = require('express');
const app              = express();
const port             = process.env.PORT || 3000; 
const bodyParser       = require('body-parser');                     
const jwt              = require('jsonwebtoken');

/** Open API Connection **/
app.use((req, res, next)=>{
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

// const urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(urlencodedParser());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/** Invokde Database **/
require('./config/database');

/** Set Static Files **/
app.set('view engine', 'ejs');
app.use(express.static('public'));


/** Call To GeneralController **/
app.use('/', require('./controller/general'));


app.listen(port, () => console.log(`listening on http://localhost:${port}`));