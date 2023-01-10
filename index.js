var express = require('express');
//var shrinkRay = require('shrink-ray');
var app = express();
var path = require('path');
var webpush = require('web-push');
var fs = require('fs');
var url = require('url');
var redis = require('redis');
var loggr = require("loggr");
var request= require('request');
var { Client } = require('pg');
var { Pool } = require('pg');
var axios = require('axios');
//var mergeImages = require('merge-images');
var base64 = require('file-base64');
//const { Canvas, Image } = require('canvas');
const pgClient = new Client({
      host: 'ec2-54-247-188-247.eu-west-1.compute.amazonaws.com',
      port: 5432,
      database: 'dcrgs2nbc0i5vf',
      user: 'nrgkzvyxpdfhkb',
      password: '39798783ada15727c8bd9f24bb6c5808d313ab686991c4aca62e3db947cb016c',
      ssl: true
    });
let dbConfig = {
       database: 'slimcrust',
       host: 'dpg-cc6s37pgp3jupk0q3tu0-a.singapore-postgres.render.com',
         port: 5432,
         user: 'slimcrust',
         password: '3oXJwFL9ytuMtD7ofv5uhr7LceQVBTsv',
         ssl: { rejectUnauthorized: false }
     }
const orderid = require('order-id')('randomgenid');
var redisURLVal = process.env.REDISCLOUD_URL || 'redis://rediscloud:vWISiXr6xai89eidZYXjM0OK3KeXfkPU@redis-16431.c10.us-east-1-2.ec2.cloud.redislabs.com:16431';
redisURL = url.parse(redisURLVal);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var client = require('flipkart-api-affiliate-client');
var uuid = require('uuid-v4');
var http = require("https");
var httpServ = require('http').createServer (app);
var io = require('socket.io')(httpServ);
var DEVELOPER_ACCESS_TOKEN = '7311e67496773579a7924b37e2086b32e68de0a0298890ae236b598d507f0b40';
var shoppingCriteriaMap = {keywords: []};
var shoppingCriteriaUUIDMap = {};
var userCriteriaSelection = {};
var resultsQuery = '';

var goToValKeywords = ["5cbecf1bf96720080791819c", "5cbecf92f96720df8f9181b2", "5cbecfe0dd2e6e8a776f9ee8", "5cbecfe6dd2e6e34916f9eef", "5cbecfeadd2e6e2a0f6f9ef1", "5cbecfeedd2e6e73a56f9ef3", "5cbecff5dd2e6eb3646f9ef6", "5cbecff9f96720ad639181c6"];
var goToValBudgets = ["5cbed205f967203cf9918240", "5cbed20af9672091f0918242", "5cbed20fdd2e6e7eb56f9f60", "5cbed214f96720ea24918248"];
//questionCriteraNameMap
//answer 1 - Object.keys(k)[1]
//answer 2 - Object.keys(k)[2]
//answer 3 - Object.keys(k)[3]
//answer 4 - Object.keys(k)[0]
//answer 5 - Object.keys(k)[4]

var recentlyResearchedImgs = ["https://rukminim1.flixcart.com/image/800/800/jt1tq4w0/smart-band-tag/r/d/b/waterproof-smart-m3-band-black-01-mezire-original-imafccx5gsdhxuh5.jpeg?q=90", "https://rukminim1.flixcart.com/image/800/800/jtrjngw0/mobile/2/t/v/realme-3-rmx1825-original-imaferd5uzuyxrsv.jpeg?q=90","https://rukminim1.flixcart.com/image/800/800/jfsknm80/tablet/f/m/c/apple-mrjp2hn-a-original-imaf46khz8vftwnf.jpeg?q=90","https://rukminim1.flixcart.com/image/800/800/j3lwh3k0/power-bank/y/x/t/power-bank-it-pb-20k-poly-intex-original-imaeupg8dfgtsrfw.jpeg?q=90","https://rukminim1.flixcart.com/image/800/800/jfsknm80/smart-assistant/j/q/h/home-mini-ghmini-chalk-google-original-imaf46ev9a8xkahw.jpeg?q=90"];

var fkClient = new client({
    trackingId:"attiristf",
    token:"1b6372cefdf64b2cbe7c5d8491d2f528",
},"json");

/*fkClient.doIdSearch('MOBFAJB4CWKAZGPZ').then(function(value){
        //console.log(value); //object with status, error and body
});

fkClient.doKeywordSearch("mobiles under 8000",10).then(function(value){
        console.log(value); //object with status, error and body
});*/

//var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
//client.auth('vWISiXr6xai89eidZYXjM0OK3KeXfkPU');
var keyName = 0;
var valName = 0;

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//app.use(app.json());       // to support JSON-encoded bodies
//app.use(app.urlencoded()); // to support URL-encoded bodies


var pages = [];
  fs.readFile("public/index.html", "utf8", function(err, data) {
    pages.index = data;
  });

  fs.readFile("public/search.html", "utf8", function(err, data) {
      pages.search = data;
    });

    fs.readFile("public/guide.html", "utf8", function(err, data) {
          pages.guide = data;
        });

    fs.readFile("public/picks.html", "utf8", function(err, data) {
              pages.picks = data;
            });

  fs.readFile("public/products.html", "utf8", function(err, data) {
    pages.products = data;
  });

  fs.readFile("public/getQuote.html", "utf8", function(err, data) {
    pages.getQuote = data;
  });

  fs.readFile("public/getSlot.html", "utf8", function(err, data) {
    pages.getSlot = data;
  });

  fs.readFile("public/ingredients.html", "utf8", function(err, data) {
    pages.ingredients = data;
  });

  fs.readFile("public/startYourOwn.html", "utf8", function(err, data) {
    pages.startYourOwn = data;
  });

io.on('connection', function(socket){
  console.log('a user connected');
});

app.set('port', (process.env.PORT || 5000));

//app.use(shrinkRay());
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/courses', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'list.html'));
});

function updateQuestion(uuid, interactionId, num, question, outputStr, resp, gotoVal, keywords, budgetArr, nextQuestionInteractionVal) {
  var options = {
        "method": "PUT",
        "hostname": "api.chatbot.com",
        "port": null,
        "path": "/stories/5cb8b496f96720dfac900749/interactions/"+interactionId,
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer "+DEVELOPER_ACCESS_TOKEN
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            console.log('data: ', chunk);
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log('resp body: ', body.toString());
            storyId = JSON.parse(body.toString()).id;
            console.log('storyId: ', storyId);
            let output = {
                statusCode: 200,
                body: storyId,
             };

          });
       });

       var buttonStr = '';//[{\"type\":\"goto\",\"title\":\"yes\",\"value\":\""+gotoVal+"\"},{\"type\":\"postback\",\"title\":\"Not really\",\"value\":\"\"}]
       var buttons = [];

       if(num == 4) {
         console.log('--keywords--', keywords);
         for(var i in keywords) {
            if(i>7){
              break;
            }
            var btn = {type:'goto',title:keywords[i].keyword.substr(0,16)+'...', value: goToValKeywords[i]};
            buttons.push(btn);
         }

         buttonStr = JSON.stringify(buttons);
         //buttonStr = buttonStr.replace(/"/g, '\\"');
         console.log('buttonStr: ', buttonStr);
         req.write("{\"name\":\"question"+num+"\",\"action\":\"\",\"userSays\":[],\"triggers\":[],\"parameters\":[],\"responses\":[{\"type\":\"quickReplies\",\"title\":\""+question+"?\",\"buttons\":"+buttonStr+",\"filters\":[],\"delay\":100}]}");
       } else if (num == 5) {
         console.log('--budgetArr--', budgetArr);
         for(var i in budgetArr) {
            var btn = {type:'goto',title:budgetArr[i], value: goToValBudgets[i]};
            buttons.push(btn);
         }

         buttonStr = JSON.stringify(buttons);
         //buttonStr = buttonStr.replace(/"/g, '\\"');
         console.log('buttonStr: ', buttonStr);
         req.write("{\"name\":\"question"+num+"\",\"action\":\"\",\"userSays\":[],\"triggers\":[],\"parameters\":[],\"responses\":[{\"type\":\"quickReplies\",\"title\":\""+question+"?\",\"buttons\":"+buttonStr+",\"filters\":[],\"delay\":100}]}");
       } else {
         if(num == 1) {
           req.write("{\"name\":\"question"+num+"\",\"action\":\"\",\"userSays\":[],\"triggers\":[],\"parameters\":[],\"responses\":[{\"type\":\"setAttributes\",\"filters\":[],\"elements\":[{\"action\":\"set\",\"name\":\"default_id\",\"value\":\""+uuid+"\"}]},{\"type\":\"quickReplies\",\"title\":\""+question+"?\",\"buttons\":[{\"type\":\"goto\",\"title\":\"yes\",\"value\":\""+gotoVal+"\"},{\"type\":\"goto\",\"title\":\"Not really\",\"value\":\""+nextQuestionInteractionVal+"\"}],\"filters\":[],\"delay\":100}]}");
         } else {
           req.write("{\"name\":\"question"+num+"\",\"action\":\"\",\"userSays\":[],\"triggers\":[],\"parameters\":[],\"responses\":[{\"type\":\"quickReplies\",\"title\":\""+question+"?\",\"buttons\":[{\"type\":\"goto\",\"title\":\"yes\",\"value\":\""+gotoVal+"\"},{\"type\":\"goto\",\"title\":\"Not really\",\"value\":\""+nextQuestionInteractionVal+"\"}],\"filters\":[],\"delay\":100}]}");
         }
       }

       req.end();
}

function constructQuestion(questionNum, specObj, quickQuestionTemplates) {
    let specName = specObj.key; //{key: "Display Features", values: Array(6)}
    let suffix = "";

    console.log('specObj.values.length: ', specObj.values.length);
    if(specObj.values.length == 1) {
      suffix = specName + ' like ' + specObj.values[0].key;
      shoppingCriteriaMap[specName] = [specObj.values[0].key];
    } else if(specObj.values.length >= 2) {
      suffix = specName + ' like ' + specObj.values[0].key + " and " + specObj.values[1].key;
      shoppingCriteriaMap[specName] = [specObj.values[0].key, specObj.values[1].key];
    }

    let question = quickQuestionTemplates[questionNum] + suffix;

    if(quickQuestionTemplates[questionNum].indexOf('Lot of online users considered') !== -1) {
      question = question + '. Do you wish to add these to your search'
    }
    //question += '?';
    return {qnum: questionNum, question};
}

function positiveScore(link) {
  let score = 0;
  if(link.indexOf('things to condier') != -1 || link.indexOf('factors to condier') != -1 || link.indexOf('guide') != -1)  {
    score = 10;
  } else if(link.indexOf('facotrs') != -1 || link.indexOf('consider') != -1 || link.indexOf('keep in mind') != -1) {
    score = 5;
  } else {
    score = 2;
  }
  return score;
}

function negativeScore(link) {
  let score = 0;
  if(link.indexOf('hdfc') != -1) {
    score = 10;
  } else if(link.indexOf('Where to shop') != -1 || link.indexOf('where to buy') != -1 || link.indexOf('Where to <b>buy') != -1 || link.indexOf('where to <b>buy') != -1) {
    score = 5;
  }
  return score;
}

function calculateScore(link) {
  return positiveScore(link) - negativeScore(link);
}

function getSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

function getBuyingGuideSearchLink(htmlContent) {
    let linkScore = [];
    let htmlStr = htmlContent.substr(htmlContent.indexOf('Web results')+'Web results'.length, htmlContent.length);
    let links = htmlStr.split('<a href="');
    links.shift();
    links.shift();
    links.shift();
    for (i in links) {
      let link = links[i].substr(links[i].indexOf('">')+2, links[i].indexOf('</a>'));
      console.log('links[i]: ', link);
      let score = calculateScore(link);
      let ls = {score, link};
      linkScore.push(ls);
    }
    linkScore.sort(getSortOrder("score"))
    let selectedLink = linkScore[linkScore.length - 1];
    let finalLink = '';
    for(var i in links) {
      if(links[i].indexOf(selectedLink.link) != -1) {
        finalLink = links[i];
        break;
      }
    }
    finalLink = finalLink.substr(finalLink.indexOf('url?q=')+6, finalLink.indexOf('&amp')).replace(/&amp;sa/,'');
    return finalLink;
}

function getBrands(q, budgetSuffix, resp) {

  let productsByBrand = {};
  let fetchCount = 0;



 var options = {
        "method": "GET",
        "hostname": "www.flipkart.com",
        "port": null,
        "path": "/search?q="+q.replace(/ /,'+')
    };
    console.log('url:', options.path);
  var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            //console.log('data: ', chunk);
            chunks.push(chunk);
        });

        var extract = [];

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            //console.log('syntax: ', body.toString());
            //resp.send(body.toString());

            var summaryText = body.toString();

            summaryText = summaryText.substring(summaryText.indexOf('Brand</div>')+11, summaryText.indexOf('MORE</span>'));
            console.log('summaryText: ', summaryText);
            let summaryArr = summaryText.split('<div class="_1GEhLw">');
            summaryArr.shift();

            //console.log('brandIndex: ', brandIndex);
            for(var j in summaryArr) {
              //console.log('item:',summaryArr[j].sentence);
              extract.push(summaryArr[j].substring(0,summaryArr[j].indexOf('</div>')));

            }

            console.log('extract: ',extract);
            for(var i in extract) {
              var brandName = extract[i];
              fkClient.doKeywordSearch(extract[i]+' '+q+budgetSuffix).then(function(value){
                  productTitle = JSON.parse(value.body).products[0].productBaseInfoV1.title;
                  var productBrand = JSON.parse(value.body).products[0].productBaseInfoV1.productBrand


                  productTitle = productTitle.indexOf(" ") != -1 ? productTitle.split(" ")[0]+'%2B'+productTitle.split(" ")[1] : productTitle;
                  console.log('productTitle:', productTitle);



                  let productsRanked = [];
                  let products = JSON.parse(value.body).products;
                  for(var i=0;i<products.length;i++) {
                    let product = {title: products[i].productBaseInfoV1.title, img: products[i].productBaseInfoV1.imageUrls['800x800'],
                      mrp: products[i].productBaseInfoV1.maximumRetailPrice.amount, specialPrice: products[i].productBaseInfoV1.flipkartSpecialPrice.amount,
                      attributes: products[i].productBaseInfoV1.attributes, keySpecs: products[i].categorySpecificInfoV1.keySpecs,
                      detailedSpecs: products[i].categorySpecificInfoV1.detailedSpecs};
                    productsRanked.push(product);
                  }

                  productsByBrand[productBrand] = productsRanked;
                  io.emit('product-found', { for: 'everyone', title: productTitle });
                  fetchCount++;
                  if(fetchCount==extract.length) {
                    resp.send(productsByBrand);
                  }

              });
            }

          });
       });

  /*var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log('body: ', body.toString());
            var extract = body.toString();
            extract = extract.substr(extract.indexOf('Brand'),extract.indexOf(' MORE'));
            extract = extract.split('\n');
            extract.shift();
            extract = extract.slice(0,6);
            console.log('extract: ', extract);


            for(var i in extract) {
              var brandName = extract[i];
              fkClient.doKeywordSearch(extract[i]+' '+q+budgetSuffix).then(function(value){
                  productTitle = JSON.parse(value.body).products[0].productBaseInfoV1.title;
                  var productBrand = JSON.parse(value.body).products[0].productBaseInfoV1.productBrand


                  productTitle = productTitle.indexOf(" ") != -1 ? productTitle.split(" ")[0]+'%2B'+productTitle.split(" ")[1] : productTitle;
                  console.log('productTitle:', productTitle);



                  let productsRanked = [];
                  let products = JSON.parse(value.body).products;
                  for(var i=0;i<products.length;i++) {
                    let product = {title: products[i].productBaseInfoV1.title, img: products[i].productBaseInfoV1.imageUrls['800x800'],
                      mrp: products[i].productBaseInfoV1.maximumRetailPrice.amount, specialPrice: products[i].productBaseInfoV1.flipkartSpecialPrice.amount,
                      attributes: products[i].productBaseInfoV1.attributes, keySpecs: products[i].categorySpecificInfoV1.keySpecs,
                      detailedSpecs: products[i].categorySpecificInfoV1.detailedSpecs};
                    productsRanked.push(product);
                  }

                  productsByBrand[productBrand] = productsRanked;
                  io.emit('product-found', { for: 'everyone', title: productTitle });
                  fetchCount++;
                  if(fetchCount==extract.length) {
                    resp.send(productsByBrand);
                  }

              });
            }

          });
       });*/

       req.end();
}

function getArticle(q, resp, productPrice) {
  var options = {
        "method": "GET",
        "hostname": "www.google.co.in",
        "port": null,
        "path": "/search?q=what+to+look+for+when+buying+a+"+q+"+in+india"
    };
  var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            console.log('data: ', chunk);
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log('resp body: ', body.toString());
            let buyingGuideSearchLink = getBuyingGuideSearchLink(body.toString());
            let keywords = getKeywords(q, buyingGuideSearchLink, resp, productPrice);
          });
       });

       req.end();
}

function getBudget(resp, productPrice) {
    let budgetRanges = [];
    if(productPrice < 5000) {
      budgetRanges.push('1 to 2k');budgetRanges.push('2 to 3k');budgetRanges.push('3 to 4k');budgetRanges.push('4000+');
    } else if(productPrice >= 5000 && productPrice < 10000) {
      budgetRanges.push('2 to 5k');budgetRanges.push('5 to 8k');budgetRanges.push('8 to 12k');budgetRanges.push('12000+');
    } else if(productPrice >= 10000 && productPrice < 25000) {
      budgetRanges.push('5 to 10k');budgetRanges.push('10 to 15k');budgetRanges.push('15 to 20k');budgetRanges.push('20k+');
    } else if(productPrice >= 20000 && productPrice < 50000) {
      budgetRanges.push('15 to 25k');budgetRanges.push('25 to 35k');budgetRanges.push('35 to 45k');budgetRanges.push('45k++');
    } else if(productPrice >= 50000) {
      budgetRanges.push('40 to 60k');budgetRanges.push('60 to 80k');budgetRanges.push('80 to 1Lakh');budgetRanges.push('1Lakh+');
    }
    updateQuestion(resp.uuid, '5cbb5ca8dd2e6e52316ebf74',5, "Sure. what’s the budget range you’re looking at?", '', resp, '5cbb64b5dd2e6e840e6ec0ca', [], budgetRanges);
    shoppingCriteriaMap.budgetRanges = budgetRanges;
    shoppingCriteriaUUIDMap[resp.uuid] = shoppingCriteriaMap;
    resp.send(shoppingCriteriaUUIDMap);
}

function getKeywords(q, url, resp, productPrice) {
  var options = {
        "method": "GET",
        "hostname": "www.summarizebot.com",
        "port": null,
        "path": "/api/summarize?apiKey=2842d14a3a2545d19938a34566dd1e38&size=20&keywords=10&fragments=15&url="+url
    };
  var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            console.log('data: ', chunk);
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log('keywords: ', body.toString());
            //resp.send(body.toString());
            var keywordsJson = JSON.parse(body.toString());
            var keywords = keywordsJson[1].keywords;
            var keywordsArr = [];
            for (var i in keywords) {
              if(keywords[i] !== q) {
                keywordsArr.push(keywords[i]);
                if(i<=7) {
                  shoppingCriteriaMap.keywords.push({index: i, keyword: keywords[i].keyword});
                }
              }
            }

            updateQuestion(resp.uuid, '5cbb2b95dd2e6e9ad36eb5b9',4, "Which of these is a must have for you?", '', resp, '5cbb5e27dd2e6e9c5b6ebfb2', keywordsArr);

            getBudget(resp, productPrice);
          });
       });

       req.end();
}

app.get('/getRecentlyResearched', function(request, resp) {
  resp.send(recentlyResearchedImgs);
});

app.get('/fetchWishList', function(request, response) {
  let query = request.query["main"];
  query = query.indexOf('under') != -1 ? query.substr(0, query.indexOf('under')) : query;
  let budgetStr = request.query["q"].indexOf(',') != -1 ? request.query["q"].split(',').filter((elem)=>elem.indexOf(' to ')!=-1) : '';
  let budgetSuffix='';
  if(budgetStr && budgetStr.length) {
    let actualBudgetStr = '';
    actualBudgetStr = budgetStr[0].split(' to ')[1].indexOf('lakh') == -1 ? budgetStr[0].split(' to ')[1].replace('k','000') : budgetStr[0].split(' to ')[1];
    budgetSuffix += " under " + actualBudgetStr;
  }

  getBrands(query, budgetSuffix, response);

  let criteria = request.query["q"].split(',');
  criteria.pop(); //remove budget criteria*/

  /*if(criteria && criteria.length > 1) {
    for(let i in criteria) {
      if(i == 0) {
        query += " with best "+criteria[i].split(' ')[0];
      } else if(i==1) {
        query += " and "+criteria[i].split(' ')[0];
      }
    }
  } else {
    query += " with best "+criteria[0].split(' ')[0];
  }*/

  //cut short query if conditions more than two


});

app.get('/invokeChat', function(request, resp) {
  const response = {
        statusCode: 200,
        body: request.query.q,
    };
    let body = "";
    resp.uuid = uuid();
    userCriteriaSelection[resp.uuid] = [];
    var storyId = '';
    var integrationId = '';
    var integrationScript = undefined;

    let productTitle = '';
    let productPrice = '';
    let shoppingSearchSpecs = [];
    let reviewedSpecs = [];
    let productTitleForReviewSearch = '';
    let productReviewPageLink = '';
    let productReviewText = '';
    let specRelevanceArray = [{name: '', relevance: 3}]; //spec name string, value score
    let quickQuestionTemplates = ["Do you want to consider ","Lot of online users considered ", "How about "];
    let featureSuggestTemplate ="Also, does any of the below features sound relevant";
    shoppingCriteriaMap = {keywords: []};
    console.log('resp.uuid: ',resp.uuid);
    let questionNum = 0;


    return fkClient.doKeywordSearch(request.query["q"],10).then(function(value){
        productTitle = JSON.parse(value.body).products[0].productBaseInfoV1.title;
        io.emit('product-found', { for: 'everyone', title: productTitle });

        productPrice = JSON.parse(value.body).products[0].productBaseInfoV1.maximumRetailPrice.amount;
        try {
          let productImg = JSON.parse(value.body).products[0].productBaseInfoV1.imageUrls['800x800'];
          /*if (productImg && productImg!=null && productImg!='') {
            if(recentlyResearchedImgs.length >= 5) {
              recentlyResearchedImgs = [];
              recentlyResearchedImgs.push(productImg);
            } else {
              recentlyResearchedImgs.push(productImg);
            }

          }*/
        }catch(e){
          console.log('Error loading researched images.');
        }
        console.log('Body: ', value.body);

        shoppingSearchSpecs = JSON.parse(value.body).products[0].categorySpecificInfoV1.specificationList;
        shoppingSearchSpecs.shift();
        if(shoppingSearchSpecs.length >= 1) {
          let questionNum = Math.floor(Math.random() * 2);
          let q1 = constructQuestion(questionNum, shoppingSearchSpecs[0], quickQuestionTemplates);
          console.log('question 1: ', q1.question);

          updateQuestion(resp.uuid, '5cb8c5f1f967202ea5900e2f',1, q1.question, productTitle, resp, "5cb8d781dd2e6ef9bb6e3b3d",null,null,"5cb98762f967201188903bea");
        }
        if(shoppingSearchSpecs.length >= 2) {
          questionNum = questionNum == 0 ? 1 : 0;
          let q2 = constructQuestion(questionNum, shoppingSearchSpecs[1], quickQuestionTemplates);
          console.log('question 2: ', q2.question);

          updateQuestion(resp.uuid, '5cb98762f967201188903bea',2, q2.question, productTitle, resp, "5cb9d13ff96720733d905af6",null,null,"5cb9d15edd2e6eb11b6e78f8");
        }
        if(shoppingSearchSpecs.length >= 3) {
          questionNum = 2;
          let q3 = constructQuestion(questionNum, shoppingSearchSpecs[2], quickQuestionTemplates);
          console.log('question 3: ', q3.question);

          updateQuestion(resp.uuid, '5cb9d15edd2e6eb11b6e78f8',3, q3.question, productTitle, resp, "5cbb2b83f967200300909b2e",null,null,"5cbb2b95dd2e6e9ad36eb5b9");
        }

        //request to google for "shopping guide" request
        let q = request.query["q"].indexOf(" ") != -1? request.query["q"].split(' ')[0] : request.query["q"];
        let articleHTML = getArticle(q, resp, productPrice) ;

        console.log('articleHTML: ', articleHTML);


        //resp.send("success");

    });

});

app.post('/captureChatData', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== 'ka935tutur') {
        return res.sendStatus(401);
    }

    let uuid = req.body.result.sessionParameters.default_id;
    console.log('user uuid:', uuid);
    console.log('webhook data: ', JSON.stringify(req.body));

    switch(req.body.result.interaction.name) {
      case 'capture answer 1':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[1]]);
        break;
      case 'capture answer 2':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[2]]);
        break;
      case 'capture answer 3':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[3]]);
        break;
      case 'capture answer 4a':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[0]].filter((elem)=>{return elem.index === '0'})[0].keyword);
        break;
      case 'capture answer 4b':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[0]].filter((elem)=>{return elem.index === '1'}))[0].keyword;
        break;
      case 'capture answer 4c':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[0]].filter((elem)=>{return elem.index === '2'})[0].keyword);
        break;
      case 'capture answer 4d':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[0]].filter((elem)=>{return elem.index === '3'})[0].keyword);
        break;
      case 'capture answer 4e':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[0]].filter((elem)=>{return elem.index === '4'})[0].keyword);
        break;
      case 'capture answer 4f':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[0]].filter((elem)=>{return elem.index === '5'})[0].keyword);
        break;
      case 'capture answer 4g':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[0]].filter((elem)=>{return elem.index === '6'})[0].keyword);
        break;
      case 'capture answer 4h':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[0]].filter((elem)=>{return elem.index === '7'})[0].keyword);
        break;
      case 'capture answer 5a':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[4]][0]);
        io.emit('shopping parameters captured', {q: userCriteriaSelection[uuid].toString()});
        break;
      case 'capture answer 5b':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[4]][1]);
        io.emit('shopping parameters captured', {q: userCriteriaSelection[uuid].toString()});
        break;
      case 'capture answer 5c':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[4]][2]);
        io.emit('shopping parameters captured', {q: userCriteriaSelection[uuid].toString()});
        break;
      case 'capture answer 5d':
        userCriteriaSelection[uuid] = userCriteriaSelection[uuid].concat(shoppingCriteriaUUIDMap[uuid][Object.keys(shoppingCriteriaUUIDMap[uuid])[4]][3]);
        io.emit('shopping parameters captured', {q: userCriteriaSelection[uuid].toString()});
        break;
    }
    // return challenge
    // return a text response
    const data = {
        responses: [
            {
                type: 'text',
                elements: []
            }
        ]
    };


    console.log('parameters captured: ', userCriteriaSelection);

    res.json(data);
});

app.get('/sendnotif', function(request, response) {
    // VAPID keys should only be generated only once.
    var vapidKeys = webpush.generateVAPIDKeys();

    webpush.setGCMAPIKey('AAAAb0Jcd5Y:APA91bF0de1UNG5yFMZinQhn1We89nTyigofC-kIrTGeM2RoI4bgSXUcYyUy17W4IgRJborqAENOb-t4zEo2MQD32LoAr64KFQdb8CPKdV-yOzVdG7RDhrWcqTvx96Yaf9_oQsX70Yl-');
    //Above is obtained from https://console.firebase.google.com/project/push-notification-web-d0beb/settings/cloudmessaging

    webpush.setVapidDetails(
      'mailto:sampath.oops@gmail.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );

    var pushSubscription = {
      endpoint: 'https://android.googleapis.com/gcm/send/fiSjtrIp9u0:APA91bF9zt6Q2nTmvAXeq7_bUzdD9GopkXfSmpW2kkbEGAluHCdzSRutceviXn4Xcu8E1r1PS4aUsfIXq4I5zTrxYNXaM03q0hUyH3QiNdpw7MqQt60xmuEPWEe3amVo3dH96TWOe_P5',
      keys: {
        auth: 'b-UTZCGu2p735HpH1g5g4w==',
        p256dh: 'BAtnK3PMuoczYKkRi2Iqzz-BJnPo1ZUhk_9ontvTVWcVLmFy44dN_RoiCfIy22y03TASWlbRxxuVlntwCVf8_e8='
      }
    };

    webpush.sendNotification(pushSubscription, 'First notification.')
    .then(function(result){
      console.log(result)
    }).catch(function(error){
      console.log('error', error)
    });

});

app.get('/fit-test', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'steps.html'));
});

app.get("/index", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'guide.html'));
});

app.get("/home", function(request, response) {
  response.redirect('/');
});

app.get("/mytasks", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'mytasks.html'));
});

app.get("/order/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'shortlists.html'));
});

app.get("/process/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'process.html'));
});

app.get("/orders/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'orders.html'));
});

app.get("/order-detail/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'orders.html'));
});

app.get("/questionnaire/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'questionnaire.html'));
});

app.get("/questionnaire-start/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'questionnaire.html'));
});

app.get("/dashboard/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'questionnaire.html'));
});

app.get("/dashboard-quote-res/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'questionnaire.html'));
});

app.get("/terms/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'terms.html'));
});

app.get("/memory", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'memory.html'));
});

app.get("/bake", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'bake.html'));
});

app.get("/redirect/", function(request, response) {
  let paymentStatus = 'PENDING';
  let paymentRequestId = request.query.payment_request_id;
  if(request.query.payment_status == 'Credit') {
    paymentStatus = 'PAID';
  } else {
    paymentStatus = request.query.payment_status;
  }

  const client = new Client(dbConfig)
              client.connect(err => {
                if (err) {
                  console.error('error connecting', err.stack)
                } else {
                  console.log('connected')
                  client.query("UPDATE \"public\".\"sample_order\" set order_status = $1 WHERE payment_request_id = $2",
                      [paymentStatus, paymentRequestId], (err, res) => {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(response);
                            }

                          });
                }
              })
  response.sendFile(path.resolve(__dirname, 'public', 'shortlists.html'));
});

app.post("/setCOD", function(request, response) {
  let paymentStatus = 'COD';
  let orderId = request.body.orderId;

  const client = new Client(dbConfig)
              client.connect(err => {
                if (err) {
                  console.error('error connecting', err.stack)
                } else {
                  console.log('connected')
                  client.query("UPDATE \"public\".\"sample_order\" set status = $1 WHERE order_id = $2",
                      [paymentStatus, orderId], (err, res) => {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(response);
                            }
                            response.send('success');
                          });
                }
              })
});

app.get("/credits/", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'shortlists.html'));
});

app.get("/data/:task/:loc/:zone", function(request, response) {
  const fs = require('fs');
  let rawdata = fs.readFileSync('./src/data-source/'+request.params.task+'/'+request.params.loc+'/'+request.params.zone+'/mockDataQnA.json');
  response.send(rawdata);
});

app.get("/data/:task/:loc/:zone/starter", function(request, response) {
  const fs = require('fs');
  let rawdata = fs.readFileSync('./src/data-source/'+request.params.task+'/'+request.params.loc+'/'+request.params.zone+'/mockDataStarter.json');
  response.send(rawdata);
});

app.get("/products", function(request, response) {
  //Todo: comment above n uncomment below
  response.send(pages.products);
});

app.get("/getQuote", function(request, response) {
  response.send(pages.getQuote);
});

app.get("/getSlot", function(request, response) {
  response.send(pages.getSlot);
});

app.get("/ingredients", function(request, response) {
  response.send(pages.ingredients);
});

app.get('/quoteChecker', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'quoteChecker.html'));
});

app.get('/franchise', function(request, response) {
 //response.send(pages.startYourOwn);
 response.sendFile(path.resolve(__dirname, 'public', 'startYourOwn.html'));
});

app.get('/privacy-policy', function(request, response) {
 //response.send(pages.startYourOwn);
 response.sendFile(path.resolve(__dirname, 'public', 'privacy.html'));
});



app.get('/getIngredients', function(request, response) {
 var uid = request.query.u;
 console.log('--user id--', uid);
 client.get(uid, function (err, reply) {
    if (reply != null) {
      var recipeJson = reply;
      var ingredientsRecommender = new IngredientsRecommender();
      var allIngredients = ingredientsRecommender.getAllIngredients(recipeJson);
      response.send(allIngredients);
    } else {
      response.send("key not found");
    }
  });

});

app.post('/franchiseEnquiry', function(req, res) {
 //response.send(pages.startYourOwn);
 var email = req.body.email,
        members = req.body.members
        client.set(members, email);
 res.sendFile(path.resolve(__dirname, 'public', 'franchiseEnquiry.html'));
});

app.post('/paymentRequest', function(req, res) {
    const orderId = req.body.orderId;
    const slot = req.body.slot;
    var headers = { 'X-Api-Key': 'b442e3b63d6c01b2e7fdb49e14e8a069', 'X-Auth-Token': '96650eeefedf39e2bbdb32d8496f0ca2'}
    //amount: req.body.amount,
    var payload = {
      purpose: 'Pizza order',
      amount: req.body.amount,
      phone: req.body.phone,
      name: req.body.phone,
      redirect_url: 'https://www.slimcrust.com/redirect/',
      send_email: false,
      send_sms: false,
      allow_repeated_payments: false}

    request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
      if(!error && response.statusCode == 201){
        console.log('-----im response body: ', body);
        console.log('-----payment request id: ', JSON.parse(body).payment_request.id);

        let paymentRequestId = JSON.parse(body).payment_request.id;
        const client = new Client(dbConfig)
            client.connect(err => {
              if (err) {
                console.error('error connecting', err.stack)
              } else {
                console.log('connected')
                client.query("UPDATE \"public\".\"sample_order\" set payment_request_id = $1, delivery_slot = $3 WHERE order_id = $2",
                    [paymentRequestId, orderId, slot], (err, response) => {
                          if (err) {
                            console.log(err)
                            res.send(body);
                          } else {
                            console.log(response)
                             res.send(body);
                          }

                        });
              }
            })



      }
    })
})


/*app.post('/selfie', function(req, res) {

       const selfie = req.body.dataURL;
       console.log('---selfie---', selfie);
       let fileExtensionArr = selfie.split('base64,');

       let fileExtension = fileExtensionArr[0].split('data:image/')[1].replace(';','');
       //decode base64 image
         var matches = selfie.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
           response = {};

         if (matches.length !== 3) {
           return new Error('Invalid input string');
         }

         response.data = selfie.split(",")[1];



         // Defaults
         var defaultOptions = {
         	format: 'image/png',
         	quality: 0.92,
         	width: undefined,
         	height: undefined,
         	Canvas: undefined,
         	crossOrigin: undefined
         };

         // Return Promise
         var mergeImages = function (sources, options) {
         	if ( sources === void 0 ) sources = [];
         	if ( options === void 0 ) options = {};

         	return new Promise(function (resolve) {
         	options = Object.assign({}, defaultOptions, options);

         	// Setup browser/Node.js specific variables
         	var canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');
         	var Image = options.Image || window.Image;

         	// Load sources
         	var images = sources.map(function (source) { return new Promise(function (resolve, reject) {

         	    console.log('--source--', source);
         		// Convert sources to objects
         		if (source.constructor.name !== 'Object') {
         			source = { src: source };
         		}

         		// Resolve source and img when loaded
         		var img = new Image();
         		img.crossOrigin = options.crossOrigin;
         		img.onerror = function () { return reject(new Error('Couldn\'t load image')); };
         		img.onload = function () { return resolve(Object.assign({}, source, { img: img })); };
         		img.src = source.src;
         	}); });

         	// Get canvas context
         	var ctx = canvas.getContext('2d');

         	// When sources have loaded
         	resolve(Promise.all(images)
         		.then(function (images) {
         			// Set canvas dimensions
         			var getSize = function (dim) { return options[dim] || Math.max.apply(Math, images.map(function (image) { return image.img[dim]; })); };
         			canvas.width = getSize('width');
         			canvas.height = getSize('height');

         			// Draw images to canvas
         			images.forEach(function (image) {
         				ctx.globalAlpha = image.opacity ? image.opacity : 1;
         				return ctx.drawImage(image.img, image.x || 0, image.y || 0);
         			});

         			if (options.Canvas && options.format === 'image/jpeg') {
         				// Resolve data URI for node-canvas jpeg async
         				return new Promise(function (resolve, reject) {
         					canvas.toDataURL(options.format, {
         						quality: options.quality,
         						progressive: false
         					}, function (err, jpeg) {
         						if (err) {
         							reject(err);
         							return;
         						}
         						resolve(jpeg);
         					});
         				});
         			}

         			// Resolve all other data URIs sync
         			return canvas.toDataURL(options.format, options.quality);
         		}));
         });
         };



         mergeImages(['public/img/images/sbg.jpg',{ src: selfie.replace(/ /g, "+"), x: 630, y: 540 }],
         {
           Canvas: Canvas,
           Image: Image
         })
           .then((b64) => {console.log('merged');console.log('merged image: ', b64);res.send(b64);});




   });*/

app.post('/homelyOrder', function(req, res) {

    const mobile = req.body.dMobile;
    const name = req.body.dName;
    const orderId = orderid.generate();
    let whitelisted = false;
    const status = 'PENDING';
    const summary = req.body.dItems;
    const deliverySlot = req.body.dSlot;
    const price = req.body.dPrice;
    const address = req.body.dAddress;
    const pincode = req.body.dPincode;
    const referralCode = req.body.referralCode;
    const eOrderId = req.body.eOrderId;

    //res.send('{"orderId":"'+orderId+'", "whitelisted":true}');

    const client = new Client(dbConfig)
    client.connect(err => {
      if (err) {
        console.error('error connecting', err.stack)
      } else {
        console.log('connected')


            client.query("INSERT INTO \"public\".\"sample_order\"(delivery_mobile, delivery_name, order_id, order_status, delivery_slot, delivery_price, delivery_items, delivery_address, delivery_pincode, event_order_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
                        [mobile, name, orderId, status, deliverySlot, price, summary, address, pincode, eOrderId], (err, response) => {
                              if (err) {
                                console.log(err)
                                 res.send("error");
                              } else {
                                console.log(response);
                                axios
                                  .post('https://api.pushalert.co/rest/v1/send', 'title=Order%20Received&message=New%20Pizza%20Order&icon=https://www.slimcrust.com/rounded.png&url=https://www.slimcrust.com', {headers: {'Authorization': 'api_key=c0a692d5772f7c2b7642013d80439aea'}})
                                  .then(res => {
                                    console.log('Pushalert success: ', res);
                                  })
                                  .catch(error => {
                                    console.log('Pushalert error: ', error);
                                  });
                                 res.send('{"orderId":"'+orderId+'", "whitelisted":true}');
                              }

                            });


      }
    })


})

app.post('/eventOrder', function(req, res) {

    const eDate = req.body.eDate;
    const ePincode = req.body.ePincode;
    const orderId = orderid.generate();
    let whitelisted = false;
    const status = 'PENDING';
    const eMobile = req.body.eMobile;

    const client = new Client(dbConfig)
    client.connect(err => {
      if (err) {
        console.error('error connecting', err.stack)
      } else {
        console.log('connected')


            client.query("INSERT INTO \"public\".\"event_order\"(order_id, event_date, venue_pincode, event_contact_mobile, order_status) VALUES($1, $2, $3, $4, $5)",
                        [orderId, eDate, ePincode, eMobile, status], (err, response) => {
                              if (err) {
                                console.log(err)
                                 res.send("error");
                              } else {
                                console.log(response);
                                axios
                                  .post('https://api.pushalert.co/rest/v1/send', 'title=Event Order%20Received&message=New%20Pizza%20Event&icon=https://www.slimcrust.com/rounded.png&url=https://www.slimcrust.com', {headers: {'Authorization': 'api_key=c0a692d5772f7c2b7642013d80439aea'}})
                                  .then(res => {
                                    console.log('Pushalert success: ', res);
                                  })
                                  .catch(error => {
                                    console.log('Pushalert error: ', error);
                                  });
                                 res.send('{"orderId":"'+orderId+'", "whitelisted":true}');
                              }

                            });


      }
    })


})

app.post('/updateEventOrder', function(req, res) {
    const eQuantity = req.body.eventQuantity;
    const eQuote = req.body.eventQuote;
    const orderId = req.body.eventOrderId;
    let whitelisted = false;

    const client = new Client(dbConfig)
    client.connect(err => {
      if (err) {
        console.error('error connecting', err.stack)
      } else {
        console.log('connected')


            client.query("UPDATE \"public\".\"event_order\" set quantity = $1, quote_price = $2 WHERE order_id = $3",
                        [eQuantity, eQuote, orderId], (err, response) => {
                              if (err) {
                                console.log(err)
                                 res.send("error");
                              } else {
                                 res.send('{"orderId":"'+orderId+'", "whitelisted":true}');
                              }

                            });
      }
    })


})

app.post('/submitGetQuote', function(req, res) {
    var email = req.body.email,
        members = req.body.members,
        date = req.body.date;
        client.set(email, members);
    //res.send(pages.getQuote);*/
    res.redirect('/quoteChecker');
});

app.get("/search", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'guide.html'));
});

app.get("/recommended-picks", function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'picks.html'));
});

app.post('/submitMealType', function(req, res) {
    var date = req.body.date,
        orderMeal = req.body.orderMeal,
        email = req.body.email;
        members = req.body.members;
    var obj = {date:date, mealType:orderMeal, members: members}
        client.set(email, JSON.stringify(obj));
    //res.send(pages.getQuote);*/
    res.send('success');
});

app.post('/submitCuisine', function(req, res) {
    var date = req.body.date,
        orderMeal = req.body.orderMeal,
        email = req.body.email,
        members = req.body.members,
        cuisine = req.body.cuisine;
    var obj = {date:date, mealType:orderMeal, members: members, cuisine: cuisine}
        client.set(email, JSON.stringify(obj));
    //res.send(pages.getQuote);*/
    res.send('success');
});

app.post('/submitGetSlot', function(req, res) {
    var email = req.body.email,
        members = req.body.members;
        //client.set(email, 123);
        client.set(email, members);
    //res.send(members);
    res.redirect('/getSlot');
});

app.post('/submitItemChange', function(req, res) {
    var email = req.body.email,
        members = req.body.members;
        //client.set(email, 123);
        client.set(email, members);
    //res.send(members);
    res.send('success');
});

app.get("/set", function(request, response) {
  keyName++;valName++;
  response.send(client.set('key'+keyName, "User"+valName));
});

app.get("/get", function(request, response) {
  var log = loggr.logs.get("poshfind", "b687eacebeee405cafc202bc350d4f71");
  //console.log('--loggr--', log);
log.events.createEvent().text("this is text2").post();

  //var REDISCLOUD_URL = 'redis-16431.c10.us-east-1-2.ec2.cloud.redislabs.com:16431';
  // res.send(process.env);

//var client = redis.createClient('redis://rediscloud:vWISiXr6xai89eidZYXjM0OK3KeXfkPU@redis-16431.c10.us-east-1-2.ec2.cloud.redislabs.com:16431', {no_ready_check: true});


// res.send(client);
// client.set("welcome_msg", "Hello from Redis!");
  client.get("key1", function (err, reply) {
    if (reply != null) {
      response.send(reply);
    } else {
      response.send("key not found");
    }
  });
});

app.get("/redis", function(request, response) {
  response.send('redis test...');
});

app.get('/v2', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/onboard/step2', function(request, response) {
  response.writeHead(301,
  {Location: '/'}
);
response.end();
});

httpServ.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
