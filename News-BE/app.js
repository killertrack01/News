const express          = require('express');
const app              = express();
const port             = process.env.PORT || 3000; 
const bodyParser       = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Call To GeneralController
app.use('/', require('./controller/general'));

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
