var dpr;
var colors = [];

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

function setNewColors(steps) {
	for (let i = 0; i < steps; i++) {
		let temp = [];
		for (let j = 0; j < steps; j++) {
			temp.push(generateRandomColor());
		}
		colors.push(temp);
	}
}

function generateRandomColor() {
	let maxVal = 0xffffff;
	let randomNumber = Math.random() * maxVal;
	randomNumber = Math.floor(randomNumber);
	randomNumber = randomNumber.toString(16);
	let randColor = randomNumber.padStart(6, 0);
	return `#${randColor.toUpperCase()}`;
}

function setupCanvas(canvas) {
	// Get the device pixel ratio, falling back to 1.
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
