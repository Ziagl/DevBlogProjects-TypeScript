module webglEngine
{
    /**
     * global WebGL rendering context
     */
    export var gl:WebGLRenderingContext;

    /**
     * sets up WebGL rendering context
     */
    export class GLUtilities
    {
        /**
         * initialize WebGL and create canvas if id was not provided
         * @param elementId given id of canvas element
         */
        public static initialize(elementId?: string):HTMLCanvasElement
        {
            let canvas: HTMLCanvasElement;

            // create canvas of get it from given id
            if(elementId !== undefined)
            {
                canvas = document.getElementById(elementId) as HTMLCanvasElement;
                if (canvas === undefined)
                {
                    throw new Error("Cannot find a canvas element named: " + elementId);
                }
            }
            else
            {
                canvas = document.createElement("canvas") as HTMLCanvasElement;
                document.body.appendChild(canvas).setAttribute("id", "display");
            }

            // create WebGL rendering context
            gl = <WebGLRenderingContext> canvas.getContext("webgl");
            if(gl === undefined )
            {
                throw new Error("Unable to initialize WebGL!");
            }

            return canvas;
        }
    }
}