/* global Pallette */


function getRandom() {
	return parseInt(Math.random() * 256);
}

function Pallette() {}

Pallette.prototype.randomizeMix = function (rgbVal) {
	/*
		Input sample: {r: 234, b: 216, g: 110}
	*/
	var red = getRandom();
	var green = getRandom();
	var blue = getRandom();

	// mix colors 
	if (rgbVal !== null) {
		red = parseInt((red + rgbVal.r) / 2);
		green = parseInt((green + rgbVal.g) / 2);
		blue = parseInt((blue + rgbVal.b) / 2);
	}

	return {
		r: red,
		g: green,
		b: blue
	};
};

Pallette.prototype.constantMix = function (rgbVal, cmix) {
	/*
		Input sample: {r: 234, b: 216, g: 110}
	*/
	var red, green, blue;
	if (cmix) {
		red = cmix.r || 216;
		green = cmix.g || 115;
		blue = cmix.b || 95;
	}

	// mix colors 
	if (rgbVal !== null) {
		red = parseInt((red + rgbVal.r) / 2);
		green = parseInt((green + rgbVal.g) / 2);
		blue = parseInt((blue + rgbVal.b) / 2);
	}

	return {
		r: red,
		g: green,
		b: blue
	};
};