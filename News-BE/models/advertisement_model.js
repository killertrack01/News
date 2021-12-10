const mongoose=require('mongoose');

// Create Advertisement Schema
const SchemaAd=mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    url:{
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
    update_at:Date

});
const AdModel = mongoose.model('advertisement',SchemaAd);
module.exports = AdModel