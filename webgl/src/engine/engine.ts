namespace webglEngine
{
    export class Engine
    {
        private _canvas:HTMLCanvasElement;
        private _shader:Shader;
        private _buffer:GLBuffer;

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

            // set uniforms
            let colorPosition = this._shader.getUniformLocation("u_color");
            gl.uniform4f(colorPosition, 1, 0.5, 0, 1);

            this._buffer.bind();
            this._buffer.draw();
        }

        private createBuffer():GLBuffer
        {
            let buffer:GLBuffer = new GLBuffer(3);

            // add attributes
            let positionAttribute = new AttributeInfo();
            positionAttribute.location = this._shader.getAttributeLocation("a_position");
            positionAttribute.offset = 0;
            positionAttribute.size = 3; // x, y, z
            buffer.addAttributeLocation(positionAttribute);

            // add vertex data
            let vertices = [
                // x y z
                -0.5, -0.5, 0,
                0.5, -0.5, 0,
                0, 0.5, 0
            ];
            buffer.pushBackData(vertices);
            buffer.upload();
            buffer.unbind();

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