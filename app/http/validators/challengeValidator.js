const validator = require('./validator');
const {
    check
} = require('express-validator/check');
const path = require('path');
const Challenge =require('app/models/challenge');
class challengeValidator extends validator {

    handle() {
        return [
            check('challenge_title')
            .isLength({
                min: 5
            })
            .withMessage('عنوان نمیتواند کمتر از 5 کاراکتر باشد')
            .custom(async value => {
                let challenge = await Challenge.findOne({ challenge_title : value });
                if(challenge) {
                    throw new Error('چنین چالش ای با این عنوان قبلا در سایت قرار داده شده است')
                }
            }),
            check('cover')
            .custom(async value => {
                if(! value)
                    return

                let fileExt = ['.png' , '.jpg' , '.jpeg' , '.svg'];
                if(! fileExt.includes(path.extname(value)))
                    throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست')
            }),

        ]
    }

}

module.exports = new challengeValidator();