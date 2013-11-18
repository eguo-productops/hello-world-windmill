var path = require("path");
var runner = require("mocha-runner");
runner.run(
    [
        path.join(__dirname,"example-service-tests.js")
    ]
);
