const express          = require('express');
const app              = express();
const port             = process.env.PORT || 3000; 
const bodyParser       = require('body-parser');
const jwt              = require('jsonwebtoken');

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
