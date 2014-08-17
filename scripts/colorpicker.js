/* jshint browser: true */
/* global $, Color */

var Huematic = (function() {
    var currentHex;

    return function() {
        var _this = this;

        _this.getColor = function(position, canvas) {
            var imageData = $(canvas).get(0).getContext("2d").getImageData(position[0], position[1], 1, 1).data,
                color = "rgb(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ")";

            return color;
        };

        _this.getPosition = function(event) {
            var $element = $(event.currentTarget),
                startX = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
                startY = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY,
                posX = startX - $element.offset().left,
                posY = startY - $element.offset().top;

            return [ posX, posY ];
        };

        _this.drawSheet = function(sheet, width, height) {
            var gradient = sheet.createLinearGradient(0, 0, width, 0);

            sheet.canvas.width = width;
            sheet.canvas.height = height;

            gradient.addColorStop(0.00, "rgb(255,   0,   0)");
            gradient.addColorStop(0.15, "rgb(255,   0, 255)");
            gradient.addColorStop(0.33, "rgb(0,     0, 255)");
            gradient.addColorStop(0.49, "rgb(0,   255, 255)");
            gradient.addColorStop(0.67, "rgb(0,   255,   0)");
            gradient.addColorStop(0.84, "rgb(255, 255,   0)");
            gradient.addColorStop(1.00, "rgb(255,   0,   0)");

            sheet.fillStyle = gradient;
            sheet.fillRect(0, 0, sheet.canvas.width, sheet.canvas.height);

            gradient = sheet.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
            gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");

            sheet.fillStyle = gradient;
            sheet.fillRect(0, 0, sheet.canvas.width, sheet.canvas.height);
        };

        _this.showPicker = function() {
            var $container = $(".picker-container"),
                $picker = $container.find(".picker-item-color"),
                $value = $container.find(".picker-item-value"),
                $canvas = $picker.find("canvas"),
                $parent = $canvas.parent(),
                sheet, gradient;

            sheet = $canvas.get(0).getContext("2d");

            _this.drawSheet(sheet, $parent.innerWidth(), $parent.innerHeight());

            $(window).on("resize", function() {
                clearTimeout($(this).data("resizeTimer"));

                $(this).data("resizeTimer", setTimeout(function() {
                    $parent = $canvas.parent();

                    _this.drawSheet(sheet, $parent.innerWidth(), $parent.innerHeight());
                }, 250));
            });

            $canvas.on("click", function(e) {
                var color = _this.getColor(_this.getPosition(e), $canvas);

                _this.setColor(color);
            });

            $value.on("DOMSubtreeModified input paste change", function() {
                var color = $(this).val();

                if (color) {
                    _this.setColor(color, false);
                }
            });
        };

        _this.setColor = function(color, updatefield) {
            var c = new Color(color),
                $container = $(".palettes-container"),
                $value = $(".picker-container").find(".picker-item-value"),
                $palette = $(".palettes-container").find(".palettes");

            if (currentHex === c.tohex()) {
                return;
            } else {
                currentHex = c.tohex();
            }

            if ($palette.length) {
                $palette.remove();
            }

            $palette =  $("<div>").addClass("palettes");
            $palette.appendTo($container);

            if (updatefield !== false) {
                $value.focus().val(c.tohex());
            }

            for (var i in c) {
                if ((/.*scheme$/i).test(i) && typeof c[i] === "function") {
                    _this.addPalette(i, c[i]());
                }
            }
        };

        _this.addPalette = function(type, colors) {
            var $palette = $(".palettes-container").find(".palettes"),
                $list = $("<ul>");

            if (colors instanceof Array) {
                for (var i = 0, l = colors.length; i < l; i++) {
                    $("<li>").css({
                        background: colors[i].tohex()
                    })
                    .text(colors[i].tohex())
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

var huematic = new Huematic();

huematic.showPicker();
huematic.setColor("#f06860");
