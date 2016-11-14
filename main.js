const canvas = document.getElementById("graphr-canvas");
// Rename til "context"?
const context = canvas.getContext("2d");

const height = canvas.clientHeight;
const width = canvas.clientWidth;

// 100%
let zoom = 100;
let position = {
	x: 0,
	y: 0
};
let isDragging = false;
let lastPosition = {
	x: 0,
	y: 0
};
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
	context.moveTo(-position.x*zoom, 0);
	context.lineTo(-position.x*zoom, height);
	context.moveTo(0, height-position.y*zoom);
	context.lineTo(width, height-position.y*zoom);
	context.stroke();
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

		position.x += (lastPosition.x - event.clientX)/100;
		position.y += (lastPosition.y - event.clientY)/100;

		console.log(position);
	}

	lastPosition.x = event.clientX;
	lastPosition.y = event.clientY;

});