var blockspring = require('blockspring');
var querystring = require('querystring');
var https = require('https');
var Promise = require('bluebird');

function performRequest(resource, data, success) {
	
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
	options.path+=resource;

	var req = https.request(options, function(res) {
		res.setEncoding('utf-8');

		var responseString = '';

		res.on('data', function(data) {
			responseString += data;
		});

		res.on('end', function() {
			console.log(responseString);
			var responseObject = JSON.parse(responseString);
			console.log('sucesso:'+responseObject.toString());
			success(responseObject);
		});
	});

	
	req.end();
}


blockspring.define(function(request, response) {
	var resource = request.params.resource;
	
	// promise = new Promise (
	// 	performRequest(resource, null, function(data) {
	// 			response.addOutput(resource, data);
	// 									}
	// 	)
	// )
	// .then (
	// 	response.end
	// );

	performRequest(resource, null, function(data) {
				response.addOutput(resource, data);
				response.end();

	});
	
	
});

