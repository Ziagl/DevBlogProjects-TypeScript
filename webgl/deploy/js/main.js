"use strict";
var engine;
// entry point of application
window.onload = function () {
    engine = new webglEngine.Game();
    engine.start();
};
window.onresize = function () {
    engine.resize();
};
