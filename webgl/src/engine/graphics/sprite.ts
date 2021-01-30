namespace webglEngine
{
    /**
     * represents a 2-dimensional sprite which is drawn on the screen.
     */
    export class Sprite
    {
        private _name:string;
        private _width:number;
        private _height:number;

        private _buffer:GLBuffer;
        private _textureName:string;
        private _texture:Texture;

        /**
         * position of this sprite
         */
        public position:Vector3 = new Vector3();

        /**
         * creates a new sprite
         * @param name the name of this sprite
         * @param textureName the name of the texture to use with this sprite
         * @param width the width of this sprite
         * @param height the height of this sprite
         */
        constructor(name:string, textureName:string, width:number = 100, height:number = 100)
        {
            this._name = name;
            this._width = width;
            this._height = height;
            this._buffer = this.load();
            this._textureName = textureName;
            this._texture = TextureManager.getTexture(textureName);
        }

        public get name():string
        {
            return this._name;
        }

        public destroy():void
        {
            this._buffer.destroy();
            TextureManager.releaseTexture(this._textureName);
        }

        /**
         * performs loading routines on this sprite
         */
        public load():GLBuffer
        {
            let buffer:GLBuffer = new GLBuffer(5);

            // add attributes
            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.offset = 0;
            positionAttribute.size = 3; // x, y, z
            buffer.addAttributeLocation(positionAttribute);

            let texCoordAttribute = new AttributeInfo();
            texCoordAttribute.location = 1;
            texCoordAttribute.offset = 3;
            texCoordAttribute.size = 2; // u, v
            buffer.addAttributeLocation(texCoordAttribute);

            // add vertex data
            let vertices = [
                // x y z u v
                0, 0, 0, 0, 1.0,
                this._width, 0, 0, 1.0, 1.0,
                0, this._height, 0, 0, 0,

                0, this._height, 0, 0, 0,
                this._width, 0, 0, 1.0, 1.00,
                this._width, this._height, 0, 1.0, 0
            ];
            buffer.pushBackData(vertices);
            buffer.upload();
            buffer.unbind();

            return buffer;
        }

        /**
         * updates this sprite
         * @param time 
         */
        public update(time:number):void
        {

        }

        /**
         * draws this sprite
         */
        public draw(shader:Shader):void
        {
            this._texture.activateAndBind(0);
            let diffuseLocation = shader.getUniformLocation("u_diffuse");
            gl.uniform1i(diffuseLocation, 0);


            this._buffer.bind();
            this._buffer.draw();
        }
    }
}