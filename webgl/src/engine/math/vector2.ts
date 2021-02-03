namespace webglEngine
{
    /**
     * this represents a vector in 2d space
     */
    export class Vector2
    {
        private _x:number;
        private _y:number;

        /**
         * creates new vector with given coordinates
         * @param x the x coordinate
         * @param y the y coordinate
         */
        constructor(x:number = 0, y:number = 0)
        {
            this._x = x;
            this._y = y;
        }

        public get x():number
        {
            return this._x;
        }

        public set x(value:number)
        {
            this._x = value;
        }

        public get y():number
        {
            return this._y;
        }

        public set y(value:number)
        {
            this._y = value;
        }

        /**
         * returns a vector with all zero
         */
        public static get zero():Vector2
        {
            return new Vector2();
        }

         /**
         * returns a vector with all one
         */
        public static get one():Vector2
        {
            return new Vector2(1,1);
        }

        /**
         * set data from another Vector2
         * @param v Vector to be copied
         */
        public copyFrom(v:Vector2):void
        {
            this._x = v.x;
            this._y = v.y;
        }

        /**
         * converts this vector into an array of numbers
         */
        public toArray():number[]
        {
            return [this._x, this._y];
        }

        /**
         * converts this vector into a Float32Array
         */
        public toFloat32Array():Float32Array
        {
            return new Float32Array(this.toArray());
        }

        public setFromJson(json:any):void
        {
            if(json.x !== undefined)
            {
                this._x = Number(json.x);
            }
            if(json.y !== undefined)
            {
                this._y = Number(json.y);
            }
        }
    }
}