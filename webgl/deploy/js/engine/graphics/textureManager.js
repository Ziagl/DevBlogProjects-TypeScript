var webglEngine;
(function (webglEngine) {
    var TextureReferenceNode = /** @class */ (function () {
        function TextureReferenceNode(texture) {
            this.referenceCount = 1;
            this.texture = texture;
        }
        return TextureReferenceNode;
    }());
    var TextureManager = /** @class */ (function () {
        function TextureManager() {
        }
        TextureManager.getTexture = function (textureName) {
            if (TextureManager._textures[textureName] === undefined) {
                var texture = new webglEngine.Texture(textureName);
                TextureManager._textures[textureName] = new TextureReferenceNode(texture);
            }
            else {
                TextureManager._textures[textureName].referenceCount++;
            }
            return TextureManager._textures[textureName].texture;
        };
        TextureManager.releaseTexture = function (textureName) {
            if (TextureManager._textures[textureName] === undefined) {
                console.warn("A texture named " + textureName + " does not exist and cannot be released.");
            }
            else {
                TextureManager._textures[textureName].referenceCount--;
                if (TextureManager._textures[textureName].referenceCount < 1) {
                    TextureManager._textures[textureName].texture.destroy();
                    delete TextureManager._textures[textureName];
                }
            }
        };
        TextureManager._textures = {};
        return TextureManager;
    }());
    webglEngine.TextureManager = TextureManager;
})(webglEngine || (webglEngine = {}));
