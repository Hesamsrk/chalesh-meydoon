module.exports = new class logger{


    requestLogger(req, res,next){
        console.log(`${req.method} request on ${req.url}`.bold.yellow);
        next();
    }

}