

var port = process.env.PORT || 8080;
var express = require("express");
var app = express();
var server = app.listen(port);
app.use(express.static('public')); //makes the folder "public" be used in express
console.log("connected via port " + port);



// ######################
// #### SOCKETS: I/O ####
// ######################

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection); //event listener for a connection

function newConnection(client) { //insert here all functions for a connection
	console.log("new client connected: " + client.id);

	//receiving data from clients:
	client.on("sendAnswerForQuestion22547", checkQuestion2);
	client.on("sendAnswerForQuestion34650", checkQuestion3);
	client.on("sendAnswerForQuestion41247", checkQuestion4);
	client.on("sendAnswerForQuestion53113", checkQuestion5);
}

function checkQuestion2(data) {
	console.log("received q2 data from " + this.client.id + ". Their answer: "+data.answer.toLowerCase());
	if (data.answer.toLowerCase() == 'rfc2324') {
		io.sockets.connected[this.client.id].emit("receiveResponseForQuestion22547", { "answer": "correct", "nextUrl": "question34650.html" });
	}
	else {
		io.sockets.connected[this.client.id].emit("receiveResponseForQuestion22547", { "answer": "incorrect" });
	}
}

function checkQuestion3(data) {
	console.log("received q3 data from " + this.client.id);

	//question 3 has no answer. the next URL is in the code of question 3's HTML site
	io.sockets.connected[this.client.id].emit("receiveResponseForQuestion34650", { "answer": "incorrect" });
}

function checkQuestion4(data) {
	console.log("received q4 data from " + this.client.id + ". Their answer: "+data.answer.toLowerCase());
	if (data.answer.substr(0,4) == '3000') {
		io.sockets.connected[this.client.id].emit("receiveResponseForQuestion41247", { "answer": "correct", "nextUrl": "question53113.html" });
	}
	else {
		io.sockets.connected[this.client.id].emit("receiveResponseForQuestion41247", { "answer": "incorrect" });
	}
}

function checkQuestion5(data) {
	console.log("received q5 data from " + this.client.id + ". Their answer: "+data.answer.toLowerCase());
	if (data.answer.toLowerCase() == 'makezurichrocks!') {
		io.sockets.connected[this.client.id].emit("receiveResponseForQuestion53113", { "answer": "correct", "nextUrl": "/" });
	}
	else {
		io.sockets.connected[this.client.id].emit("receiveResponseForQuestion53113", { "answer": "incorrect" });
	}
}
