const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const challengeSchema = Schema({
    challenge_user : { type : Schema.Types.ObjectId , ref : 'User'},
    challenge_title : { type : String , required : true },
    official : { type : Boolean ,default : false },
    body : { type : String , default:""},
    cover : { type : Object , required : false },
    tags : { type : String , default:""},
    postCount : { type : Number , default : 0 },
    posts:[Schema.Types.ObjectId],
    followers : [Schema.Types.ObjectId],
    viewCount : { type : Number , default : 0 },
} , { timestamps : true });
challengeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Challenge' , challengeSchema);