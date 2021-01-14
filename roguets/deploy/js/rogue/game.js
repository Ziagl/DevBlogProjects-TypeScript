"use strict";
var rogue;
(function (rogue) {
    var Game = /** @class */ (function () {
        function Game(display) {
            var _this = this;
            this.display = display;
            this.invalid = true;
            this.input = new rogue.input.Input();
            this.playerPosition = new rogue.geom.Point(1, 1);
            this.tiles = [["#", "#", "#", "#", "#", "#", "#", "#", "#"],
                ["#", " ", " ", " ", "#", " ", " ", " ", "#"],
                ["#", " ", " ", " ", " ", " ", " ", " ", "#"],
                ["#", " ", " ", " ", "#", " ", " ", " ", "#"],
                ["#", "#", "#", "#", "#", "#", "#", "#", "#"]];
            this.map = new rogue.map.TileMap(this.tiles);
            this.renderer = new rogue.renderer.CanvasMapRenderer(this.display, new rogue.geom.Rectangle(0, 0, 50, 50));
            // Create and start the game loop
            var gameloop = function () {
                _this.update();
                requestAnimationFrame(gameloop);
            };
            gameloop();
        }
        Game.prototype.update = function () {
            if (this.input.newDirection) {
                this.move(this.input.newDirection);
                this.input.clear();
            }
            if (this.invalid) {
                this.draw();
            }
        };
        Game.prototype.move = function (newDirection) {
            var tmpPoint = this.playerPosition.clone();
            tmpPoint.x += newDirection.x;
            tmpPoint.y += newDirection.y;
            var tile = this.map.getTileType(tmpPoint);
            switch (tile) {
                case " ":
                    this.playerPosition = tmpPoint;
                    this.invalid = true;
                    break;
            }
        };
        Game.prototype.draw = function () {
            this.renderer.draw(this.map.getTiles());
            this.renderer.drawTile(this.playerPosition.x, this.playerPosition.y, "@");
            this.invalid = false;
        };
        return Game;
    }());
    rogue.Game = Game;
})(rogue || (rogue = {}));
