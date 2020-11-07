const mongoose = require('mongoose');


const userMailvarification = mongoose.Schema({
    email : { type : String , required : true},
    token : { type : String , required : true} ,
    varified : { type : Boolean , default : false }
} , { timestamps : { updatedAt : false } });


module.exports = mongoose.model('userMailvarification' , userMailvarification);