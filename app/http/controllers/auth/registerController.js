const controller = require('app/http/controllers/controller');
const passport = require('passport');
const uniqueString = require('unique-string')
const userMailvarification = require('app/models/userMailvarification');
const email = require('app/helpers/email');
class registerController extends controller {

    showRegsitrationForm(req, res) {
        const title = 'صفحه عضویت';
        res.render('home/auth/register', {
            recaptcha: this.recaptcha.render(),
            title
        });
    }

    async registerProccess(req, res, next) {
        await this.recaptchaValidation(req, res);
        let result = await this.validationData(req)

        if (result) {
            return this.gotoVarificationPage(req, res, next)
        }

        return this.back(req, res);
    }
    async varifyEmail(req, res, next) {

        let UserMailvarification = await userMailvarification.findOne({
            email: req.body.email
        });
        if (UserMailvarification) {
            if (UserMailvarification.token == req.body.code) {
                UserMailvarification.remove()
                passport.authenticate('local.register', {
                    successRedirect: '/',
                    failureRedirect: '/auth/register',
                    failureFlash: true
                })(req, res, next);
            } else {
                UserMailvarification.remove()
                req.flash('errors', 'کد وارد شده صحیح نمیباشد!مجددا سعی کنید!');
                return this.back(req, res);
            }

        } else {
            req.flash('errors', 'هیچ کد تاییدی به این ایمیل ارسال نشده است!');
            return this.back(req, res);
        }


    }


    async gotoVarificationPage(req, res, next) {
        // create varification token
        let max = 1000000
        let min = 100000
        let token = Math.floor(
            Math.random() * (max - min) + min
        ).toString()
        const newUserMailvarification = new userMailvarification({
            email: req.body.email,
            token
        });
        await newUserMailvarification.save();

        //send varification email
        let subject = "چالش میدون - تایید ایمیل"
        let text = " کد تایید ایمیل:"
        text += "\n"
        text += token;
        text += "\n\n"
        text += "اگر شما چنین درخواستی ندارید کافی است که این پیام را نادیده بگیرید."
        // send Mail
        email.SendMail(req.body.email, subject, text)
        //go to varificationPage
        res.render('home/auth/register_varification', {
            bud: req.body
        })

    }

}

module.exports = new registerController();