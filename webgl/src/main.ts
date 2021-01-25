var engine: webglEngine.Game;

// entry point of application
window.onload = () => {
    engine = new webglEngine.Game();
    engine.start();
};

window.onresize = () => {
    engine.resize();
}