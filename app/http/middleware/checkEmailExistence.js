
const emailExistence = require('email-existence');
const middleware = require('./middleware');
class checkEmailExistence extends middleware {

    handle(req , res , next) {
        let email = req.body.email;
        emailExistence.check(email,(err,response) => {

            if(err) console.log('mylog : err in email-existence.check');

            if (response === false) {
                console.log('email was invalid');
                req.flash('errors','چنین ایمیلی وجود ندارد. لطفا یک ایمیل حقیقی وارد کنید.')
                req.flash('formData' , req.body);
                return res.redirect(req.header('Referer') || '/');
            }
            else if(response===true){
                console.log('email was valid');
            }
            else{
                console.log("response was : ",response);
            }
            next();
        });
    }
}
module.exports = new checkEmailExistence();