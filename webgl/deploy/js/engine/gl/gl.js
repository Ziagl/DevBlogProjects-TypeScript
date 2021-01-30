var webglEngine;
(function (webglEngine) {
    /**
     * sets up WebGL rendering context
     */
    var GLUtilities = /** @class */ (function () {
        function GLUtilities() {
        }
        /**
         * initialize WebGL and create canvas if id was not provided
         * @param elementId given id of canvas element
         */
        GLUtilities.initialize = function (elementId) {
            var canvas;
            // create canvas of get it from given id
            if (elementId !== undefined) {
                canvas = document.getElementById(elementId);
                if (canvas === undefined) {
                    throw new Error("Cannot find a canvas element named: " + elementId);
                }
            }
            else {
                canvas = document.createElement("canvas");
                document.body.appendChild(canvas).setAttribute("id", "display");
            }
            // create WebGL rendering context
            webglEngine.gl = canvas.getContext("webgl");
            if (webglEngine.gl === undefined) {
                throw new Error("Unable to initialize WebGL!");
            }
            return canvas;
        };
        return GLUtilities;
    }());
    webglEngine.GLUtilities = GLUtilities;
})(webglEngine || (webglEngine = {}));
