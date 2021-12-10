const mongoose= require('mongoose');

//Create Comment Schema
const SchemaComment = mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user_id:{
        type:String,
        require:true
    },
    news_id:{
        type:String,
        require:true
    },
    status:{
        type:Boolean
    },
    create_at:{
        type:Date,
        default:Date.now()
    },
    update_at:Date
});
const CommentModel = mongoose.model('comment',SchemaComment);
module.exports = CommentModel