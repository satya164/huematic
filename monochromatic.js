Pallette.prototye.monochromatic = function (rgb,num_col) {
	var red = rgb.r;
    var green = rgb.g;
    var blue = rgb.b;
    
    var step = 255/(num_col+1);
    
    var color_arr = [{rgb.r,rgb.g,rgb.b}];
    var i;
    for(i=1 ; i < num_col/2 ; i++)
    {
        if(red<255 || green<255 || blue<255) 
            break;
        
        red=red+step;
        green=green+step;
        blue=blue+step;
        
        color_arr.push({red,green,blue});
    }
    
    for( i=1 ; i < (num_col-num_col/2) ; i++)
    {
        if(red>0 || green>0 || blue>0) 
            break;
        
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