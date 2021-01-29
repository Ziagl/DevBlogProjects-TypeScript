namespace webglEngine
{
    /**
     * this represents a 4 by 4 matrix
     */
    export class Matrix4x4
    {
        private _data:number[] = [];

        /**
         * constructor is private so you can not create your own matrix
         */
        private constructor()
        {
            this._data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }

        public get data():number[]
        {
            return this._data;
        }

        /**
         * this creates an identity matrix
         */
        public static identity():Matrix4x4
        {
            return new Matrix4x4;
        }

        /**
         * this creates an orthographic matrix for orthographic projection
         * @param left the left border
         * @param right the right border
         * @param bottom the bottom border
         * @param top the top border
         * @param nearClip the near clipping range
         * @param farClip the far clipping range
         */
        public static orthographic(left:number, right:number, bottom:number, top:number, nearClip:number, farClip:number):Matrix4x4
        {
            let m = new Matrix4x4();

            let lr:number = 1.0/(left-right);
            let bt:number = 1.0/(bottom-top);
            let nf:number = 1.0/(nearClip-farClip);

            m._data[0] = -2.0 * lr;
            m._data[5] = -2.0 * bt;
            m._data[10] = 2.0 * nf;
            m._data[12] = (left+right)*lr;
            m._data[13] = (top+bottom)*bt;
            m._data[14] = (farClip+nearClip)*nf;

            return m;
        }

        /**
         * creates a translation matrix from a given position as Vector3
         * @param position position in 3d space
         */
        public static translation(position:Vector3):Matrix4x4
        {
            let m = new Matrix4x4();

            m._data[12] = position.x;
            m._data[13] = position.y;
            m._data[14] = position.z;

            return m;
        }
    }
}