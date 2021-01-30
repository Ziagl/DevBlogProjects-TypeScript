var engine;
// entry point of application
window.onload = function () {
    engine = new webglEngine.Engine();
    engine.start();
};
window.onresize = function () {
    engine.resize();
};
