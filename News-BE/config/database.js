// Connect MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://killer:123012300@cluster0.fwsyd.mongodb.net/News?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connect Database Successful !'))
.catch(() => console.log('Connect Database Fail !'));