const multer = require('multer');
const mkdirp = require('mkdirp');
const fs = require('fs');

const getDirImage = (req) => {
    if (req.body.cover) {
        console.log("cover : " + req.body.cover);
        return './public/uploads/images/challenge/' + req.body.challenge_title + '/cover'
    } else if (req.body.image) {
        console.log("image : " + req.body.image);
        return './public/uploads/images/challenge/posts/' + Date.now()
    }
    console.log("mylog: something went wrong in getDirImage(req)");
    return './public/uploads/images/challenge/error'
}
const getFileName = (req,file)=>{
    let filename = ''
    let filePath = getDirImage(req) + '/' + file.originalname;
    if (!fs.existsSync(filePath))
        filename = file.originalname
    else
        filename = Date.now() + '-' + file.originalname;
    return filename
}


const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = getDirImage(req);

        mkdirp(dir, (err) => cb(null, dir))
    },
    filename: (req, file, cb) => {
        let filename = getFileName(req,file) 
        cb(null, filename)
    }
})

const uploadImage = multer({
    storage: ImageStorage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

module.exports = {
    uploadImage,
    getDirImage
};