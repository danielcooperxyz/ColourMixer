var express = require('express');
var fs = require('fs');
var app = express();

app.use('/src', express.static('src'));
app.use('/styles', express.static('styles'));

app.get("/", returnView(__dirname + "/new-index.html"));

app.listen(9001, function() {
  console.log('Server running at http://127.0.0.1:9001/');
});

function returnView(filename) {
	return function(req, res) {
		res.set('Content-Type', 'text/html');
		res.sendFile(filename);
	}
}