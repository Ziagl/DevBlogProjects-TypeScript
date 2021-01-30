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
var engine;
window.onload = function () {
    engine = new webglEngine.Engine();
    engine.start();
};
window.onresize = function () {
    engine.resize();
};
var webglEngine;
(function (webglEngine) {
    var Engine = (function () {
        function Engine() {
            this._canvas = webglEngine.GLUtilities.initialize();
            webglEngine.AssetManager.initialize();
            this._basicShader = new webglEngine.BasicShader();
            this._basicShader.use();
            webglEngine.MaterialManager.registerMaterial(new webglEngine.Material("smiley", "assets/textures/smiley.png", new webglEngine.Color(255, 128, 0, 255)));
            this._projection = webglEngine.Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            this._sprite = new webglEngine.Sprite("test", "smiley");
            this._sprite.position.x = 200;
            this._sprite.position.y = 100;
            webglEngine.gl.clearColor(0, 0, 0, 1);
        }
        Engine.prototype.start = function () {
            var _this = this;
            this.resize();
            var gameloop = function () {
                _this.update();
                requestAnimationFrame(gameloop);
            };
            gameloop();
        };
        Engine.prototype.resize = function () {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
                webglEngine.gl.viewport(0, 0, webglEngine.gl.canvas.width, webglEngine.gl.canvas.height);
                this._projection = webglEngine.Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            }
        };
        Engine.prototype.update = function () {
            webglEngine.MessageBus.update(0);
            this.draw();
        };
        Engine.prototype.draw = function () {
            webglEngine.gl.clear(webglEngine.gl.COLOR_BUFFER_BIT);
            var projectionPosition = this._basicShader.getUniformLocation("u_projection");
            webglEngine.gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
            this._sprite.draw(this._basicShader);
        };
        return Engine;
    }());
    webglEngine.Engine = Engine;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    webglEngine.MESSAGE_ASSET_LOADER_ASSET_LOADED = "MESSAGE_ASSET_LOADER_ASSET_LOADED::";
    var AssetManager = (function () {
        function AssetManager() {
        }
        AssetManager.initialize = function () {
            AssetManager._loaders.push(new webglEngine.ImageAssetLoader());
        };
        AssetManager.registerLoader = function (loader) {
            AssetManager._loaders.push(loader);
        };
        AssetManager.onAssetLoaded = function (asset) {
            AssetManager._loadedAssets[asset.name] = asset;
            webglEngine.Message.send(webglEngine.MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
        };
        AssetManager.loadAsset = function (assetName) {
            var _a;
            var extension = (_a = assetName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (extension === undefined) {
                console.warn("Unable to load extension for: " + assetName);
                return;
            }
            for (var _i = 0, _b = AssetManager._loaders; _i < _b.length; _i++) {
                var l = _b[_i];
                if (l.supportedExtensions.indexOf(extension) !== -1) {
                    l.loadAsset(assetName);
                    return;
                }
            }
            console.warn("Unable to load asset with extension " + extension + ". There is not loader associated with it.");
        };
        AssetManager.isAssetLoaded = function (assetName) {
            return AssetManager._loadedAssets[assetName] !== undefined;
        };
        AssetManager.getAsset = function (assetName) {
            if (this.isAssetLoaded(assetName)) {
                return AssetManager._loadedAssets[assetName];
            }
            else {
                AssetManager.loadAsset(assetName);
            }
            return undefined;
        };
        AssetManager._loaders = [];
        AssetManager._loadedAssets = {};
        return AssetManager;
    }());
    webglEngine.AssetManager = AssetManager;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var ImageAsset = (function () {
        function ImageAsset(name, data) {
            this.name = name;
            this.data = data;
        }
        Object.defineProperty(ImageAsset.prototype, "width", {
            get: function () {
                return this.data.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageAsset.prototype, "height", {
            get: function () {
                return this.data.height;
            },
            enumerable: false,
            configurable: true
        });
        return ImageAsset;
    }());
    webglEngine.ImageAsset = ImageAsset;
    var ImageAssetLoader = (function () {
        function ImageAssetLoader() {
        }
        Object.defineProperty(ImageAssetLoader.prototype, "supportedExtensions", {
            get: function () {
                return ["png", "gif", "jpg"];
            },
            enumerable: false,
            configurable: true
        });
        ImageAssetLoader.prototype.loadAsset = function (assetName) {
            var image = new Image();
            image.onload = this.onImageLoaded.bind(this, assetName, image);
            image.src = assetName;
        };
        ImageAssetLoader.prototype.onImageLoaded = function (assetName, image) {
            console.log("onImageLoaded: assetName/image", assetName, image);
            var asset = new ImageAsset(assetName, image);
            webglEngine.AssetManager.onAssetLoaded(asset);
        };
        return ImageAssetLoader;
    }());
    webglEngine.ImageAssetLoader = ImageAssetLoader;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var GLUtilities = (function () {
        function GLUtilities() {
        }
        GLUtilities.initialize = function (elementId) {
            var canvas;
            if (elementId !== undefined) {
                canvas = document.getElementById(elementId);
                if (canvas === undefined) {
                    throw new Error("Cannot find a canvas element named: " + elementId);
                }
            }
            else {
                canvas = document.createElement("canvas");
                document.body.appendChild(canvas).setAttribute("id", "display");
            }
            webglEngine.gl = canvas.getContext("webgl");
            if (webglEngine.gl === undefined) {
                throw new Error("Unable to initialize WebGL!");
            }
            return canvas;
        };
        return GLUtilities;
    }());
    webglEngine.GLUtilities = GLUtilities;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var AttributeInfo = (function () {
        function AttributeInfo() {
            this.location = 0;
            this.size = 0;
            this.offset = 0;
        }
        return AttributeInfo;
    }());
    webglEngine.AttributeInfo = AttributeInfo;
    var GLBuffer = (function () {
        function GLBuffer(elementSize, dataType, targetBufferType, mode) {
            if (dataType === void 0) { dataType = webglEngine.gl.FLOAT; }
            if (targetBufferType === void 0) { targetBufferType = webglEngine.gl.ARRAY_BUFFER; }
            if (mode === void 0) { mode = webglEngine.gl.TRIANGLES; }
            this._hasAttributeLocation = false;
            this._data = [];
            this._attributes = [];
            this._elementSize = elementSize;
            this._dataType = dataType;
            this._targetBufferType = targetBufferType;
            this._mode = mode;
            switch (this._dataType) {
                case webglEngine.gl.FLOAT:
                case webglEngine.gl.INT:
                case webglEngine.gl.UNSIGNED_INT:
                    this._typeSize = 4;
                    break;
                case webglEngine.gl.SHORT:
                case webglEngine.gl.UNSIGNED_SHORT:
                    this._typeSize = 2;
                    break;
                case webglEngine.gl.BYTE:
                case webglEngine.gl.UNSIGNED_BYTE:
                    this._typeSize = 1;
                    break;
                default:
                    throw new Error("Unrecognized data type: " + this._dataType.toString());
            }
            this._stride = this._elementSize * this._typeSize;
            this._buffer = webglEngine.gl.createBuffer();
        }
        GLBuffer.prototype.destroy = function () {
            webglEngine.gl.deleteBuffer(this._buffer);
        };
        GLBuffer.prototype.bind = function (normalized) {
            if (normalized === void 0) { normalized = false; }
            webglEngine.gl.bindBuffer(this._targetBufferType, this._buffer);
            if (this._hasAttributeLocation) {
                for (var _i = 0, _a = this._attributes; _i < _a.length; _i++) {
                    var it = _a[_i];
                    webglEngine.gl.vertexAttribPointer(it.location, it.size, this._dataType, normalized, this._stride, it.offset * this._typeSize);
                    webglEngine.gl.enableVertexAttribArray(it.location);
                }
            }
        };
        GLBuffer.prototype.unbind = function () {
            for (var _i = 0, _a = this._attributes; _i < _a.length; _i++) {
                var it = _a[_i];
                webglEngine.gl.disableVertexAttribArray(it.location);
            }
            webglEngine.gl.bindBuffer(this._targetBufferType, this._buffer);
        };
        GLBuffer.prototype.addAttributeLocation = function (info) {
            this._hasAttributeLocation = true;
            this._attributes.push(info);
        };
        GLBuffer.prototype.pushBackData = function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                this._data.push(d);
            }
        };
        GLBuffer.prototype.upload = function () {
            webglEngine.gl.bindBuffer(this._targetBufferType, this._buffer);
            var bufferData;
            switch (this._dataType) {
                case webglEngine.gl.FLOAT:
                    bufferData = new Float32Array(this._data);
                    break;
                case webglEngine.gl.INT:
                    bufferData = new Int32Array(this._data);
                    break;
                case webglEngine.gl.UNSIGNED_INT:
                    bufferData = new Uint32Array(this._data);
                    break;
                case webglEngine.gl.SHORT:
                    bufferData = new Int16Array(this._data);
                    break;
                case webglEngine.gl.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this._data);
                    break;
                case webglEngine.gl.BYTE:
                    bufferData = new Int8Array(this._data);
                    break;
                case webglEngine.gl.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this._data);
                    break;
                default:
                    bufferData = new Float32Array(this._data);
            }
            webglEngine.gl.bufferData(this._targetBufferType, bufferData, webglEngine.gl.STATIC_DRAW);
        };
        GLBuffer.prototype.draw = function () {
            if (this._targetBufferType === webglEngine.gl.ARRAY_BUFFER) {
                webglEngine.gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
            }
            else if (this._targetBufferType === webglEngine.gl.ELEMENT_ARRAY_BUFFER) {
                webglEngine.gl.drawElements(this._mode, this._data.length, this._dataType, 0);
            }
        };
        return GLBuffer;
    }());
    webglEngine.GLBuffer = GLBuffer;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var Shader = (function () {
        function Shader(name) {
            this._attributes = {};
            this._uniforms = {};
            this._name = name;
        }
        Object.defineProperty(Shader.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        Shader.prototype.use = function () {
            webglEngine.gl.useProgram(this._program);
        };
        Shader.prototype.getAttributeLocation = function (name) {
            if (this._attributes[name] === undefined) {
                throw new Error("Unable to find attribute name '" + name + "' in shader named" + this._name);
            }
            return this._attributes[name];
        };
        Shader.prototype.getUniformLocation = function (name) {
            if (this._uniforms[name] === undefined) {
                throw new Error("Unable to find uniform name '" + name + "' in shader named" + this._name);
            }
            return this._uniforms[name];
        };
        Shader.prototype.load = function (vertexSource, fragmentSource) {
            var vertexShader = this.loadShader(vertexSource, webglEngine.gl.VERTEX_SHADER);
            var fragmentShader = this.loadShader(fragmentSource, webglEngine.gl.FRAGMENT_SHADER);
            this._program = this.createProgram(vertexShader, fragmentShader);
            this.detectAttributes();
            this.detectUniforms();
        };
        Shader.prototype.loadShader = function (source, shaderType) {
            var shader = webglEngine.gl.createShader(shaderType);
            webglEngine.gl.shaderSource(shader, source);
            webglEngine.gl.compileShader(shader);
            var error = webglEngine.gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error("Error compiling shader '" + this._name + "': " + error);
            }
            return shader;
        };
        Shader.prototype.createProgram = function (vertexShader, fragmentShader) {
            var program = webglEngine.gl.createProgram();
            webglEngine.gl.attachShader(program, vertexShader);
            webglEngine.gl.attachShader(program, fragmentShader);
            webglEngine.gl.linkProgram(program);
            var error = webglEngine.gl.getProgramInfoLog(program);
            if (error !== "") {
                throw new Error("Error linking shader '" + this._name + "': " + error);
            }
            return program;
        };
        Shader.prototype.detectAttributes = function () {
            var attributeCount = webglEngine.gl.getProgramParameter(this._program, webglEngine.gl.ACTIVE_ATTRIBUTES);
            for (var i = 0; i < attributeCount; ++i) {
                var info = webglEngine.gl.getActiveAttrib(this._program, i);
                if (!info) {
                    break;
                }
                this._attributes[info.name] = webglEngine.gl.getAttribLocation(this._program, info.name);
            }
        };
        Shader.prototype.detectUniforms = function () {
            var uniformCount = webglEngine.gl.getProgramParameter(this._program, webglEngine.gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < uniformCount; ++i) {
                var info = webglEngine.gl.getActiveUniform(this._program, i);
                if (!info) {
                    break;
                }
                this._uniforms[info.name] = webglEngine.gl.getUniformLocation(this._program, info.name);
            }
        };
        return Shader;
    }());
    webglEngine.Shader = Shader;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var BasicShader = (function (_super) {
        __extends(BasicShader, _super);
        function BasicShader() {
            var _this = _super.call(this, "basic") || this;
            _this.load(_this.getVertexSource(), _this.getFragmentSource());
            return _this;
        }
        BasicShader.prototype.getVertexSource = function () {
            return "\nattribute vec3 a_position;\nattribute vec2 a_texCoord;\n\nuniform mat4 u_projection;\nuniform mat4 u_model;\n\nvarying vec2 v_texCoord;\n\nvoid main() \n{\n    gl_Position = u_projection * u_model * vec4(a_position, 1.0);\n    v_texCoord = a_texCoord;\n}";
        };
        BasicShader.prototype.getFragmentSource = function () {
            return "\nprecision mediump float;\n\nuniform vec4 u_tint;\nuniform sampler2D u_diffuse;\n\nvarying vec2 v_texCoord;\n\nvoid main()\n{\n    gl_FragColor = u_tint * texture2D(u_diffuse, v_texCoord);\n}\n";
        };
        return BasicShader;
    }(webglEngine.Shader));
    webglEngine.BasicShader = BasicShader;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var Color = (function () {
        function Color(r, g, b, a) {
            if (r === void 0) { r = 255; }
            if (g === void 0) { g = 255; }
            if (b === void 0) { b = 255; }
            if (a === void 0) { a = 255; }
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a;
        }
        Object.defineProperty(Color.prototype, "r", {
            get: function () {
                return this._r;
            },
            set: function (value) {
                this._r = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "rfload", {
            get: function () {
                return this.r / 255.0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            get: function () {
                return this._g;
            },
            set: function (value) {
                this._g = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "gfload", {
            get: function () {
                return this.g / 255.0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            get: function () {
                return this._b;
            },
            set: function (value) {
                this._b = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "bfload", {
            get: function () {
                return this.b / 255.0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "a", {
            get: function () {
                return this._a;
            },
            set: function (value) {
                this._a = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "afload", {
            get: function () {
                return this.a / 255.0;
            },
            enumerable: false,
            configurable: true
        });
        Color.prototype.toArray = function () {
            return [this._r, this._g, this._b, this._a];
        };
        Color.prototype.toFloatArray = function () {
            return [this._r / 255.0, this._g / 255.0, this._b / 255.0, this._a / 255.0];
        };
        Color.prototype.toFloat32Array = function () {
            return new Float32Array(this.toFloatArray());
        };
        Color.white = function () {
            return new Color(255, 255, 255, 255);
        };
        Color.black = function () {
            return new Color(0, 0, 0, 255);
        };
        Color.red = function () {
            return new Color(255, 0, 0, 255);
        };
        Color.green = function () {
            return new Color(0, 255, 0, 255);
        };
        Color.blue = function () {
            return new Color(0, 0, 255, 255);
        };
        return Color;
    }());
    webglEngine.Color = Color;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var Material = (function () {
        function Material(name, diffuseTextureName, tint) {
            this._name = name;
            this._diffuseTextureName = diffuseTextureName;
            this._tint = tint;
            if (this._diffuseTextureName !== undefined) {
                this._diffuseTexture = webglEngine.TextureManager.getTexture(this._diffuseTextureName);
            }
        }
        Object.defineProperty(Material.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "diffuseTextureName", {
            get: function () {
                return this._diffuseTextureName;
            },
            set: function (value) {
                if (this._diffuseTexture !== undefined) {
                    webglEngine.TextureManager.releaseTexture(this._diffuseTextureName);
                }
                this._diffuseTextureName = value;
                if (this._diffuseTextureName !== undefined) {
                    this._diffuseTexture = webglEngine.TextureManager.getTexture(this._diffuseTextureName);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "diffuseTexture", {
            get: function () {
                return this._diffuseTexture;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "tint", {
            get: function () {
                return this._tint;
            },
            enumerable: false,
            configurable: true
        });
        Material.prototype.destroy = function () {
            webglEngine.TextureManager.releaseTexture(this._diffuseTextureName);
            this._diffuseTexture = undefined;
        };
        return Material;
    }());
    webglEngine.Material = Material;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var MaterialReferenceNode = (function () {
        function MaterialReferenceNode(material) {
            this.referenceCount = 1;
            this.material = material;
        }
        return MaterialReferenceNode;
    }());
    var MaterialManager = (function () {
        function MaterialManager() {
        }
        MaterialManager.registerMaterial = function (material) {
            if (MaterialManager._materials[material.name] === undefined) {
                MaterialManager._materials[material.name] = new MaterialReferenceNode(material);
            }
        };
        MaterialManager.getMaterial = function (materialName) {
            if (MaterialManager._materials[materialName] === undefined) {
                return undefined;
            }
            else {
                MaterialManager._materials[materialName].referenceCount++;
                return MaterialManager._materials[materialName].material;
            }
        };
        MaterialManager.releaseMaterial = function (materialName) {
            if (MaterialManager._materials[materialName] === undefined) {
                console.warn("Cannot release a material that has not been registered.");
            }
            else {
                MaterialManager._materials[materialName].referenceCount--;
                if (MaterialManager._materials[materialName].referenceCount < 1) {
                    MaterialManager._materials[materialName].material.destroy();
                    MaterialManager._materials[materialName].material = undefined;
                    delete MaterialManager._materials[materialName];
                }
            }
        };
        MaterialManager._materials = {};
        return MaterialManager;
    }());
    webglEngine.MaterialManager = MaterialManager;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var Sprite = (function () {
        function Sprite(name, materialName, width, height) {
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
            this.position = new webglEngine.Vector3();
            this._name = name;
            this._width = width;
            this._height = height;
            this._buffer = this.load();
            this._materialName = materialName;
            this._material = webglEngine.MaterialManager.getMaterial(this._materialName);
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
            webglEngine.MaterialManager.releaseMaterial(this._materialName);
            this._material = undefined;
            this._materialName = undefined;
        };
        Sprite.prototype.load = function () {
            var buffer = new webglEngine.GLBuffer(5);
            var positionAttribute = new webglEngine.AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.offset = 0;
            positionAttribute.size = 3;
            buffer.addAttributeLocation(positionAttribute);
            var texCoordAttribute = new webglEngine.AttributeInfo();
            texCoordAttribute.location = 1;
            texCoordAttribute.offset = 3;
            texCoordAttribute.size = 2;
            buffer.addAttributeLocation(texCoordAttribute);
            var vertices = [
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
        Sprite.prototype.update = function (time) {
        };
        Sprite.prototype.draw = function (shader) {
            var modelLocation = shader.getUniformLocation("u_model");
            webglEngine.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(webglEngine.Matrix4x4.translation(this.position).data));
            var colorLocation = shader.getUniformLocation("u_tint");
            webglEngine.gl.uniform4fv(colorLocation, this._material.tint.toFloat32Array());
            if (this._material.diffuseTexture !== undefined) {
                this._material.diffuseTexture.activateAndBind(0);
                var diffuseLocation = shader.getUniformLocation("u_diffuse");
                webglEngine.gl.uniform1i(diffuseLocation, 0);
            }
            this._buffer.bind();
            this._buffer.draw();
        };
        return Sprite;
    }());
    webglEngine.Sprite = Sprite;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var LEVEL = 0;
    var BORDER = 0;
    var TEMP_IMAGE_DATA = new Uint8Array([255, 255, 255, 255]);
    var Texture = (function () {
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
var webglEngine;
(function (webglEngine) {
    var TextureReferenceNode = (function () {
        function TextureReferenceNode(texture) {
            this.referenceCount = 1;
            this.texture = texture;
        }
        return TextureReferenceNode;
    }());
    var TextureManager = (function () {
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
var webglEngine;
(function (webglEngine) {
    var Matrix4x4 = (function () {
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
        Matrix4x4.identity = function () {
            return new Matrix4x4;
        };
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
var webglEngine;
(function (webglEngine) {
    var Vector2 = (function () {
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
        Vector2.prototype.toArray = function () {
            return [this._x, this._y];
        };
        Vector2.prototype.toFloat32Array = function () {
            return new Float32Array(this.toArray());
        };
        return Vector2;
    }());
    webglEngine.Vector2 = Vector2;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var Vector3 = (function () {
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
        Vector3.prototype.toArray = function () {
            return [this._x, this._y, this._z];
        };
        Vector3.prototype.toFloat32Array = function () {
            return new Float32Array(this.toArray());
        };
        return Vector3;
    }());
    webglEngine.Vector3 = Vector3;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var MessagePriority;
    (function (MessagePriority) {
        MessagePriority[MessagePriority["NORMAL"] = 0] = "NORMAL";
        MessagePriority[MessagePriority["HIGH"] = 1] = "HIGH";
    })(MessagePriority = webglEngine.MessagePriority || (webglEngine.MessagePriority = {}));
    var Message = (function () {
        function Message(code, sender, context, priority) {
            if (priority === void 0) { priority = MessagePriority.NORMAL; }
            this.code = code;
            this.sender = sender;
            this.context = context;
            this.priority = priority;
        }
        Message.send = function (code, sender, context) {
            webglEngine.MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
        };
        Message.sendPriority = function (code, sender, context) {
            webglEngine.MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
        };
        Message.subscribe = function (code, handler) {
            webglEngine.MessageBus.addSubscription(code, handler);
        };
        Message.unsubscribe = function (code, handler) {
            webglEngine.MessageBus.removeSubscription(code, handler);
        };
        return Message;
    }());
    webglEngine.Message = Message;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var MessageBus = (function () {
        function MessageBus() {
        }
        MessageBus.addSubscription = function (code, handler) {
            if (MessageBus._subscriptions[code] === undefined) {
                MessageBus._subscriptions[code] = [];
            }
            if (MessageBus._subscriptions[code].indexOf(handler) !== -1) {
                console.warn("Attempting to add a duplicate handler to code: " + code + ". Subscrition not added.");
            }
            else {
                MessageBus._subscriptions[code].push(handler);
            }
        };
        MessageBus.removeSubscription = function (code, handler) {
            if (MessageBus._subscriptions[code] === undefined) {
                console.warn("Cannot unsubscribe handler from code: " + code + ". That code is not subscribed to.");
                return;
            }
            var nodeIndex = MessageBus._subscriptions[code].indexOf(handler);
            if (nodeIndex !== -1) {
                MessageBus._subscriptions[code].splice(nodeIndex, 1);
            }
        };
        MessageBus.post = function (message) {
            console.log("Message posted: ", message);
            var handlers = MessageBus._subscriptions[message.code];
            if (handlers === undefined) {
                return;
            }
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var h = handlers_1[_i];
                if (message.priority === webglEngine.MessagePriority.HIGH) {
                    h.onMessage(message);
                }
                else {
                    MessageBus._normalMessageQueue.push(new webglEngine.MessageSubscriptionNode(message, h));
                }
            }
        };
        MessageBus.update = function (time) {
            if (MessageBus._normalMessageQueue.length === 0) {
                return;
            }
            var messageLimit = Math.min(MessageBus._normalQueueMessagePerUpdate, MessageBus._normalMessageQueue.length);
            for (var i = 0; i < messageLimit; ++i) {
                var node = MessageBus._normalMessageQueue.pop();
                node === null || node === void 0 ? void 0 : node.handler.onMessage(node.message);
            }
        };
        MessageBus._subscriptions = {};
        MessageBus._normalQueueMessagePerUpdate = 10;
        MessageBus._normalMessageQueue = [];
        return MessageBus;
    }());
    webglEngine.MessageBus = MessageBus;
})(webglEngine || (webglEngine = {}));
var webglEngine;
(function (webglEngine) {
    var MessageSubscriptionNode = (function () {
        function MessageSubscriptionNode(message, handler) {
            this.message = message;
            this.handler = handler;
        }
        return MessageSubscriptionNode;
    }());
    webglEngine.MessageSubscriptionNode = MessageSubscriptionNode;
})(webglEngine || (webglEngine = {}));
