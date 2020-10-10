const controller = require('app/http/controllers/controller');
const Challenge =require('app/models/challenge');
const fs = require('fs');
class challengeController extends controller {
    
    showCreateForm(req , res) {
        const title = 'ایجاد چالش جدید';
        res.render('home/cl/create' , { title });
    }

    showChallngeList(req,res){
        res.json('challenge list')
    }

    async saveChallengeProcess(req  ,res){
        let status = await this.validationData(req);
        if(! status) {
            if(req.file) 
                fs.unlink(req.file.path ,(err) => {});
            return this.back(req,res);
        }
        
        // images
        


        // create course
        
        let { challenge_title , official ,body, cover , tags} = req.body;

        let newChallenge = new Challenge({
            challenge_user : req.user._id,
            challenge_title,
            official,
            body,
            cover,
            tags
        });

        await newChallenge.save();

        return res.redirect('/cl/');  
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