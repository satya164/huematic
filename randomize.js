/* global Pallette */


function getRandom() {
	return parseInt(Math.random() * 256);
}

function Pallette() {}

Pallette.prototype.randomizeMix = function (rgbVal, noOfColors) {
	/*
		Input sample: {r: 234, b: 216, g: 110}
	*/

	function generate() {
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
	}
	var results = [];

	noOfColors = noOfColors || 5;

	for (var i = 0; i < noOfColors; i++) {
		var n = generate();
		results.push(n);
	}

	results.unshift({
		r: rgbVal.r,
		b: rgbVal.b,
		g: rgbVal.g
	});
	return results;
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

	return [{
		r: rgbVal.r,
		g: rgbVal.b,
		b: rgbVal.b
	}, {
		r: red,
		g: green,
		b: blue
	}];
};

Pallette.prototye.complementary = function (rgb) {
	var red = rgb.r;
	var green = rgb.g;
	var blue = rgb.b;

	return [{
			r: rgb.r, 
			g: rgb.g, 
			b: rgb.b
		},
		{
			r: 255 - red,
			g: 255 - green,
			b: 255 - blue
        }];
};

Pallette.prototype.triad = function (rgbVal) {

};

Pallette.prototype.tetrad = function (rgbVal) {

};

Pallette.prototype.analogous = function (rgbVal) {

};