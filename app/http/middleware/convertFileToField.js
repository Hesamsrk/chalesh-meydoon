const middleware = require('./middleware');


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