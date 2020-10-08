const validator = require('./validator');
const {
    check
} = require('express-validator/check');
const Course = require('app/models/course');
const path = require('path');

class challengeValidator extends validator {

    handle() {
        return [
            check('title')
            .isLength({
                min: 5
            })
            .withMessage('عنوان نمیتواند کمتر از 5 کاراکتر باشد')

        ]
    }

}

module.exports = new challengeValidator();