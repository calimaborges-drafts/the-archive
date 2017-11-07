var express = require('express');
var fs = require('fs');
var _ = require('underscore');
var uuid = require('uuid');

var app = express();
var write_token = null;
var assigned_tokens = {};

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

var clean_old_tokens = function() {
	var second = 1000;
	_.each(assigned_tokens, function(token_date, token, list) {
		console.log("%d", _.now() - token_date.getTime());
		if ( (_.now() - token_date.getTime()) > (5 * second) ) {
			console.log("cleaning %s", token);
			if (token == write_token) {
				write_token = null;
			}
			delete list[token];
		}
	});
};

setInterval(clean_old_tokens, 3000);

app.post('/status', function(req, res) {
	if (!_.has(req.body, 'token') || !req.body.token || !_.has(assigned_tokens, req.body.token)) {
		var token = uuid.v4();
	} else {
		var token = req.body.token;
	}

	assigned_tokens[token] = new Date();
	if (!write_token) {
		write_token = token;
	}
	var status = write_token == token ? 'w':'r';

	res.send({token: token, status: status});
});

app.post('/save', function(req, res) {
	fs.writeFile('buffer.txt', req.body.text, function(err) {
		if (!err) res.send('OK');
	});
});

app.get('/load', function(req, res) {
	fs.readFile('buffer.txt', function(err, data) {
		if (!err) res.send(data);
	});
});

var server = app.listen(3000, function() {
	console.log("Listening on port %d", server.address().port);
});