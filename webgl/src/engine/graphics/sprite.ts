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

        /**
         * position of this sprite
         */
        public position:Vector3 = new Vector3();

        /**
         * creates a new sprite
         * @param name the name of this sprite
         * @param width the width of this sprite
         * @param height the height of this sprite
         */
        constructor(name:string, width:number = 100, height:number = 100)
        {
            this._name = name;
            this._width = width;
            this._height = height;
            this._buffer = this.load();
        }

        /**
         * performs loading routines on this sprite
         */
        public load():GLBuffer
        {
            let buffer:GLBuffer = new GLBuffer(3);

            // add attributes
            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.offset = 0;
            positionAttribute.size = 3; // x, y, z
            buffer.addAttributeLocation(positionAttribute);

            // add vertex data
            let vertices = [
                // x y z
                0, 0, 0,
                this._width, 0, 0,
                0, this._height, 0,

                0, this._height, 0,
                this._width, 0, 0,
                this._width, this._height, 0
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
        public draw():void
        {
            this._buffer.bind();
            this._buffer.draw();
        }
    }
}