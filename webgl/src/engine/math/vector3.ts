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
         * sets Vector3 koordinates
         * @param x optional x value
         * @param y optional y value
         * @param z optional z value
         */
        public set(x?:number, y?:number, z?:number):void
        {
            if(x !== undefined)
            {
                this._x = x;
            }

            if(y !== undefined)
            {
                this._y = y;
            }

            if(z !== undefined)
            {
                this._z = z;
            }
        }

        /**
         * compares Vector3 with given vector value by value if it is equal
         * @param v vector to compare
         */
        public equals(v:Vector3):boolean
        {
            return (this.x===v.x && this.y===v.y && this.z===v.z);
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
            if(json.z !== undefined)
            {
                this._z = Number(json.z);
            }
        }

        public add(v:Vector3):Vector3
        {
            this._x += v._x;
            this._y += v._y;
            this._z += v._z;

            return this;
        }

        public subtract(v:Vector3):Vector3
        {
            this._x -= v._x;
            this._y -= v._y;
            this._z -= v._z;

            return this;
        }

        public multiply(v:Vector3):Vector3
        {
            this._x *= v._x;
            this._y *= v._y;
            this._z *= v._z;

            return this;
        }

        public devide(v:Vector3):Vector3
        {
            this._x /= v._x;
            this._y /= v._y;
            this._z /= v._z;

            return this;
        }
    }
}