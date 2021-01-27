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
            // set uniforms
            var colorPosition = this._shader.getUniformLocation("u_color");
            webglEngine.gl.uniform4f(colorPosition, 1, 0.5, 0, 1);
            this._buffer.bind();
            this._buffer.draw();
        };
        Engine.prototype.createBuffer = function () {
            var buffer = new webglEngine.GLBuffer(3);
            // add attributes
            var positionAttribute = new webglEngine.AttributeInfo();
            positionAttribute.location = this._shader.getAttributeLocation("a_position");
            positionAttribute.offset = 0;
            positionAttribute.size = 3; // x, y, z
            buffer.addAttributeLocation(positionAttribute);
            // add vertex data
            var vertices = [
                // x y z
                -0.5, -0.5, 0,
                0.5, -0.5, 0,
                0, 0.5, 0
            ];
            buffer.pushBackData(vertices);
            buffer.upload();
            buffer.unbind();
            return buffer;
        };
        Engine.prototype.loadShaders = function () {
            var vertexShaderSource = "\nattribute vec3 a_position;\n\nvoid main() \n{\n    gl_Position = vec4(a_position, 1.0);\n}";
            var fragmentShaderSource = "\nprecision mediump float;\n\nuniform vec4 u_color;\n\nvoid main()\n{\n    gl_FragColor = u_color;\n}\n";
            return new webglEngine.Shader("basic", vertexShaderSource, fragmentShaderSource);
        };
        return Engine;
    }());
    webglEngine.Engine = Engine;
})(webglEngine || (webglEngine = {}));
