var socket

function preload() {}

function setup() {
	noCanvas();
}

function draw() {}

$(function () {
	//var input = $("<p>").val("Hello! Please login").appendTo("body")



	/*var input = $("<input>").attr("id", "inputid").val("some text").appendTo("body");
	var button = $("<button>").text("sendData").appendTo("body");
	button.click(function () {
		var data = {
			inputValue: $("#inputid").val()
		};
	console.log("senddata",JSON.stringify(data, null, 4));
		
		socket.emit("clientRequest", data)
	})*/
});
// ######################
// #### SOCKETS: I/O ####
// ######################

socket = io();

socket.on("sendResponse", function (data) {
	console.log("receivedata",JSON.stringify(data, null, 4));

	$("<p>").text(JSON.stringify(data, null, 4)).appendTo("body")
});
