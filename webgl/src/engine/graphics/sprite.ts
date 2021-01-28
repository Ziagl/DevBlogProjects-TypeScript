namespace webglEngine
{
    export class Sprite
    {
        private _name:string;
        private _width:number;
        private _height:number;

        private _buffer:GLBuffer;

        public position:Vector3 = new Vector3();

        constructor(name:string, width:number = 100, height:number = 100)
        {
            this._name = name;
            this._width = width;
            this._height = height;
            this._buffer = this.load();
        }

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

        public update(time:number):void
        {

        }

        public draw():void
        {
            this._buffer.bind();
            this._buffer.draw();
        }
    }
}