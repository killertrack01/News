const mongoose = require('mongoose');

// Create Feedback Schema
const SchemaFeedback = mongoose.Schema({
    user_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true
    },
    create_at:{
        type:Date,
        default:Date.now()
    }
    
});
const FeedbackModel = mongoose.model('feedback',SchemaFeedback);
module.exports = FeedbackModel