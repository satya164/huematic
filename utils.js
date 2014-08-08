function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
		case r:
			h = (g - b) / d + (g < b ? 6 : 0);
			break;
		case g:
			h = (b - r) / d + 2;
			break;
		case b:
			h = (r - g) / d + 4;
			break;
		}
		h /= 6;
	}

	return {
		h: h,
		s: s,
		l: l
	};
}


function hue2rgb(p, q, t) {
	if (t < 0) {
		t += 1;
	}
	if (t > 1) {
		t -= 1;
	}
	if (t < 1 / 6) {
		return p + (q - p) * 6 * t;
	}
	if (t < 1 / 2) {
		return q;
	}
	if (t < 2 / 3) {
		return p + (q - p) * (2 / 3 - t) * 6;
	}
	return p;
}

function hslToRgb(h, s, l) {
	var r, g, b;

	if (s === 0) {
		r = g = b = l; // achromatic
	} else {


		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255)
	};
}

function hexToRgb(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
		result, r, g, b;
	hex = hex.replace(shorthandRegex, function (r, g, b) {
		return r + r + g + g + b + b;
	});
	result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	r = parseInt(result[1], 16);
	g = parseInt(result[2], 16);
	b = parseInt(result[3], 16);
	return {
		r:r, g:g, b:b
	};
}

function rgbToHex(rgb) {
	rgb = [rgb.r, rgb.g, rgb.b];
	var hex = '',
		h, i, c;
	for (i = 0; i < rgb.length; i += 1) {
		c = rgb[i];
		h = c.toString(16);
		h = (h.length === 1) ? "0" + h : h;
		hex += h;
	}
	return '#' + hex;
}

function rgbToObj(str) {
	var RGBArr = str.replace(/[rgb()]/g, "").split(',').map(function(c){
		return parseInt(c);
	});
	return {
		r: RGBArr[0],
		g: RGBArr[1],
		b: RGBArr[2]
	}
}