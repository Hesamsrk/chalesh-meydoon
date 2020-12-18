const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const getDirImage = (req) => {
    try {
        if (req.params.id!==undefined) {
            let challenge_id = req.params.id
            return './public/uploads/posts/challenge_ids/' + challenge_id + "/posts"+"/"+ req.body.unique
        }
        return  './public/uploads/posts/null';
        }
        catch(err){
            console.log(err);
        }
}
const getFileName = (req, file) => {
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

const uploadPostFile = multer({
    storage: ImageStorage,
    limits: {
        fileSize: 1024 * 1024 * 100
    }
});

module.exports = {
    uploadPostFile,
    getDirImage
};