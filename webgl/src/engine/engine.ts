namespace webglEngine
{
    export class Engine implements IMessageHandler
    {
        private _canvas:HTMLCanvasElement;
        private _basicShader:BasicShader;
        private _projection:Matrix4x4;
        private _previousTime:number = 0;

        /**
         * initialize engine with canvas element
         * @param display 
         */
        constructor ()
        {
            this._canvas = GLUtilities.initialize();
            AssetManager.initialize();
            InputManager.initialize();
            ZoneManager.initialize();
            
            Message.subscribe("MOUSE_UP", this);

            // load shader
            this._basicShader = new BasicShader();
            this._basicShader.use();

            // load materials
            MaterialManager.registerMaterial(new Material("smiley", "assets/textures/smiley.png", Color.white()));
            MaterialManager.registerMaterial(new Material("running", "assets/textures/running.png", Color.white()));

            this._projection = Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            
            // todo: should be read from configuration later
            ZoneManager.changeZone(0);

            gl.clearColor(0,0,0,1);
            
            // enable transparancy
            gl.enable(gl.BLEND);    
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }

        public onMessage(message:Message):void 
        {
            if(message.code === "MOUSE_UP")
            {
                let context = message.context as MouseContext;
                document.title = `Pos: [${context.position.x},${context.position.y}]`
            }
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
            let delta = performance.now() - this._previousTime;
            MessageBus.update(delta);
            ZoneManager.update(delta);
            this._previousTime = performance.now();

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