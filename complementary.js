Pallette.prototye.complementary = function (rgb) {
	var red = rgb.r;
    var green = rgb.g;
    var blue = rgb.b;
    
    return [{
        r: 255 - red;
        g: 255 - green;
        b: 255 - blue;
    }];
};