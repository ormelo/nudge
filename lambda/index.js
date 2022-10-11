var client = require('flipkart-api-affiliate-client');
var uuid = require('uuid-v4');
var http = require("https");
var DEVELOPER_ACCESS_TOKEN = '7311e67496773579a7924b37e2086b32e68de0a0298890ae236b598d507f0b40';

var fkClient = new client({
    trackingId:"attiristf",
    token:"1b6372cefdf64b2cbe7c5d8491d2f528",
},"json");

exports.handler = async (event, context, callback) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: event["queryStringParameters"]["q"],
    };
    let body = "";
    if (event.body !== null && event.body !== undefined) {
        body = JSON.parse(event.body)
        //your code
    }

    //create chatbot
    var myUUID = uuid();
    var storyId = '';
    var integrationId = '';
    var integrationScript = undefined;
    console.log('myUUID: ',myUUID);

    var options = {
        "method": "POST",
        "hostname": "api.chatbot.com",
        "port": null,
        "path": "/stories",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer "+DEVELOPER_ACCESS_TOKEN
        }
    };

    var optionsIntegration = {
        "method": "POST",
        "hostname": "api.chatbot.com",
        "port": null,
        "path": "/integrations/widget",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer "+DEVELOPER_ACCESS_TOKEN
        }
    };


    
    return fkClient.doKeywordSearch(event["queryStringParameters"]["q"],10).then(function(value){
        console.log('shpng response.... ', value);
        //var productTitle = JSON.parse(value.body).products[0].productBaseInfoV1.title;
       console.log('options... ', options);
        var req = http.request(options, function (res) {
        var chunks = [];
        console.log('htt request made... ', http);
        res.on("data", function (chunk) {
            console.log('data: ', chunk);
            chunks.push(chunk);
        });

        console.log('reuqest made to:', options);

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log('resp body: ', body.toString());
            storyId = JSON.parse(body.toString()).id;
            console.log('storyId: ', storyId);

            //Create chat integration
            var req1 = http.request(optionsIntegration, function (res1) {
            var chunks1 = [];

                res1.on("data", function (chunk1) {
                    chunks1.push(chunk1);
                });

                res1.on("end", function () {
                    var body1 = Buffer.concat(chunks1);
                    console.log('resp body1: ', body1.toString());
                    integrationId = JSON.parse(body1.toString()).id;
                    console.log('integrationId: ', integrationId);

                    //Update integration

                    var optionsUpdateIntegration = {
                        "method": "PUT",
                        "hostname": "api.chatbot.com",
                        "port": null,
                        "path": "/integrations/widget/"+integrationId,
                        "headers": {
                            "content-type": "application/json",
                            "authorization": "Bearer "+DEVELOPER_ACCESS_TOKEN
                        }
                    };

                    var req2 = http.request(optionsUpdateIntegration, function (res2) {
                    var chunks2 = [];

                        res2.on("data", function (chunk2) {
                            chunks2.push(chunk2);
                        });

                        res2.on("end", function () {
                            var body2 = Buffer.concat(chunks2);
                            console.log('resp body2: ', body2.toString());
                            integrationScript = 'window.__be=window.__be||{},window.__be.id="'+integrationId+'",function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"==document.location.protocol?"https://":"http://")+"cdn.chatbot.com/widget/plugin.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}();';
                           
                            //Update integration
                            let output = {
                                statusCode: 200,
                                body: integrationScript,
                            };

                            console.log('--output--', output);

                            //Create chat integration
                            

                        });
                    });

                    req2.write("{\"welcomeScreen\":false,\"whiteLabel\":false,\"colors\":{\"background\":\"#21262e\",\"text\":\"#ffffff\",\"theme\":\"#1F8CEB\",\"themeText\":\"#fafafa\",\"responseBackground\":\"#e9eef4\",\"responseText\":\"#646464\"},\"company\":{\"name\":\"chirrp\",\"description\":\"\",\"avatar\":{\"enabled\":true,\"url\":\"\"},\"background\":{\"enabled\":true,\"url\":\"\"},\"social\":{\"facebook\":\"\",\"twitter\":\"\",\"linkedin\":\"\"}},\"chatWindow\":{\"theme\":\"default\"},\"chatButton\":{\"theme\":\"bubble\",\"text\":\"Chat with us!\"},\"storyId\":\""+storyId+"\"}");
                    req2.end();
                    callback(undefined, "success");

                });
            });

            req1.write("{\"storyId\":\""+storyId+"\",\"company\":{\"name\":\"chirrp\"}}");
            req1.end();

        });
    });

    req.write("{\"name\":\""+myUUID+"\",\"description\":\"\"}");
    req.end();
            
        
            
       
        
    });
};

this.handler({queryStringParameters:"headphones"},{},()=>{});
