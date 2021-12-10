const mongoose = require('mongoose');

// Create Interaction Schema
const SchemaInteract= mongoose.Schema({
    interaction:{
        type:Boolean,
    },
    news_id:{
        type:String,
        require:true
    },
    user_id:{
        type:String,
        require:true
    },
    create_at:{
        type:Date,
        default:Date.now()
    },
    update_at:Date,
});
const InteractModel = mongoose.model('interaction',SchemaInteract);
module.exports = InteractModel
