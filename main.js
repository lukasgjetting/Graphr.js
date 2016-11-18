const canvas = document.getElementById("graphr-canvas");
// Rename til "context"?
const context = canvas.getContext("2d");
context.fillStyle = '#0000ff'; 

const height = canvas.clientHeight;
const width = canvas.clientWidth;

// 100%
let zoom = 50;
let isDragging = false;
let position = { x: 1, y: 1 };
let lastPosition = { x: 0, y: 0 };

let prevCommands = [];
let currentIndex = 0;

let points = [];
let graphs = [];

const loop = setInterval(function(){
	update();
	render();
}, 1000/60);

function update() {

}

function render() {
	context.clearRect(0, 0, width+10, height+10);

	// Draw x and y-axis
	context.beginPath();
	context.moveTo(position.x*zoom, 0);
	context.lineTo(position.x*zoom, height);
	context.moveTo(0, height-position.y*zoom);
	context.lineTo(width, height-position.y*zoom);
	context.stroke();

	// Draw axis-lines
	for (let i = -100; i < 100; i++) {
		if (i === 0) {
            continue;
        }
		context.beginPath();
		context.moveTo(position.x * zoom - 10,
					   height - (position.y + i) * zoom);
		context.lineTo(position.x * zoom + 10,
                       height - (position.y + i) * zoom);
		context.stroke();
	}

	for (let i = -100; i < 100; i++) {
		if (i === 0) {
			continue;
		}
        context.beginPath();
        context.moveTo((position.x + i) * zoom,
                       height - position.y * zoom - 10);
        context.lineTo((position.x + i) * zoom,
                       height - position.y * zoom + 10);
        context.stroke();
    }

	// Draw points
	for(let i = 0; i < points.length; i++) {
		context.fillRect(
			(points[i].x+position.x)*zoom - 3,
			height-(points[i].y+position.y)*zoom - 3,
			6, 6);
	}

	// Draw graphs
	for(let i = 0; i < graphs.length; i++) {
		let x = position.x;
		context.moveTo(0, eval(graphs[i]));
		console.log(graphs[i]);

		for(let j  = 1; j <= 10; j++) {
			x += 1;
			context.lineTo(width/10*j, height - eval(graphs[i]) * zoom);
			console.log(x + " - " + width/10*j + " , " + eval(graphs[i]));
		}
		context.stroke();
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
		alert("Please check your syntax");
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
				addPoint(parseFloat(args[0]), parseFloat(args[1]));
			}	
		break;
		default:
			alert("That's not a valid command");
		break;
	}

	return true;
}

function moveCursorToEnd(input) {
	// Set the cursor at the end of input text
	setTimeout(function(){
		input.setSelectionRange(input.value.length, input.value.length);
	}, 10);
}

// Event listeners
document.addEventListener("mousedown", function() {
	isDragging = true;
	canvas.style.cursor = "pointer";
});
document.addEventListener("mouseup", function() {
	isDragging = false;
	canvas.style.cursor = "auto";
});
canvas.addEventListener("mousemove", function(event){ 
	if(isDragging) {
		position.x -= (lastPosition.x - event.clientX)/zoom;
		position.y += (lastPosition.y - event.clientY)/zoom;
	}

	lastPosition.x = event.clientX;
	lastPosition.y = event.clientY;
});

document.getElementById("command-line").addEventListener("keydown", function(event) {
	if(event.key == "Enter") {
		if(this.value.length > 0) {
			prevCommands.unshift(this.value);
			if(prevCommands.length > 10) {
				prevCommands.shift();
			}

			if(parseScript(this.value)) {
				this.value = "";
			}
		}
		currentIndex = -1;
	} else if(event.key == "ArrowUp"){
		if(currentIndex < prevCommands.length-1) {
			currentIndex++;
			this.value = prevCommands[currentIndex];
		}
		moveCursorToEnd(this);
	} else if(event.key == "ArrowDown") {
		if(currentIndex > 0) {
			currentIndex--;
			this.value = prevCommands[currentIndex];
		} else {
			currentIndex = -1;
			this.value = "";
		}
		moveCursorToEnd(this);
	}
});

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
