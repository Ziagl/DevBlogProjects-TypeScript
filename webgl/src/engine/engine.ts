module webglEngine
{
    export class Engine
    {
        private _canvas:HTMLCanvasElement;
        private _shader:Shader;

        private _buffer:WebGLBuffer;

        /**
         * initialize engine with canvas element
         * @param display 
         */
        constructor ()
        {
            this._canvas = GLUtilities.initialize();
            this._shader = this.loadShaders();
            this._shader.use();
            this._buffer = this.createBuffer();

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

                gl.viewport(0,0,this._canvas.width, this._canvas.height);
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

            // draw buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            
        }

        private createBuffer():WebGLBuffer
        {
            let buffer:WebGLBuffer = <WebGLBuffer> gl.createBuffer();
            let vertices = [
                // x y z
                -0.5, -0.5, 0,
                0.5, -0.5, 0,
                0, 0.5, 0
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.disableVertexAttribArray(0);

            return buffer;
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