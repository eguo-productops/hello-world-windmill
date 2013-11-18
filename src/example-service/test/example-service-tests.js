// Architect is our DI module
var path = require('path');
var arch = require('architect');
var context = arch.loadConfig(path.join(__dirname, "context.js"));
var assert = require('assert');
var http = require('http');

var healthcheck;
var config;
/**
 * Setup the context before any tests are run
 */
before(function(){
    arch.createApp(context, function(err, app){
        if(err) throw err;
        healthcheck = app.services.healthcheck;
        config = app.services.config;
    })
});

/**
 * Do any cleanup thats needed
 */
after(function(done){
    process.exit();
})

describe('Example Service Module', function(){
    describe('HTTP', function(){
        it('Should expose the ads @ /ads', function(done){

            var request = http.request(
                {
                    "hostname": "localhost",
                    "port": config.get("healthcheck:port"),
                    "path": "",
                    "method": "GET"
                },
                function(res){
                    var body = "";

                    res.setEncoding('utf8');
                    res.on('data', function(chunk){
                        body += chunk;
                    });
                    res.on('end', function(){
                        var json = JSON.parse(body);
                        assert.equal(json.foo, "bar");
                        done();
                    })
                })
            request.end();
        });

        it('Should respond with 405 for any request thats not an HTTP GET', function(done){

            var request = http.request(
                {
                    "hostname": "localhost",
                    "port": config.get("healthcheck:port"),
                    "path": "",
                    "method": "POST"
                },
                function(res){
                    assert.equal(405, res.statusCode);
                    done();
                })
            request.end();
        });
    });
});

