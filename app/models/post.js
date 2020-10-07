const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    post_user : { type : Schema.Types.ObjectId , ref : 'User'},
    post_challenge : { type : Schema.Types.ObjectId , ref:'Challenge' },
    body : { type : String , required : true },
    images : { type : String , required : true },
    videos : { type : String , required : true },
    documents : { type : String , required : true },
    creditCount :{ type : Number , default : 0 },
    viewCount : { type : Number , default : 0 },
    commentCount : { type : Number , default : 0 },
} , { timestamps : true });


module.exports = mongoose.model('Post' , PostSchema);