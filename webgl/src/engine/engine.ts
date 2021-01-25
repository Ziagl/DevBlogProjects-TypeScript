module webglEngine
{
    export class Engine
    {
        private _canvas:HTMLCanvasElement;
        private _shader:Shader;

        /**
         * initialize engine with canvas element
         * @param display 
         */
        constructor ()
        {
            this._canvas = GLUtilities.initialize();
            this._shader = this.loadShaders();
            this._shader.use();

            gl.clearColor(0,0,0,1);
        }

        /**
         * starts game loop
         */
        public start():void
        {
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
            }
        }

        private update():void
        {
            // logic that decides if we need to redraw canvas
            this.draw();
        }

        private draw():void
        {
            gl.clear(gl.COLOR_BUFFER_BIT);

        }

        private loadShaders():Shader
        {
            let vertexShaderSource = `
attribute vec3 a_position;

void main() 
{
    gl_Position = vec4(a_position, 1.0);
}`;
            let fragmentShaderSource = `
precision mediump float;

void main()
{
    gl_FragColor = vec4(1.0);
}
`;
            return new Shader("basic", vertexShaderSource, fragmentShaderSource);
        }
    }
}