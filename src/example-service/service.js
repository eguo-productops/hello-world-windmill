module.exports =
    function startup(options, imports, register){
        var windmill = imports['windmill'];
        var config = imports['config'];

        config.defaults({
            "example-service": {
                var1: "foo"
            }
        });

        var modelHello = {

            "Hello": {
                "id": "Hello",
                "properties" :{
                    "Type":{
                        "type": "string"
                    },
                    "ClickUrl": {
                        "type": "string"
                    },
                    "ImageUrl": {
                        "type": "string"
                    }
                }
            }
        };

        windmill.addModels(modelHello);

        /**
         * Define the swagger spec and the action function
         * @type {{spec: {description: string, path: string, method: string,
                * nickname: string, notes: string, responseClass: string, params: Array, summary: string}, action: Function}}
         */
        var getHello = {
            'spec': {
                "description" : "Get World",
                "path" : "/hello",
                "method" : "GET",
                "nickname" : "getHello",
                "notes": "If you say 'hello' we'll say world. hello. world. HELLO! WORLD!",
                "responseClass" : "Hello",
                "params" :
                    [
                        //swagger.headerParam("Accept","Specifies the format of the body for the response.", true),
                        //swagger.headerParam("User-agent","Specifies the user agent of the mobile device.", true)
                        //swagger.headerParam("Authorization","Your access-token from the auth call.", "string", true),
//                        windmill.swagger.queryParam("Category","Specifies the category of the app.", "string", true, false,
//                            {
//                                "valueType": "LIST",
//                                "values":[
//                                    "auto","business","finance","chat","community",
//                                    "social","personals","communication","technology",
//                                    "games","health","medical","maps","local","entertainment",
//                                    "movies","tv","music","photos","video","news","weather","shopping",
//                                    "sports","shopping","tools","travel","other"
//                                ]
//                            }
//                        ),
                        windmill.swagger.queryParam("allCaps","Specifies if you'd like the greeting in all caps or not.", "boolean", false, false),
//                        windmill.swagger.queryParam("Longitude","Specifies the current longitude", "decimal", false, false),
//                        windmill.swagger.queryParam("MinWidth","Specifies the minimum width of the banner", "integer", false, false)
                    ],
                "summary" : "Get a greeting based on the parameters entered"
            },
            'action': function (req,res) {
                res.statusCode = 200;
                if(req.query.allCaps === "true")
                    res.send("WORLD");
                else
                    res.send("world");
            }
        };

        windmill.addGet(getHello);

        // Callback to the Architect system notifying that module startup is done.
        register(null, {})
    }