const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = Schema({
    challenge_user : { type : Schema.Types.ObjectId , ref : 'User'},
    challenge_title : { type : String , required : true },
    official : { type : Boolean ,default : false },
    body : { type : String , default:""},
    cover : { type : String , default:"noCover"},
    tags : { type : String , default:""},
    postCount : { type : Number , default : 0 },
    userCount : { type : Number , default : 0 },
    viewCount : { type : Number , default : 0 },
} , { timestamps : true });


module.exports = mongoose.model('Challenge' , challengeSchema);