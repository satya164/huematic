/* jshint browser: true */
/* global $, p */

// Self executing function
var Palette = (function() {
	var utils = {
		rgbToHsl: function(r, g, b) {
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
		},

		hue2rgb: function(p, q, t) {
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
		},

		hslToRgb: function(h, s, l) {
			var r, g, b;

			if (s === 0) {
				r = g = b = l; // achromatic
			} else {


				var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				var p = 2 * l - q;
				r = utils.hue2rgb(p, q, h + 1 / 3);
				g = utils.hue2rgb(p, q, h);
				b = utils.hue2rgb(p, q, h - 1 / 3);
			}

			return {
				r: Math.round(r * 255),
				g: Math.round(g * 255),
				b: Math.round(b * 255)
			};
		},

		hexToRgb: function(hex) {
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
				r: r,
				g: g,
				b: b
			};
		},

		rgbToHex: function(rgb) {
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
		},

		rgbToObj: function(str) {
			var RGBArr = str.replace(/[rgb()]/g, "").split(',').map(function (c) {
				return parseInt(c);
			});
			return {
				r: RGBArr[0],
				g: RGBArr[1],
				b: RGBArr[2]
			};
		}
	};

	var currentHex;
	return function() {
		var self = this;

		self.getPalettes = function(color) {
			var palettes = {};

			if(typeof p === "object"){
				for(var i in p){
					palettes[i.charAt(0).toUpperCase() + i.slice(1)] = p[i](color);
				}
			}

			return palettes;
		};

		self.parseColor = function(colorObj) {
			if (typeof colorObj === "object"){
				return "rgb(" + colorObj.r + "," + colorObj.g + "," + colorObj.b + ")";
			}
		};

		self.getColor = function(position, canvas) {
			var imageData = $(canvas).get(0).getContext("2d").getImageData(position[0], position[1], 1, 1).data,
				color = "rgb(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ")";

			return {
				r: imageData[0],
				g: imageData[1],
				b: imageData[2]
			};
		};

		self.getPosition = function(event) {
			var $element = $(event.currentTarget),
				startX = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
				startY = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY,
				posX = startX - $element.offset().left,
				posY = startY - $element.offset().top;

			return [ posX, posY ];
		};

		self.showPicker = function() {
			var $container = $(".picker-container"),
				$picker = $container.find(".picker-item-color"),
				$value = $container.find(".picker-item-value"),
				$canvas = $picker.find("canvas"),
				sheet, img, gradient;

			sheet = $canvas.get(0).getContext("2d");
			img = new Image();
			gradient = sheet.createLinearGradient(0, 0, $canvas.width(), 0);

			sheet.canvas.width = $canvas.parent().innerWidth();

			gradient.addColorStop(0,    "rgb(255,   0,   0)");
			gradient.addColorStop(0.15, "rgb(255,   0, 255)");
			gradient.addColorStop(0.33, "rgb(0,     0, 255)");
			gradient.addColorStop(0.49, "rgb(0,   255, 255)");
			gradient.addColorStop(0.67, "rgb(0,   255,   0)");
			gradient.addColorStop(0.84, "rgb(255, 255,   0)");

			sheet.fillStyle = gradient;
			sheet.fillRect(0, 0, sheet.canvas.width, sheet.canvas.height);

			gradient = sheet.createLinearGradient(0, 0, 0, $canvas.height());
			gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
			gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
			gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
			gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");

			sheet.fillStyle = gradient;
			sheet.fillRect(0, 0, sheet.canvas.width, sheet.canvas.height);

			$canvas.on("click", function(e) {
				var color = self.parseColor(self.getColor(self.getPosition(e), $canvas));

				self.setColor(color);
			});

			$value.on("DOMSubtreeModified input paste", function() {
				var color = $(this).text();

				if (color) {
					self.setColor(self.parseColor(utils.hexToRgb(color)), false);
				}
			});
		};

		self.setColor = function(color, updatefield) {
			var palettes = self.getPalettes(utils.rgbToObj(color)),
				$container = $(".palettes-container"),
				$value = $(".picker-container").find(".picker-item-value"),
				$palette = $(".palettes-container").find(".palettes");

			if (currentHex === utils.rgbToHex(utils.rgbToObj(color))) {
				return;
			} else {
				currentHex = utils.rgbToHex(utils.rgbToObj(color));
			}
			if ($palette.length) {
				$palette.remove();
			}

			$palette =  $("<div>").addClass("palettes");
			$palette.appendTo($container);

			if (updatefield !== false) {
				$value.text(utils.rgbToHex(utils.rgbToObj(color)));
			}

			for (var i in palettes){
				self.addPalette(i, palettes[i]);
			}
		};

		self.addPalette = function(type, colors) {
			var $palette = $(".palettes-container").find(".palettes"),
				$list = $("<ul>");

			if (colors instanceof Array) {
				for (var i = 0, l = colors.length; i < l; i++) {
					$("<li>").css({
						background: self.parseColor(colors[i])
					})
					.text(utils.rgbToHex(colors[i]))
					.appendTo($list);
				}

				$palette.append(
					$("<h3>" + type + "</h3>"),
					$list
				);
			} else {
				return;
			}
		};
	};
}());

var palette = new Palette();

palette.showPicker();
