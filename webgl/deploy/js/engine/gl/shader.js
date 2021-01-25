"use strict";
var webglEngine;
(function (webglEngine) {
    /**
     * represents a WebGL shader
     */
    var Shader = /** @class */ (function () {
        /**
         * creates a new shader
         * @param name the name of this shader
         * @param vertexSource the source of the vertex shader
         * @param fragmentSource the source of the fragment shader
         */
        function Shader(name, vertexSource, fragmentSource) {
            this._name = name;
            var vertexShader = this.loadShader(vertexSource, webglEngine.gl.VERTEX_SHADER);
            var fragmentShader = this.loadShader(fragmentSource, webglEngine.gl.FRAGMENT_SHADER);
            this._program = this.createProgram(vertexShader, fragmentShader);
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
        return Shader;
    }());
    webglEngine.Shader = Shader;
})(webglEngine || (webglEngine = {}));
