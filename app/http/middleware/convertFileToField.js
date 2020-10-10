const User = require('app/models/user');
const middleware = require('./middleware');
const {getDirImage} = require('app/helpers/uploadImage');

class convertFileToField extends middleware {

    handle(req , res , next) {
        if(! req.file) 
            req.body.cover = undefined;
        else
            req.body.cover = req.file.filename

        next();
    }
}


module.exports = new convertFileToField();