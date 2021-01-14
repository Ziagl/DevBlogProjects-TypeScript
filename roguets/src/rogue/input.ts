module rogue.input
{
    export enum Keyboard
    {
        LEFT = "ArrowLeft",
        UP = "ArrowUp",
        RIGHT = "ArrowRight",
        DOWN = "ArrowDown",
    };

    export var Directions = {
        UP: new geom.Point(0,-1),
        DOWN: new geom.Point(0,1),
        RIGHT: new geom.Point(1,0),
        LEFT: new geom.Point(-1,0)
    }

    export class Input
    {
        newDirection: geom.Point;

        constructor()
        {
            this.newDirection = new geom.Point(0,0);
            window.addEventListener("keyup", event => this.keyup(event), false);
        }

        keyup(event:KeyboardEvent):void
        {
            event.stopPropagation();
            event.preventDefault();
            var keyCode = event.key;

            switch(keyCode)
            {
                case Keyboard.UP:
                    this.newDirection = Directions.UP;
                    break;
                case Keyboard.RIGHT:
                    this.newDirection = Directions.RIGHT;
                    break;
                case Keyboard.DOWN:
                    this.newDirection = Directions.DOWN;
                    break;
                case Keyboard.LEFT:
                    this.newDirection = Directions.LEFT;
                    break;
            }
        }

        clear():void
        {
            this.newDirection = new geom.Point(0,0);
        }
    }
}