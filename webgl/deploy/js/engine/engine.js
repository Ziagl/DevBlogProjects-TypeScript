var webglEngine;
(function (webglEngine) {
    var Engine = /** @class */ (function () {
        /**
         * initialize engine with canvas element
         * @param display
         */
        function Engine() {
            this._canvas = webglEngine.GLUtilities.initialize();
            webglEngine.AssetManager.initialize();
            // load shader
            this._basicShader = new webglEngine.BasicShader();
            this._basicShader.use();
            // load materials
            webglEngine.MaterialManager.registerMaterial(new webglEngine.Material("smiley", "assets/textures/smiley.png", new webglEngine.Color(255, 128, 0, 255)));
            this._projection = webglEngine.Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            this._sprite = new webglEngine.Sprite("test", "smiley");
            this._sprite.position.x = 200;
            this._sprite.position.y = 100;
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
                webglEngine.gl.viewport(0, 0, webglEngine.gl.canvas.width, webglEngine.gl.canvas.height);
                this._projection = webglEngine.Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            }
        };
        Engine.prototype.update = function () {
            webglEngine.MessageBus.update(0);
            // logic that decides if we need to redraw canvas
            this.draw();
        };
        Engine.prototype.draw = function () {
            webglEngine.gl.clear(webglEngine.gl.COLOR_BUFFER_BIT);
            // set uniforms
            var projectionPosition = this._basicShader.getUniformLocation("u_projection");
            webglEngine.gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
            this._sprite.draw(this._basicShader);
        };
        return Engine;
    }());
    webglEngine.Engine = Engine;
})(webglEngine || (webglEngine = {}));
