var webglEngine;
(function (webglEngine) {
    /**
     * this represents a vector in 3d space
     */
    var Vector3 = /** @class */ (function () {
        /**
         * creates new vector with given coordinates
         * @param x the x coordinate
         * @param y the y coordinate
         * @param z the z coordinate
         */
        function Vector3(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this._x = x;
            this._y = y;
            this._z = z;
        }
        Object.defineProperty(Vector3.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                this._z = value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * converts this vector into an array of numbers
         */
        Vector3.prototype.toArray = function () {
            return [this._x, this._y, this._z];
        };
        /**
         * converts this vector into a Float32Array
         */
        Vector3.prototype.toFloat32Array = function () {
            return new Float32Array(this.toArray());
        };
        return Vector3;
    }());
    webglEngine.Vector3 = Vector3;
})(webglEngine || (webglEngine = {}));
