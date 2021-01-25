var engine: webglEngine.Engine;

// entry point of application
window.onload = () => {
    engine = new webglEngine.Engine();
    engine.start();
};

window.onresize = () => {
    engine.resize();
}