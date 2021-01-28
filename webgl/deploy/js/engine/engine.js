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
            this._projection = webglEngine.Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            this._sprite = new webglEngine.Sprite("test");
            this._sprite.position.x = 200;
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
                webglEngine.gl.viewport(-1, 1, -1, 1);
            }
        };
        Engine.prototype.update = function () {
            // logic that decides if we need to redraw canvas
            this.draw();
        };
        Engine.prototype.draw = function () {
            webglEngine.gl.clear(webglEngine.gl.COLOR_BUFFER_BIT);
            // set uniforms
            var colorPosition = this._shader.getUniformLocation("u_color");
            webglEngine.gl.uniform4f(colorPosition, 1, 0.5, 0, 1);
            var projectionPosition = this._shader.getUniformLocation("u_projection");
            webglEngine.gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
            var modelLocation = this._shader.getUniformLocation("u_model");
            webglEngine.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(webglEngine.Matrix4x4.translation(this._sprite.position).data));
            this._sprite.draw();
        };
        Engine.prototype.loadShaders = function () {
            var vertexShaderSource = "\nattribute vec3 a_position;\n\nuniform mat4 u_projection;\nuniform mat4 u_model;\n\nvoid main() \n{\n    gl_Position = u_projection * u_model * vec4(a_position, 1.0);\n}";
            var fragmentShaderSource = "\nprecision mediump float;\n\nuniform vec4 u_color;\n\nvoid main()\n{\n    gl_FragColor = u_color;\n}\n";
            return new webglEngine.Shader("basic", vertexShaderSource, fragmentShaderSource);
        };
        return Engine;
    }());
    webglEngine.Engine = Engine;
})(webglEngine || (webglEngine = {}));
