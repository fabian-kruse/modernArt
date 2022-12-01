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
		firstColor: [35, 10, 70, 10, 35, 5],
		secondColor: [40, 8, 55, 10, 55, 5],
	},
	winter: {
		weights: [4, 1],
		firstColor: [220, 10, 60, 10, 60, 8],
		secondColor: [230, 8, 100, 10, 70, 5],
	},
	rainbow: {
		weights: [1, 0],
		firstColor: [0, 10000, 70, 10, 65, 10],
		secondColor: [0, 10, 70, 10, 70, 5],
	},
};

var currentColor = 'rainbow';

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

function changeColorScheme() {
	currentColor = document.getElementById('colorscheme').value;
	console.log(currentColor);
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
	let firstColor = colorschemes[currentColor].firstColor;
	let secondColor = colorschemes[currentColor].secondColor;
	let first = 'hsl(';
	let second = 'hsl(';
	for (let i = 0; i < 3; i++) {
		first += drawGaussianSample(firstColor[i * 2], firstColor[i * 2 + 1]);
		second += drawGaussianSample(secondColor[i * 2], secondColor[i * 2 + 1]);
		if (i > 0) {
			first += '%';
			second += '%';
		}
		if (i < 2) {
			first += ', ';
			second += ', ';
		}
	}
	first += ')';
	second += ')';
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
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	return ctx;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
