var http = require("http");

var Loggr = {};

Loggr.logFactory = function () {
    this.get = function (logKey, apiKey) {
        return new Loggr.log(logKey, apiKey);
    };
};

Loggr.eventFactory = function (log) {
    this.log = log;
    var base = this;
    this.query = function (lql, callback) {
      var client = new Loggr.logClient(this.log);
      client.queryEvents(lql, callback);
    };
    this.get = function (id, callback) {
      var client = new Loggr.logClient(this.log);
      client.getEvent(id, callback);
    };
    this.getData = function (id, callback) {
      var client = new Loggr.logClient(this.log);
      client.getData(id, callback);
    };
    this.createEvent = function () {
        return new Loggr.fluentEvent(base.log);
    };
};

Loggr.log = function (logKey, apiKey) {
    this.logKey = logKey;
    this.apiKey = apiKey;
    this.events = new Loggr.eventFactory(this);

    this.trackUser = function (username, email, page) {
        var client = new Loggr.logClient(this);
        client.trackUser(username, email, page);
    };
};

Loggr.fluentEvent = function (log) {
    this.event = new Loggr.event();
    this.log = log;

    this.clear = function () {
        this.event = new Loggr.event();
        return this;
    };

    this.post = function () {
        var client = new Loggr.logClient(this.log);
        client.postEvent(this.event);
        return this;
    };

    this.text = function (text) {
        var formatted = text.replace("$$", this.event.text);
        for (var i = 1; i < arguments.length; i++) formatted = formatted.replace("{" + (i - 1) + "}", arguments[i]);
        this.event.text = formatted;
        return this;
    };

    this.addText = function (text) {
        var formatted = text.replace("$$", this.event.text);
        for (var i = 1; i < arguments.length; i++) formatted = formatted.replace("{" + (i - 1) + "}", arguments[i]);
        this.event.text += formatted;
        return this;
    };

    this.link = function (link) {
        var formatted = link.replace("$$", this.event.link);
        for (var i = 1; i < arguments.length; i++) formatted = formatted.replace("{" + (i - 1) + "}", arguments[i]);
        this.event.link = formatted;
        return this;
    };

    this.source = function (source) {
        var formatted = source.replace("$$", this.event.source);
        for (var i = 1; i < arguments.length; i++) formatted = formatted.replace("{" + (i - 1) + "}", arguments[i]);
        this.event.source = formatted;
        return this;
    };

    this.user = function (user) {
        var formatted = user.replace("$$", this.event.user);
        for (var i = 1; i < arguments.length; i++) formatted = formatted.replace("{" + (i - 1) + "}", arguments[i]);
        this.event.user = formatted;
        return this;
    };

    this.tags = function (tags) {
        var newTags = new Array();
        //handle all arguments passed in
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            // if the input is an array, add values to our new tag array
            if (arg.constructor.toString().indexOf("Array") != -1) {
                for (var j = 0; j < tags.length; j++)
                    this._addRange(newTags, this._tokenizeAndFormatTags(tags[j]));
            } else {
                this._addRange(newTags, this._tokenizeAndFormatTags(arg));
            }
        }
        this.event.tags = newTags;
        return this;
    };

    this.addTags = function (tags) {
        var newTags = new Array();
        //handle all arguments passed in
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            // if the input is an array, add values to our new tag array
            if (arg.constructor.toString().indexOf("Array") != -1) {
                for (var j = 0; j < tags.length; j++)
                    this._addRange(newTags, this._tokenizeAndFormatTags(tags[j]));
            } else {
                this._addRange(newTags, this._tokenizeAndFormatTags(arg));
            }
        }
        this._addRange(this.event.tags, newTags);
        return this;
    };

    this.value = function (value) {
        this.event.value = value;
        return this;
    };

    this.valueClear = function () {
        this.event.value = null;
        return this;
    };

    this.data = function (data) {
        var formatted = data.replace("$$", this.event.data);
        for (var i = 1; i < arguments.length; i++) formatted = formatted.replace("{" + (i - 1) + "}", arguments[i]);
        this.event.data = formatted;
        return this;
    };

    this.addData = function (data) {
        var formatted = data.replace("$$", this.event.data);
        for (var i = 1; i < arguments.length; i++) formatted = formatted.replace("{" + (i - 1) + "}", arguments[i]);
        this.event.data += formatted;
        return this;
    };

    this.dataType = function (dataType) {
        this.event.dataType = dataType;
        return this;
    };

    this.geo = function (arg1, arg2) {
        if (arguments.length > 1) {
            this.event.geo = "" + arg1 + "," + arg2;
        } else {
            this.event.geo = arg1
        }
        return this;
    };

    this._addRange = function (toArray, fromArray) {
        for (var j = 0; j < fromArray.length; j++) {
            toArray.push(fromArray[j]);
        }
    };

    this._tokenizeAndFormatTags = function (tags) {
        var results = new Array();
        var tokens = tags.split(" ");
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i].replace(" ", "");
            var regexp = new RegExp('[^a-zA-Z0-9\\-]', 'gi');
            token = token.replace(regexp, "");
            if (token.length > 0) results.push(token);
        }
        return results;
    };
};

Loggr.dataType = { "html": 0, "plaintext": 1 };

Loggr.event = function () {
    this.text = null;
    this.link = null;
    this.source = null;
    this.user = null;
    this.tags = null;
    this.value = null;
    this.data = null;
    this.dataType = Loggr.dataType.plaintext;
    this.geo = null;
};

Loggr.logClient = function (log) {
    this.log = log;

    this.postEvent = function (event) {
      var data = "";
      if (event.text != null) data += "text=" + encodeURIComponent(event.text);
      if (event.link != null) data += "&link=" + encodeURIComponent(event.link);
      if (event.source != null) data += "&source=" + encodeURIComponent(event.source);
      if (event.user != null) data += "&user=" + encodeURIComponent(event.user);
      if (event.tags != null) data += "&tags=" + encodeURIComponent(event.tags.join(" "));
      if (event.value != null) data += "&value=" + encodeURIComponent(event.value);
      var dataType = "";
      if (event.dataType == Loggr.dataType.html) dataType = "@html\r\n";
      if (event.data != null) data += "&data=" + dataType + encodeURIComponent(event.data);
      if (event.geo != null) data += "&geo=" + encodeURIComponent(event.geo);
      data += "&apikey=" + this.log.apiKey;
      this.request("post", "/1/logs/" + this.log.logKey + "/events", "POST", data);
    };

    this.trackUser = function (username, email, page) {
      if (username == undefined || username == "") throw "username is not optional";
      if (page == undefined) page = "";
      var data = "user=" + encodeURIComponent(username) + "&page=" + encodeURIComponent(page);
      if (email != undefined) data += "&email=" + encodeURIComponent(email);
      data += "&apikey=" + this.log.apiKey;
      this.request("post", "/1/logs/" + this.log.logKey + "/users", "POST", data);
    };

    this.queryEvents = function (lql, callback) {
      var data = "query=" + encodeURIComponent(lql) + "&apikey=" + this.log.apiKey;
      this.request("api", "/1/logs/" + this.log.logKey + "/query", "GET", data, function (err, data) {
        if (callback) callback(err, JSON.parse(data));
      });
    };

    this.getEvent = function (id, callback) {
      var data = "apikey=" + this.log.apiKey;
      this.request("api", "/1/logs/" + this.log.logKey + "/events/" + id, "GET", data, function (err, data) {
        if (callback) callback(err, JSON.parse(data));
      });
    };

    this.getData = function (id, callback) {
      var data = "apikey=" + this.log.apiKey;
      this.request("api", "/1/logs/" + this.log.logKey + "/events/" + id + "/data", "GET", data, function (err, data) {
        if (callback) callback(err, data);
      });
    };

    this.request = function (host, path, method, data, callback) {
      if (method == "GET") path += "?" + data;
      var options = {
        host: host + ".loggr.net",
        port: 80,
        path: path,
        method: method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": data.length
        }
      };

      var body = "";
      var req = http.request(options);
      if (callback) {
        req.on("response", function (res) {
          res.setEncoding('utf8');
          res.on("data", function (chunk) {
            body += chunk;
          });
          res.on("end", function () {
            if (res.statusCode != 200) {
              callback("Error: response status " + res.statusCode, null);
            } 
            else {
              callback(null, body);
            }
          });
        });
      }
      req.write(data);
      req.end();
    };
};

Loggr.jsonp = {
    callbackCounter: 0,

    fetch: function (url, callback) {
        var fn = 'JSONPCallback_' + this.callbackCounter++;
        window[fn] = this.evalJSONP(callback);
        url = url.replace('=?', '=' + fn);
        var scriptTag = document.createElement('SCRIPT');
        scriptTag.src = url;
        document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
    },

    evalJSONP: function (callback) {
        var base = this;
        return function (data) {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].created) {
                        data[i].created = base.parseDate(data[i].created);
                    }
                }
            }
            callback(data);
        }
    },

    parseDate: function (dt) {
        var match = dt.match(/^\/Date\((\S+)\)\/$/);
        return new Date(parseInt(match[1]));
    }
};

Loggr.logs = new Loggr.logFactory();

// module exporting
module.exports = {
  logs: Loggr.logs
};
