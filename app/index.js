const express = require('express'); // main framework
const app = express();
const http = require('http');
const bodyParser = require('body-parser'); // handle post data
const cookieParser = require('cookie-parser'); // handle cookies
const validator = require('express-validator'); // handle valitaion
const session = require('express-session'); // handle sessions
const mongoose = require('mongoose'); // ease working with mongoDB
const flash = require('connect-flash'); // work with flash data (show errors, warning and etc. to user)
const passport = require('passport'); // validate input data
const Helpers = require('app/helpers'); // some helping functions
const rememberLogin = require('app/http/middleware/rememberLogin'); // remembers if the user is already logged in
const { fileLoader } = require('ejs');

module.exports = class Application {
    constructor() {
        this.setupExpress(); // create and config server  
        this.setMongoConnection(); // config mongoDB
        this.setConfig(); // extra configs
        this.setRouters(); // config routers
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(config.port , () => console.log(`Listening on port ${config.port}`));
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url);
    }

    /**
     * Express Config
     */
    setConfig() {
        require('app/passport/passport-local'); // handle login using usual method (mail and pass)
        require('app/passport/passport-google'); // handle login using google 
    
        app.use(express.static(config.layout.public_dir)); 
        app.set('view engine', config.layout.view_engine); // specify the view engine
        app.set('views' , config.layout.view_dir); // specify the view direction
        app.use(config.layout.ejs.expressLayouts); 
        app.set("layout extractScripts", config.layout.ejs.extractScripts); 
        app.set("layout extractStyles", config.layout.ejs.extractStyles); 
        app.set("layout" , config.layout.ejs.master); // to use ejs master layout


        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true }));
        app.use(validator());
        app.use(session({...config.session}));
        app.use(cookieParser(config.cookie_secretkey));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle); // to check if user is already logged in

        // TODO: add helpers to app locals to use it globally in views and etc.
        app.use((req , res , next) => {
            app.locals = new Helpers(req, res).getObjects();
            next();
        }); 
        
    }

    setRouters() {
        app.use(require('app/routes/api'));
        app.use(require('app/routes/web'));        
    }
}