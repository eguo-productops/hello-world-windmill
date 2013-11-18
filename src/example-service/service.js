module.exports =
    function startup(options, imports, register){
        var windmill = imports['windmill'];
        var config = imports['config'];

        config.defaults({
            service: {
                var1: "foo"
            }
        });
        config.set("service:var1","foo");

        var modelAd = {

            "Ad": {
                "id": "ad",
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

        windmill.addModels(modelAd);

        /**
         * Define the swagger spec and the action function
         * @type {{spec: {description: string, path: string, method: string,
                * nickname: string, notes: string, responseClass: string, params: Array, summary: string}, action: Function}}
         */
        var getAd = {
            'spec': {
                "description" : "Get Advertising",
                "path" : "/ads",
                "method" : "GET",
                "nickname" : "getAd",
                "notes": "You can choose between image or text ads",
                "responseClass" : "Ad",
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
//                        windmill.swagger.queryParam("ZipCode","Specifies the zip code of the user.", "integer", false, false),
//                        windmill.swagger.queryParam("Longitude","Specifies the current longitude", "decimal", false, false),
//                        windmill.swagger.queryParam("MinWidth","Specifies the minimum width of the banner", "integer", false, false)
                    ],
                "summary" : "Get an ad based on the criteria entered"
            },
            'action': function (req,res) {
                res.statusCode = 200;
                res.send({"test":2});
            }
        };

        windmill.addGet(getAd);

        // Callback to the Architect system notifying that module startup is done.
        register(null, {})
    }