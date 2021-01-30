var webglEngine;
(function (webglEngine) {
    /**
     * represents a WebGL shader
     */
    var Shader = /** @class */ (function () {
        /**
         * creates a new shader
         * @param name the name of this shader
         */
        function Shader(name) {
            // key-value store
            this._attributes = {};
            this._uniforms = {};
            this._name = name;
        }
        Object.defineProperty(Shader.prototype, "name", {
            /**
             * the name of the shader
             */
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * use this shader
         */
        Shader.prototype.use = function () {
            webglEngine.gl.useProgram(this._program);
        };
        /**
         * gets the location of an attribute with the provided name
         * @param name name of attribute to retrieve
         */
        Shader.prototype.getAttributeLocation = function (name) {
            if (this._attributes[name] === undefined) {
                throw new Error("Unable to find attribute name '" + name + "' in shader named" + this._name);
            }
            return this._attributes[name];
        };
        /**
         * gets the location of an uniform with the provided name
         * @param name name of uniform to retrieve
         */
        Shader.prototype.getUniformLocation = function (name) {
            if (this._uniforms[name] === undefined) {
                throw new Error("Unable to find uniform name '" + name + "' in shader named" + this._name);
            }
            return this._uniforms[name];
        };
        /**
         * loads shaders from given sources
         * @param vertexSource the vertex shader source
         * @param fragmentSource the fragment shader source
         */
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
        /**
         * gets all attributes from shader
         */
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
