module webglEngine
{
    export class Game
    {
        private _canvas: HTMLCanvasElement;

        /**
         * initialize engine with canvas element
         * @param display 
         */
        constructor ()
        {
            this._canvas = GLUtilities.initialize();

            gl.clearColor(0,0,0,1);
        }

        /**
         * starts game loop
         */
        public start():void
        {
            // Create and start the game loop
            var gameloop = () => { 
                this.update(); 
                requestAnimationFrame(gameloop);
            }
            gameloop();
        }

        public resize():void
        {
            if(this._canvas !== undefined )
            {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }
        }

        private update():void
        {
            // logic that decides if we need to redraw canvas
            this.draw();
        }

        private draw():void
        {
            gl.clear(gl.COLOR_BUFFER_BIT);

        }
    }
}