const controller = require('app/http/controllers/controller');
const Challenge =require('app/models/challenge');
const fs = require('fs');
const sharp = require('sharp');
const path = require("path");
const rimraf = require('rimraf');
class challengeController extends controller {
    
    showCreateForm(req , res) {
        const title = 'ایجاد چالش جدید';
        res.render('home/cl/create' , { title });
    }

    async showChallngeList(req,res){
        let page = req.query.page || 1;
        let challenges = await Challenge.paginate({} , { page , sort : { createdAt : 1 } , limit : 5 });
        res.render('home/cl/index',{ title : 'چالش ها' , challenges })
        
        
    }

    async saveChallengeProcess(req  ,res){
        let status = await this.validationData(req);
        if(! status) {
            if(req.file){
                let p = './public/uploads/images/challenge/' + req.body.challenge_title
                rimraf(p,(err)=>{
                    if(err)
                        console.log(String(err).red);
                })
            }
            return this.back(req,res);
        }
        

        // create course

        let { challenge_title , official ,cover,body, tags} = req.body;

        let challenge_data = {
            challenge_user : req.user._id,
            challenge_title,
            official,
            body,
            cover,
            tags
        };

        
        if(req.file){
            // make other sizes for cover
            let image_name = this.imageResize(req.file);
            challenge_data.cover = image_name;
        }


        let newChallenge = new Challenge(challenge_data);

        await newChallenge.save();

        return res.redirect('/cl/');  
    }

    imageResize(image) {
        const imageInfo = path.parse(image.path);
        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        const resize = size => {
            let w = size.w;
            let h = size.h;
            let imageName = `${imageInfo.name}-${w+'X'+h}${imageInfo.ext}`;
            addresImages[w+'X'+h] = this.getUrlImage(`${image.destination}/${imageName}`);
            
            sharp(image.path)
                .resize(w,h)
                .toFile(`${image.destination}/${imageName}`);
        }

        [{w:360,h:360}].map(resize);

        return addresImages;
    }

    getUrlImage(dir) {
        return dir.substring(8);
    }


}

module.exports = new challengeController();


// try{
//     Challenge.findOne({'challenge_title':req.body.title},(err,challenge)=>{
//         if(err){
//             console.log("+\n+\n+\n+\n+");
//             throw Error("اشتباهی رخ داده است. دوباره سعی کنید.");
//         }

//         if(challenge){
//             console.log("-\n-\n-\n-\n-");
//             throw new Error("چنین عنوانی برای چالش دیگری انتخاب شده است")
//         }
//         let newChallenge = new Challenge({
//             challenge_user :req.user._id ,
//             challenge_title :req.body.title ,
//             body :req.body.body ,
//             cover :req.body.cover,
//             tags :req.body.tags 
//         })
//         newChallenge.save(err => {
//             if(err) throw err
//             else{
//                 res.redirect('/');
//             }
//         })
        

//     })
// }catch(err){
//     back(req, res)
// }