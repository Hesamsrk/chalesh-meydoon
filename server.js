require('app-module-path').addPath(__dirname) //TODO : handle local paths
const App = require('app'); //TODO: import main application 
require('dotenv').config(); // TODO: use dotenv (handling .env global variables)
global.config = require('config'); // TODO: handling global variables
new App(); // Starting the program




// code and comments: hesam_srk