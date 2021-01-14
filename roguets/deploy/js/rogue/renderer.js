"use strict";
var rogue;
(function (rogue) {
    var renderer;
    (function (renderer) {
        var CanvasMapRenderer = /** @class */ (function () {
            function CanvasMapRenderer(canvas, tileRect) {
                this.canvas = canvas;
                this.tileRect = tileRect;
                this.target = this.canvas.getContext("2d");
            }
            CanvasMapRenderer.prototype.draw = function (tiles) {
                this.clearMap();
                var row;
                var column;
                var total = tiles.length;
                var rowWidth = tiles[0].length;
                var currentTile;
                for (row = 0; row < total; ++row) {
                    for (column = 0; column < rowWidth; ++column) {
                        currentTile = tiles[row][column];
                        this.drawTile(column, row, currentTile);
                    }
                }
            };
            CanvasMapRenderer.prototype.drawTile = function (column, row, currentTile) {
                // change tileRect's x,y position
                this.tileRect.x = column * this.tileRect.width;
                this.tileRect.y = row * this.tileRect.height;
                // draw tile to the canvas
                this.target.fillStyle = this.tileColor(currentTile);
                this.target.fillRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);
                // draw outline around tile
                this.target.strokeStyle = "black";
                this.target.strokeRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);
            };
            CanvasMapRenderer.prototype.clearMap = function () {
                this.canvas.width = this.canvas.width;
            };
            CanvasMapRenderer.prototype.tileColor = function (value) {
                switch (value) {
                    case " ":
                        return "#ffffff";
                        break;
                    case "@":
                        return "#ff0000";
                        break;
                    default:
                        return "#333333";
                }
            };
            return CanvasMapRenderer;
        }());
        renderer.CanvasMapRenderer = CanvasMapRenderer;
    })(renderer = rogue.renderer || (rogue.renderer = {}));
})(rogue || (rogue = {}));
