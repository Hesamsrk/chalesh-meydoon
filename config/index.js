const database = require('./database');
const session = require('./session');
const layout = require('./layout');
const service = require('./service');
const mail_server = require('./mail_server');
module.exports = {
    database,
    session,
    layout,
    service,
    port : process.env.APPLICATION_PORT,
    cookie_secretkey : process.env.COOKIE_SECRETKEY,
    mail_server
}