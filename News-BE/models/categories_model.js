const mongoose= require('mongoose');


// Create Categories Schema
const SchemaCate = mongoose.Schema({
    category_name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    alias: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: Date,
    trash: {
        type: Boolean,
        default: false
    },
});
const CateModel = mongoose.model('categories',SchemaCate);
module.exports  = CateModel