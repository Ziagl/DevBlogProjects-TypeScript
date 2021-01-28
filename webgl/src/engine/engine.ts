namespace webglEngine
{
    export class Engine
    {
        private _canvas:HTMLCanvasElement;
        private _shader:Shader;
        private _projection:Matrix4x4;

        private _sprite:Sprite;

        /**
         * initialize engine with canvas element
         * @param display 
         */
        constructor ()
        {
            this._canvas = GLUtilities.initialize();
            this._shader = this.loadShaders();
            this._shader.use();
            this._projection = Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            this._sprite = new Sprite("test");
            this._sprite.position.x = 200;

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

                gl.viewport(-1, 1, -1, 1);
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

            // set uniforms
            let colorPosition = this._shader.getUniformLocation("u_color");
            gl.uniform4f(colorPosition, 1, 0.5, 0, 1);
            let projectionPosition = this._shader.getUniformLocation("u_projection");
            gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));
            let modelLocation = this._shader.getUniformLocation("u_model");
            gl.uniformMatrix4fv(modelLocation, false, new Float32Array(Matrix4x4.translation(this._sprite.position).data));

            this._sprite.draw();
        }

        private loadShaders():Shader
        {
            let vertexShaderSource = `
attribute vec3 a_position;

uniform mat4 u_projection;
uniform mat4 u_model;

void main() 
{
    gl_Position = u_projection * u_model * vec4(a_position, 1.0);
}`;
            let fragmentShaderSource = `
precision mediump float;

uniform vec4 u_color;

void main()
{
    gl_FragColor = u_color;
}
`;
            return new Shader("basic", vertexShaderSource, fragmentShaderSource);
        }
    }
}