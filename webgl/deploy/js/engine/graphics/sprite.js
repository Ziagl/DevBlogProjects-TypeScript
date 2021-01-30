"use strict";
var webglEngine;
(function (webglEngine) {
    /**
     * represents a 2-dimensional sprite which is drawn on the screen.
     */
    var Sprite = /** @class */ (function () {
        /**
         * creates a new sprite
         * @param name the name of this sprite
         * @param textureName the name of the texture to use with this sprite
         * @param width the width of this sprite
         * @param height the height of this sprite
         */
        function Sprite(name, textureName, width, height) {
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
            /**
             * position of this sprite
             */
            this.position = new webglEngine.Vector3();
            this._name = name;
            this._width = width;
            this._height = height;
            this._buffer = this.load();
            this._textureName = textureName;
            this._texture = webglEngine.TextureManager.getTexture(textureName);
        }
        Object.defineProperty(Sprite.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        Sprite.prototype.destroy = function () {
            this._buffer.destroy();
            webglEngine.TextureManager.releaseTexture(this._textureName);
        };
        /**
         * performs loading routines on this sprite
         */
        Sprite.prototype.load = function () {
            var buffer = new webglEngine.GLBuffer(5);
            // add attributes
            var positionAttribute = new webglEngine.AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.offset = 0;
            positionAttribute.size = 3; // x, y, z
            buffer.addAttributeLocation(positionAttribute);
            var texCoordAttribute = new webglEngine.AttributeInfo();
            texCoordAttribute.location = 1;
            texCoordAttribute.offset = 3;
            texCoordAttribute.size = 2; // u, v
            buffer.addAttributeLocation(texCoordAttribute);
            // add vertex data
            var vertices = [
                // x y z u v
                0, 0, 0, 0, 1.0,
                this._width, 0, 0, 1.0, 1.0,
                0, this._height, 0, 0, 0,
                0, this._height, 0, 0, 0,
                this._width, 0, 0, 1.0, 1.00,
                this._width, this._height, 0, 1.0, 0
            ];
            buffer.pushBackData(vertices);
            buffer.upload();
            buffer.unbind();
            return buffer;
        };
        /**
         * updates this sprite
         * @param time
         */
        Sprite.prototype.update = function (time) {
        };
        /**
         * draws this sprite
         */
        Sprite.prototype.draw = function (shader) {
            this._texture.activateAndBind(0);
            var diffuseLocation = shader.getUniformLocation("u_diffuse");
            webglEngine.gl.uniform1i(diffuseLocation, 0);
            this._buffer.bind();
            this._buffer.draw();
        };
        return Sprite;
    }());
    webglEngine.Sprite = Sprite;
})(webglEngine || (webglEngine = {}));
