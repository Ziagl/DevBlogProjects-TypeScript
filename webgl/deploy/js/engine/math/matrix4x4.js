var webglEngine;
(function (webglEngine) {
    /**
     * this represents a 4 by 4 matrix
     */
    var Matrix4x4 = /** @class */ (function () {
        /**
         * constructor is private so you can not create your own matrix
         */
        function Matrix4x4() {
            this._data = [];
            this._data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }
        Object.defineProperty(Matrix4x4.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * this creates an identity matrix
         */
        Matrix4x4.identity = function () {
            return new Matrix4x4;
        };
        /**
         * this creates an orthographic matrix for orthographic projection
         * @param left the left border
         * @param right the right border
         * @param bottom the bottom border
         * @param top the top border
         * @param nearClip the near clipping range
         * @param farClip the far clipping range
         */
        Matrix4x4.orthographic = function (left, right, bottom, top, nearClip, farClip) {
            var m = new Matrix4x4();
            var lr = 1.0 / (left - right);
            var bt = 1.0 / (bottom - top);
            var nf = 1.0 / (nearClip - farClip);
            m._data[0] = -2.0 * lr;
            m._data[5] = -2.0 * bt;
            m._data[10] = 2.0 * nf;
            m._data[12] = (left + right) * lr;
            m._data[13] = (top + bottom) * bt;
            m._data[14] = (farClip + nearClip) * nf;
            return m;
        };
        /**
         * creates a translation matrix from a given position as Vector3
         * @param position position in 3d space
         */
        Matrix4x4.translation = function (position) {
            var m = new Matrix4x4();
            m._data[12] = position.x;
            m._data[13] = position.y;
            m._data[14] = position.z;
            return m;
        };
        return Matrix4x4;
    }());
    webglEngine.Matrix4x4 = Matrix4x4;
})(webglEngine || (webglEngine = {}));
