"use strict";
var rogue;
(function (rogue) {
    var map;
    (function (map) {
        var TileMap = /** @class */ (function () {
            function TileMap(tiles) {
                this.tiles = tiles;
            }
            TileMap.prototype.getTileType = function (point) {
                return this.tiles[point.y][point.x];
            };
            TileMap.prototype.getWidth = function () {
                return this.tiles[0].length;
            };
            TileMap.prototype.getHeight = function () {
                return this.tiles.length;
            };
            TileMap.prototype.getTileID = function (row, column) {
                return row * this.getWidth() + column;
            };
            TileMap.prototype.getTiles = function () {
                return this.tiles;
            };
            return TileMap;
        }());
        map.TileMap = TileMap;
    })(map = rogue.map || (rogue.map = {}));
})(rogue || (rogue = {}));
