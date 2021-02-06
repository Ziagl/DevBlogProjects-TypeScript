namespace webglEngine
{
    export class Circle2D implements IShape2D
    {
        public position:Vector2 = Vector2.zero;
        public origin:Vector2 = Vector2.zero;
        public radius:number;

        public get offset():Vector2
        {
            return new Vector2(this.radius + (this.radius * this.origin.x), -(this.radius - (this.radius * this.origin.y)));
        }

        /**
         * set needed data from json
         * @param json json to get data from
         */
        public setFromJson(json:any):void
        {
            if(json.position !== undefined)
            {
                this.position.setFromJson(json.position);
            }

            if(json.origin !== undefined)
            {
                this.origin.setFromJson(json.origin);
            }

            if(json.radius === undefined)
            {
                throw new Error("Circle2D requires radius to be present.");
            }
            this.radius = Number(json.radius);
        }

        /**
         * compute intersection tests for this obejct against given IShape2D object
         * @param other the shape to test if intersects
         */
        public intersects(other:IShape2D):boolean
        {
            if(other instanceof Circle2D)
            {
                let distance = Math.abs(Vector2.distance(other.position, this.position));
                let radiusLength = this.radius + other.radius;
                if(distance <= radiusLength)
                {
                    return true;
                }
            }
            if(other instanceof Rectangle2D)
            {
                let deltaX = this.position.x - Math.max(other.position.x, Math.min(this.position.x, other.position.x + other.width));
                let deltaY = this.position.y - Math.max(other.position.y, Math.min(this.position.y, other.position.y + other.height));
                if((deltaX * deltaX + deltaY * deltaY) < (this.radius * this.radius))
                {
                    return true;
                }
            }

            return false;
        }

        /**
         * tests if a given point is inside this shape
         * @param point the point to test
         */
        public pointInShape(point:Vector2):boolean
        {
            let absDistance = Math.abs(Vector2.distance(this.position, point));
            if(absDistance <= this.radius)
            {
                return true;
            }
            return false;
        }
    }
}