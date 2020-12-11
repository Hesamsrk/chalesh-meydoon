const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    post_user : { type : Schema.Types.ObjectId , ref : 'User'},
    post_challenge : { type : Schema.Types.ObjectId , ref:'Challenge' },
    body : { type : String , default:""},
    images :[String] ,
    videos : [String],
    sounds : [String],
    credits :[Schema.Types.ObjectId],
    viewCount : { type : Number , default : 0 },
    comments : [{user: Schema.Types.ObjectId, body: String}],
} , { timestamps : true });


module.exports = mongoose.model('Post' , PostSchema);