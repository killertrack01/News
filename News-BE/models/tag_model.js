const mongoose = require("mongoose");

//Create Tag Schema
const SchemaTag = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    alias:{
        type:String,
        require:true
    },
    create_at:{
        type:Date,
        default:Date.now()
    },
    update_at:Date,
    trash:{
        type:Boolean
    }
});
const TagModel = mongoose.model('tag',SchemaTag);
module.exports= TagModel