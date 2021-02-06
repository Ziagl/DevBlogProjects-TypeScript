namespace webglEngine
{
    /**
     * interface that defines a 2 dimensional shape for collision detection
     */
    export interface IShape2D
    {
        position:Vector2;

        origin:Vector2;

        readonly offset:Vector2;

        setFromJson(json:any):void;

        intersects(shae:IShape2D):boolean;

        pointInShape(point:Vector2):boolean;
    }
}