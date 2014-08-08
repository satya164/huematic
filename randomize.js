/* global Pallette */
function getRandom() {
	return parseInt(Math.random() * 256);
}

function Pallette() {}

Pallette.prototype.randomize = function(rgbVal) {
	/*
		Input sample: {r: 234, b: 216, g: 110}
	*/
	var red = getRandom();
	var green = getRandom();
	var blue = getRandom();
	
	// mix colors 
	if (rgbVal !== null) {
		red = (red + rgbVal.r) / 2;
		green = (green + rgbVal.g) / 2;
		blue = (blue + rgbVal.b) / 2;
	}
	
	return {
		r: red, g: green, b: blue
	};
};