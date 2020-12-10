const controller = require('app/http/controllers/controller');
const email = require('app/helpers/email');
class homeController extends controller {
    
    index(req , res) {
        res.render('home/index');
    }

    async contactUs(req, res){
        let subject = "چالش میدون - انتقادات و پیشنهادات"
        let text = "";
        for(let key in req.body){
            text +=String(key)+" : "+String(req.body[key])+"\n";
        }
        email.SendMail(process.env.OWNER_MAIL,subject,text)
        res.redirect("/thanks");
    }

    async thanks(req,res){
        res.render("home/thanks");
    }

}

module.exports = new homeController();