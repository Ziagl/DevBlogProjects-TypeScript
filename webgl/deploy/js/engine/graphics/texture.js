var webglEngine;
(function (webglEngine) {
    var LEVEL = 0;
    var BORDER = 0;
    var TEMP_IMAGE_DATA = new Uint8Array([255, 255, 255, 255]);
    var Texture = /** @class */ (function () {
        function Texture(name, width, height) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            this._isLoaded = false;
            this._name = name;
            this._width = width;
            this._height = height;
            this._handle = webglEngine.gl.createTexture();
            webglEngine.Message.subscribe(webglEngine.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name, this);
            this.bind();
            webglEngine.gl.texImage2D(webglEngine.gl.TEXTURE_2D, LEVEL, webglEngine.gl.RGBA, 1, 1, BORDER, webglEngine.gl.RGBA, webglEngine.gl.UNSIGNED_BYTE, TEMP_IMAGE_DATA);
            var asset = webglEngine.AssetManager.getAsset(this.name);
            if (asset !== undefined) {
                this.loadTextureFromAsset(asset);
            }
        }
        Object.defineProperty(Texture.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "isLoaded", {
            get: function () {
                return this._isLoaded;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: false,
            configurable: true
        });
        Texture.prototype.destroy = function () {
            webglEngine.gl.deleteTexture(this._handle);
        };
        Texture.prototype.activateAndBind = function (textureUnit) {
            if (textureUnit === void 0) { textureUnit = 0; }
            webglEngine.gl.activeTexture(webglEngine.gl.TEXTURE0 + textureUnit);
            this.bind();
        };
        Texture.prototype.bind = function () {
            webglEngine.gl.bindTexture(webglEngine.gl.TEXTURE_2D, this._handle);
        };
        Texture.prototype.unbind = function () {
            webglEngine.gl.bindTexture(webglEngine.gl.TEXTURE_2D, null);
        };
        Texture.prototype.onMessage = function (message) {
            if (message.code === webglEngine.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name) {
                this.loadTextureFromAsset(message.context);
            }
        };
        Texture.prototype.loadTextureFromAsset = function (asset) {
            this._width = asset.width;
            this._height = asset.height;
            this.bind();
            webglEngine.gl.texImage2D(webglEngine.gl.TEXTURE_2D, LEVEL, webglEngine.gl.RGBA, webglEngine.gl.RGBA, webglEngine.gl.UNSIGNED_BYTE, asset.data);
            if (this.isPowerOf2()) {
                webglEngine.gl.generateMipmap(webglEngine.gl.TEXTURE_2D);
            }
            else {
                // do not generate a mip map and clamp wrapping to edge
                webglEngine.gl.texParameteri(webglEngine.gl.TEXTURE_2D, webglEngine.gl.TEXTURE_WRAP_S, webglEngine.gl.CLAMP_TO_EDGE);
                webglEngine.gl.texParameteri(webglEngine.gl.TEXTURE_2D, webglEngine.gl.TEXTURE_WRAP_T, webglEngine.gl.CLAMP_TO_EDGE);
                webglEngine.gl.texParameteri(webglEngine.gl.TEXTURE_2D, webglEngine.gl.TEXTURE_MIN_FILTER, webglEngine.gl.LINEAR);
            }
            this._isLoaded = true;
        };
        Texture.prototype.isPowerOf2 = function () {
            return (this.isValuePowerOf2(this._width) && this.isValuePowerOf2(this._height));
        };
        Texture.prototype.isValuePowerOf2 = function (value) {
            return (value & (value - 1)) == 0;
        };
        return Texture;
    }());
    webglEngine.Texture = Texture;
})(webglEngine || (webglEngine = {}));
