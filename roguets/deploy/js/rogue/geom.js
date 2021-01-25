"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var rogue;
(function (rogue) {
    var geom;
    (function (geom) {
        var Point = /** @class */ (function () {
            function Point(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            Point.prototype.clone = function () {
                return new Point(this.x, this.y);
            };
            return Point;
        }());
        geom.Point = Point;
        var Rectangle = /** @class */ (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height) {
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                var _this = _super.call(this, x, y) || this;
                _this.width = width;
                _this.height = height;
                return _this;
            }
            return Rectangle;
        }(Point));
        geom.Rectangle = Rectangle;
    })(geom = rogue.geom || (rogue.geom = {}));
})(rogue || (rogue = {}));
//# sourceMappingURL=geom.js.map