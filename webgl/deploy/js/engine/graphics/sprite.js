"use strict";
var webglEngine;
(function (webglEngine) {
    var Sprite = /** @class */ (function () {
        function Sprite(name, width, height) {
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
            this.position = new webglEngine.Vector3();
            this._name = name;
            this._width = width;
            this._height = height;
            this._buffer = this.load();
        }
        Sprite.prototype.load = function () {
            var buffer = new webglEngine.GLBuffer(3);
            // add attributes
            var positionAttribute = new webglEngine.AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.offset = 0;
            positionAttribute.size = 3; // x, y, z
            buffer.addAttributeLocation(positionAttribute);
            // add vertex data
            var vertices = [
                // x y z
                0, 0, 0,
                this._width, 0, 0,
                0, this._height, 0,
                0, this._height, 0,
                this._width, 0, 0,
                this._width, this._height, 0
            ];
            buffer.pushBackData(vertices);
            buffer.upload();
            buffer.unbind();
            return buffer;
        };
        Sprite.prototype.update = function (time) {
        };
        Sprite.prototype.draw = function () {
            this._buffer.bind();
            this._buffer.draw();
        };
        return Sprite;
    }());
    webglEngine.Sprite = Sprite;
})(webglEngine || (webglEngine = {}));
