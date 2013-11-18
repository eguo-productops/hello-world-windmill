// Architect is our DI module
var path = require('path');
var arch = require('architect');
var context = arch.loadConfig(path.join(__dirname, "context.js"));

arch.createApp(context, function(err, app){
    if(err) throw err;
    console.log("app ready");
});