"use strict";
var rogue;
(function (rogue) {
    var input;
    (function (input) {
        var Keyboard;
        (function (Keyboard) {
            Keyboard["LEFT"] = "ArrowLeft";
            Keyboard["UP"] = "ArrowUp";
            Keyboard["RIGHT"] = "ArrowRight";
            Keyboard["DOWN"] = "ArrowDown";
        })(Keyboard = input.Keyboard || (input.Keyboard = {}));
        ;
        input.Directions = {
            UP: new rogue.geom.Point(0, -1),
            DOWN: new rogue.geom.Point(0, 1),
            RIGHT: new rogue.geom.Point(1, 0),
            LEFT: new rogue.geom.Point(-1, 0)
        };
        var Input = /** @class */ (function () {
            function Input() {
                var _this = this;
                this.newDirection = new rogue.geom.Point(0, 0);
                window.addEventListener("keyup", function (event) { return _this.keyup(event); }, false);
            }
            Input.prototype.keyup = function (event) {
                event.stopPropagation();
                event.preventDefault();
                var keyCode = event.key;
                switch (keyCode) {
                    case Keyboard.UP:
                        this.newDirection = input.Directions.UP;
                        break;
                    case Keyboard.RIGHT:
                        this.newDirection = input.Directions.RIGHT;
                        break;
                    case Keyboard.DOWN:
                        this.newDirection = input.Directions.DOWN;
                        break;
                    case Keyboard.LEFT:
                        this.newDirection = input.Directions.LEFT;
                        break;
                }
            };
            Input.prototype.clear = function () {
                this.newDirection = new rogue.geom.Point(0, 0);
            };
            return Input;
        }());
        input.Input = Input;
    })(input = rogue.input || (rogue.input = {}));
})(rogue || (rogue = {}));
//# sourceMappingURL=input.js.map