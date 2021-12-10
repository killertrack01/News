const mongoose = require('mongoose');

//Create News Schema
const SchemaNews = mongoose.Schema({
    article_title:{
        type:String,
        require:true
    },
    alias:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    content:{
        type:String,
        require:true
    },
    view:{
        type:Number
    },
    image:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        require:true
    },
    status:{
        type:Number,
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
const NewsModel = mongoose.model('news',SchemaNews);
module.exports = NewsModel