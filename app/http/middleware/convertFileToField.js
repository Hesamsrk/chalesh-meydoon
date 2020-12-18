const middleware = require('./middleware');


class convertFileToField extends middleware {

    handleCover(req , res , next) {
        if(! req.file) 
            req.body.cover = undefined;
        else
            req.body.cover = req.file.filename

        next();
    }

    handleFiles(req , res , next) {
        if(! req.files) 
            req.body.files = undefined;
        else
            req.body.files = req.files.map(file => file.filename)

        next();
    }
}


module.exports = new convertFileToField();