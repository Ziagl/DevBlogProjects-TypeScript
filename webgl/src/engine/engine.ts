namespace webglEngine
{
    export class Engine
    {
        private _canvas:HTMLCanvasElement;
        private _basicShader:BasicShader;
        private _projection:Matrix4x4;

        /**
         * initialize engine with canvas element
         * @param display 
         */
        constructor ()
        {
            this._canvas = GLUtilities.initialize();
            AssetManager.initialize();
            ZoneManager.initialize();

            // load shader
            this._basicShader = new BasicShader();
            this._basicShader.use();

            // load materials
            MaterialManager.registerMaterial(new Material("smiley", "assets/textures/smiley.png", Color.white()));

            this._projection = Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            
            // todo: should be read from configuration later
            ZoneManager.changeZone(0);

            gl.clearColor(0,0,0,1);
        }

        /**
         * starts game loop
         */
        public start():void
        {
            this.resize();
            // Create and start the game loop
            var gameloop = () => { 
                this.update(); 
                requestAnimationFrame(gameloop);
            }
            gameloop();
        }

        public resize():void
        {
            if(this._canvas !== undefined )
            {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;

                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
                this._projection = Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            }
        }

        private update():void
        {
            MessageBus.update(0);
            ZoneManager.update(0);
            // logic that decides if we need to redraw canvas
            this.draw();
        }

        private draw():void
        {
            gl.clear(gl.COLOR_BUFFER_BIT);

            ZoneManager.render(this._basicShader);

            // set uniforms
            let projectionPosition = this._basicShader.getUniformLocation("u_projection");
            gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
        }
    }
}