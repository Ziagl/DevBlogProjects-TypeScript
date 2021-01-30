var webglEngine;
(function (webglEngine) {
    /**
     * this represents a vector in 2d space
     */
    var Vector2 = /** @class */ (function () {
        /**
         * creates new vector with given coordinates
         * @param x the x coordinate
         * @param y the y coordinate
         */
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(Vector2.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * converts this vector into an array of numbers
         */
        Vector2.prototype.toArray = function () {
            return [this._x, this._y];
        };
        /**
         * converts this vector into a Float32Array
         */
        Vector2.prototype.toFloat32Array = function () {
            return new Float32Array(this.toArray());
        };
        return Vector2;
    }());
    webglEngine.Vector2 = Vector2;
})(webglEngine || (webglEngine = {}));
