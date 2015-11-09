var blockspring = require('blockspring');
var http = require("https");

var options = {
  "method": "GET",
  "hostname": "app.vindi.com.br",
  "port": null,
  "path": "/api/v1/",
  "headers": {
    "authorization": "Basic c2RnM0F6bkV2VHBRVlVtTzhJX2tGWjJJYjd2Q3NsMjY6",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

// req.end();


blockspring.define(function(request, response) {
	resource = request.params.resource;
	options.path += resource;
	response.addOutput (options);
	response.end();

	// response.addOutput('intro', name + age);
	// response.end();
});