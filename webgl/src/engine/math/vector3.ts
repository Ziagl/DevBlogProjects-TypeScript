namespace webglEngine
{
    /**
     * this represents a vector in 3d space
     */
    export class Vector3
    {
        private _x:number;
        private _y:number;
        private _z:number;

        /**
         * creates new vector with given coordinates
         * @param x the x coordinate
         * @param y the y coordinate
         * @param z the z coordinate
         */
        constructor(x:number = 0, y:number = 0, z:number = 0)
        {
            this._x = x;
            this._y = y;
            this._z = z;
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

        public get z():number
        {
            return this._z;
        }

        public set z(value:number)
        {
            this._z = value;
        }

        /**
         * returns a vector with all zero
         */
        public static get zero():Vector3
        {
            return new Vector3();
        }

        /**
         * returns a vector with all one
         */
        public static get one():Vector3
        {
            return new Vector3(1,1,1);
        }

        /**
         * converts this vector into an array of numbers
         */
        public toArray():number[]
        {
            return [this._x, this._y, this._z];
        }

        /**
         * converts this vector into a Float32Array
         */
        public toFloat32Array():Float32Array
        {
            return new Float32Array(this.toArray());
        }

        /**
         * copies given vector value by value
         * @param vector vector to be copied
         */
        public copyFrom(vector:Vector3):void
        {
            this._x = vector.x;
            this._y = vector.y;
            this._z = vector.z;
        }
    }
}