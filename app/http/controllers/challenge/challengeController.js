const controller = require('app/http/controllers/controller');
const passport = require('passport');
const Challenge =require('app/models/challenge');

class challengeController extends controller {
    
    showCreateForm(req , res) {
        const title = 'ایجاد چالش جدید';
        res.render('home/cl/create' , { title });
    }

    showChallngeList(req,res){
        res.json('challenge list')
    }

    async saveChallengeProcess(req  ,res , next){
        let result = await this.validationData(req)
        if(result) {
            return this.saveChallenge(req, res , next)
        } 
        this.back(req,res);
    }

    saveChallenge(req  ,res ){
        try{
            Challenge.findOne({'challenge_title':req.body.title},(err,challenge)=>{
                if(err){
                    console.log("+\n+\n+\n+\n+");
                    throw Error("اشتباهی رخ داده است. دوباره سعی کنید.");
                }
    
                if(challenge){
                    console.log("-\n-\n-\n-\n-");
                    throw new Error("چنین عنوانی برای چالش دیگری انتخاب شده است")
                }
                let newChallenge = new Challenge({
                    challenge_user :req.user._id ,
                    challenge_title :req.body.title ,
                    body :req.body.body ,
                    cover :req.body.cover,
                    tags :req.body.tags 
                })
                newChallenge.save(err => {
                    if(err) throw err
                    else{
                        res.redirect('/');
                    }
                })
                
    
            })
        }catch(err){
            back(req, res)
        }

    
    }

}

module.exports = new challengeController();