const canvas = document.getElementById("graphr-canvas");
// Rename til "context"?
const context = canvas.getContext("2d");

const height = canvas.clientHeight;
const width = canvas.clientWidth;

// 100%
let zoom = 100;
let position = [-2, -2];

const loop = setInterval(function(){
	// Draw x and y-axis
	context.beginPath();
	context.moveTo(-position[0]*zoom, 0);
	context.lineTo(-position[0]*zoom, height);
	context.beginPath();
	context.moveTo(0,-position[1]*zoom);
	context.lineTo(width,-position[1]*zoom);
	console.log(width + " - " + (-position[1]*zoom));
	
	context.stroke();

}, 500);
