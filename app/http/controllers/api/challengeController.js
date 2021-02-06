const controller = require('app/http/controllers/controller');
const Challenge = require('app/models/challenge');
class challengeController extends controller{
    async getChallenges(req,res){
        let challenges = await Challenge.find({});
        res.json(challenges);
    }
}


module.exports = new challengeController();