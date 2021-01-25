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
            webglEngine.gl.clearColor(0, 0, 0, 1);
        }
        /**
         * starts game loop
         */
        Engine.prototype.start = function () {
            var _this = this;
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
            }
        };
        Engine.prototype.update = function () {
            // logic that decides if we need to redraw canvas
            this.draw();
        };
        Engine.prototype.draw = function () {
            webglEngine.gl.clear(webglEngine.gl.COLOR_BUFFER_BIT);
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
