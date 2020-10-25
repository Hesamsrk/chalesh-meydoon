const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const getDirImage = (req) => {
    if (req.body.challenge_title!==undefined) {
        let challenge_title = req.body.challenge_title;
        return './public/uploads/images/challenge/' + challenge_title + "/cover"
    }
    return  './public/uploads/images/null';
}
const getFileName = (req, file) => {
    if (req.body.challenge_title!==undefined) {
        return 'cover'+path.extname(file.originalname)
    }
    return ""+Date.now()+path.extname(file.originalname);
}


const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = getDirImage(req);

        mkdirp(dir).then((err) => cb(null , dir))
    },
    filename: (req, file, cb) => {
        let filename = getFileName(req, file)
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