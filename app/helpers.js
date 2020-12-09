const path = require('path');
const autoBind = require('auto-bind');
const moment = require('moment-jalaali')



module.exports = class Helpers {

    constructor(req, res) {
        autoBind(this);
        this.req = req;
        this.res = res;
        this.formData = req.flash('formData')[0];
    }

    getObjects() {
        return {
            ToPersianDate: this.ToPersianDate,
            auth: {
                check: this.req.isAuthenticated(),
                user: this.req.user
            },
            viewPath: this.viewPath,
            ...this.getGlobalVaribales(),
            old: this.old
        }
    }


    viewPath(dir) {
        return path.resolve(config.layout.view_dir + '/' + dir);
    }

    getGlobalVaribales() {
        return {
            errors: this.req.flash('errors')
        }
    }

    old(field, defaultValue = '') {
        return this.formData && this.formData.hasOwnProperty(field) ? this.formData[field] : defaultValue;
    }

    ToPersianDate(date) {
        return moment(date)
    }
}