namespace webglEngine
{
    /**
     * represents a WebGL shader
     */
    export class Shader
    {
        private _name:string;
        private _program:WebGLProgram;

        /**
         * creates a new shader
         * @param name the name of this shader
         * @param vertexSource the source of the vertex shader
         * @param fragmentSource the source of the fragment shader
         */
        constructor(name:string, vertexSource:string, fragmentSource:string)
        {
            this._name = name;
            let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

            this._program = this.createProgram(vertexShader, fragmentShader);
        }

        /**
         * the name of the shader
         */
        public get name():string
        {
            return this._name;
        }

        /**
         * use this shader
         */
        public use():void
        {
            gl.useProgram(this._program);
        }

        private loadShader(source:string, shaderType:number):WebGLShader
        {
            let shader:WebGLShader = <WebGLShader> gl.createShader(shaderType);

            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader);
            if(error !== "")
            {
                throw new Error("Error compiling shader '"+this._name+"': "+error);
            }

            return shader;
        }

        private createProgram(vertexShader:WebGLShader, fragmentShader: WebGLShader):WebGLProgram
        {
            let program:WebGLProgram = <WebGLProgram> gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            let error = gl.getProgramInfoLog(program);
            if(error !== "")
            {
                throw new Error("Error linking shader '"+this._name+"': "+error);
            }
            return program;
        }
    }
}