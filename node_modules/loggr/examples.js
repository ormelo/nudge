var loggr = require("./lib/loggr");

var log = loggr.logs.get("mylog", "XXXXXXXXXXXXXXXXXXX");

log.events.createEvent().text("this is text").post();
log.events.createEvent()
  .text("my first event")
  .link("http://loggr.net")
  .tags("tag1 tag2")
  .source("jsfiddle")
  .user("davew")
  .value(35.50)
  .data("<b>V8 version:</b> {0}<br/><b>on:</b> {1}", process.versions.v8, new Date())
  .dataType(Loggr.dataType.html)
  .geo(40.1203, -76.2944)
  .post();

log.events.query("GET events TAKE 10 SORT created DESC", function (err, evs) {
  console.log(evs.length);
});

log.events.get("507daebd4e1feb1624007880", function (err, ev) {
  console.log(ev.text);
});

log.events.getData("507daebd4e1feb1624007881", function (err, data) {
  console.log(data);
});

log.trackUser("nobody", "nobody@here.com");

