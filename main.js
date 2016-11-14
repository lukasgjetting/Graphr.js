const canvas = document.getElementById("graphr-canvas");
// Rename til "context"?
const context = canvas.getContext("2d");

const height = canvas.clientHeight;
const width = canvas.clientWidth;

// 100%
let zoom = 100;
let isDragging = false;
let position = { x: 1, y: 1 };
let lastPosition = { x: 0, y: 0 };

let points = [];

const loop = setInterval(function(){
	update();
	render();
}, 1000/60);

function update() {

}

function render() {
	context.clearRect(0, 0, width, height);

	// Draw x and y-axis
	context.beginPath();
	context.moveTo(position.x*zoom, 0);
	context.lineTo(position.x*zoom, height);
	context.moveTo(0, height-position.y*zoom);
	context.lineTo(width, height-position.y*zoom);
	context.stroke();

	// Draw points
	for(let i = 0; i < points.length; i++) {
		context.fillRect(
			(points[i].x+position.x)*zoom - 3,
			height-(points[i].y+position.y)*zoom - 3,
			6, 6);
	}
}

function addPoint(x, y) {
	points.push(new Point(x, y));
}

function parseScript(script) {

	// A valid command looks like this:
	// command:args (comma-seperated arguments)

	let parts = script.replace(" ", "").split(":");

	if(parts.length != 2) {
		alert("That's not a real command!");
		return false;
	}

	let args = parts[1].split(",");

	// Command
	switch(parts[0]) {
		case "point":
			if (args.length != 2) {
				alert("Wrong amount of arguments for a point");
				return false;
			} else {
				addPoint(parseInt(args[0]), parseInt(args[1]));
			}
		break;
	}

	return true;
}

// Event listeners
canvas.addEventListener("mousedown", function() {
	isDragging = true;
});
canvas.addEventListener("mouseup", function() {
	isDragging = false;
});
canvas.addEventListener("mousemove", function(event){ 
	if(isDragging) {
		position.x -= (lastPosition.x - event.clientX)/zoom;
		position.y += (lastPosition.y - event.clientY)/zoom;
	}

	lastPosition.x = event.clientX;
	lastPosition.y = event.clientY;
});

document.getElementById("command-line").addEventListener("keypress", function(event) {
	if(event.key == "Enter") {
		if(parseScript(this.value)) {
			this.value = "";
		}
	}
});

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}