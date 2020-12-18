const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const PostSchema = Schema({
    post_user : { type : Schema.Types.ObjectId , ref : 'User'},
    post_challenge : { type : Schema.Types.ObjectId , ref:'Challenge' },
    body : { type : String , default:""},
    files :{ type: Object , required: false},
    unique : {type: String},
    credits :[Schema.Types.ObjectId],
    viewCount : { type : Number , default : 0 },
    comments : [{user: Schema.Types.ObjectId, body: String}],
} , { timestamps : true });
PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post' , PostSchema);