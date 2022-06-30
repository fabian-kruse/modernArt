var dpr;
var colors = [];
var colorschemes = {
	spring: {
		weights: [5, 1],
		firstColor: [90, 20, 65, 10, 70, 5],
		secondColor: [0, 10, 70, 10, 70, 5],
	},
	summer: {
		weights: [1, 2],
		firstColor: [0, 5, 90, 10, 65, 5],
		secondColor: [40, 10, 80, 10, 65, 5],
	},
	autumn: {
		weights: [2, 1],
		firstColor: [35, 10, 90, 10, 30, 5],
		secondColor: [40, 8, 55, 10, 45, 5],
	},
	winter: {
		weights: [4, 1],
		firstColor: [0, 10, 90, 10, 30, 5],
		secondColor: [40, 10, 80, 10, 45, 5],
	},
};

var currentColor = 'winter';

//draws rectangles on canvas
function draw() {
	const canvas = document.getElementById('canvas');
	const ctx = setupCanvas(canvas);
	let steps = 10;
	let width = ctx.canvas.width;
	let height = ctx.canvas.height;
	let stepsizeWidth = width / steps;
	let stepsizeHeight = height / steps;
	if (colors.length === 0) {
		setNewColors(steps);
	}
	for (let i = 0; i < steps; i++) {
		for (let j = 0; j < steps; j++) {
			ctx.fillStyle = colors[i][j];
			ctx.fillRect(
				i * stepsizeWidth + (stepsizeWidth * 3) / 8,
				j * stepsizeHeight + stepsizeHeight / 4,
				stepsizeWidth / 4,
				stepsizeHeight / 2
			);
		}
	}
	ctx.scale(1, 1);
}

//handles the refreshButton click
function refreshButtonHandler() {
	clearCanvas();
	setNewColors(10);
	draw();
}

//clears the canvas
function clearCanvas() {
	const canvas = document.getElementById('canvas');
	const ctx = setupCanvas(canvas);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//sets the colors array to a new array of random colors
function setNewColors(steps) {
	colors = [];
	for (let i = 0; i < steps; i++) {
		let temp = [];
		for (let j = 0; j < steps; j++) {
			temp.push(getColor());
		}
		colors.push(temp);
	}
}

//draws a random color in hsl according to a gaussian distribution
//hsl(hue, saturation, lightness)
function getColor() {
	let first =
		'hsl(' +
		drawGaussianSample(220, 10) +
		',' +
		drawGaussianSample(60, 20) +
		'%,' +
		drawGaussianSample(40, 8) +
		'%)';
	let second =
		'hsl(' +
		drawGaussianSample(230, 8) +
		',' +
		drawGaussianSample(100, 10) +
		'%,' +
		drawGaussianSample(70, 5) +
		'%)';
	let weight = getRandomInt(
		colorschemes[currentColor].weights.reduce((a, b) => a + b, 0)
	); //0 or 1

	return weight < colorschemes[currentColor].weights[0] ? first : second;
}

//Uses the Box-Muller transform to generate a gaussian sample
function drawGaussianSample(mean, stdev) {
	let x = 0;
	let y = 0;
	let r = Math.sqrt(-2 * Math.log(Math.random()));
	let theta = 2 * Math.PI * Math.random();
	x = r * Math.cos(theta);
	return mean + stdev * x;
}

//sets up the canvas
function setupCanvas(canvas) {
	dpr = window.devicePixelRatio || 1;
	//set height and width wrt device pixel ratio
	let style_height = +getComputedStyle(canvas)
		.getPropertyValue('height')
		.slice(0, -2);
	let style_width = +getComputedStyle(canvas)
		.getPropertyValue('width')
		.slice(0, -2);
	canvas.setAttribute('height', style_height);
	canvas.setAttribute('width', style_width);
	var ctx = canvas.getContext('2d');
	return ctx;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
