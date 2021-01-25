"use strict";
var webglEngine;
(function (webglEngine) {
    var Engine = /** @class */ (function () {
        /**
         * initialize engine with canvas element
         * @param display
         */
        function Engine() {
            this._canvas = webglEngine.GLUtilities.initialize();
            this._shader = this.loadShaders();
            this._shader.use();
            this._buffer = this.createBuffer();
            webglEngine.gl.clearColor(0, 0, 0, 1);
        }
        /**
         * starts game loop
         */
        Engine.prototype.start = function () {
            var _this = this;
            this.resize();
            // Create and start the game loop
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
                webglEngine.gl.viewport(0, 0, this._canvas.width, this._canvas.height);
            }
        };
        Engine.prototype.update = function () {
            // logic that decides if we need to redraw canvas
            this.draw();
        };
        Engine.prototype.draw = function () {
            webglEngine.gl.clear(webglEngine.gl.COLOR_BUFFER_BIT);
            // draw buffer
            webglEngine.gl.bindBuffer(webglEngine.gl.ARRAY_BUFFER, this._buffer);
            webglEngine.gl.vertexAttribPointer(0, 3, webglEngine.gl.FLOAT, false, 0, 0);
            webglEngine.gl.enableVertexAttribArray(0);
            webglEngine.gl.drawArrays(webglEngine.gl.TRIANGLES, 0, 3);
        };
        Engine.prototype.createBuffer = function () {
            var buffer = webglEngine.gl.createBuffer();
            var vertices = [
                // x y z
                -0.5, -0.5, 0,
                0.5, -0.5, 0,
                0, 0.5, 0
            ];
            webglEngine.gl.bindBuffer(webglEngine.gl.ARRAY_BUFFER, buffer);
            webglEngine.gl.vertexAttribPointer(0, 3, webglEngine.gl.FLOAT, false, 0, 0);
            webglEngine.gl.enableVertexAttribArray(0);
            webglEngine.gl.bufferData(webglEngine.gl.ARRAY_BUFFER, new Float32Array(vertices), webglEngine.gl.STATIC_DRAW);
            webglEngine.gl.bindBuffer(webglEngine.gl.ARRAY_BUFFER, null);
            webglEngine.gl.disableVertexAttribArray(0);
            return buffer;
        };
        Engine.prototype.loadShaders = function () {
            var vertexShaderSource = "\nattribute vec3 a_position;\n\nvoid main() \n{\n    gl_Position = vec4(a_position, 1.0);\n}";
            var fragmentShaderSource = "\nprecision mediump float;\n\nvoid main()\n{\n    gl_FragColor = vec4(1.0);\n}\n";
            return new webglEngine.Shader("basic", vertexShaderSource, fragmentShaderSource);
        };
        return Engine;
    }());
    webglEngine.Engine = Engine;
})(webglEngine || (webglEngine = {}));
