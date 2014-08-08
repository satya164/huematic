Pallette.prototye.monochromatic = function (rgb,num_col) {
	var red = rgb.r;
    var green = rgb.g;
    var blue = rgb.b;
    
    var step = 255/num_col;
    
    var color_arr = [{rgb.r,rgb.g,rgb.b}];
    var i;
    for(i=0;i<num_col;i++)
    {
        if(red>255 || green>255 || blue>255) 
        {
            step=-step;
            red = rgb.r;
            green = rgb.g;
            blue = rgb.b;   
        }
        
        red=red+step;
        green=green+step;
        blue=blue+step;
        
        color_arr.push({red,green,blue});
    }
    
    return color_arr;
};

Pallette.prototye.monochromatic = function (rgb) {
	var red = rgb.r;
    var green = rgb.g;
    var blue = rgb.b;
    
    var step = 51;
    var i;
    for(i=0 ; i<5 ; i++)
    {
        if(red>255 || green>255 || blue>255) 
        {
            step=-step;
            red = rgb.r;
            green = rgb.g;
            blue = rgb.b;   
        }
        
        red=red+step;
        green=green+step;
        blue=blue+step;
        
        color_arr.push({red,green,blue});
    }
    
    return color_arr; blue;
    }];
};