const mongoose = require('mongoose');

// Create Role Schema
const SchemaRole = mongoose.Schema({
   rolename:{
      type: String,
      require: true,
      unique: true
   },
   action: {
      type: String
   },
   create_at: {
      type: Date,
      default: Date.now()
   },
   updated_at: Date
});

const RoleModel = mongoose.model('roles', SchemaRole);
module.exports  = RoleModel


