"use strict";
var webglEngine;
(function (webglEngine) {
    var Game = /** @class */ (function () {
        /**
         * initialize engine with canvas element
         * @param display
         */
        function Game() {
            this._canvas = webglEngine.GLUtilities.initialize();
            webglEngine.gl.clearColor(0, 0, 0, 1);
        }
        /**
         * starts game loop
         */
        Game.prototype.start = function () {
            var _this = this;
            // Create and start the game loop
            var gameloop = function () {
                _this.update();
                requestAnimationFrame(gameloop);
            };
            gameloop();
        };
        Game.prototype.resize = function () {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }
        };
        Game.prototype.update = function () {
            // logic that decides if we need to redraw canvas
            this.draw();
        };
        Game.prototype.draw = function () {
            webglEngine.gl.clear(webglEngine.gl.COLOR_BUFFER_BIT);
        };
        return Game;
    }());
    webglEngine.Game = Game;
})(webglEngine || (webglEngine = {}));
