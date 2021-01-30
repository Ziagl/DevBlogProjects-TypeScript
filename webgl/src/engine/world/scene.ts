namespace webglEngine
{
    export class Scene
    {
        private _root:SimObject;

        constructor()
        {
            this._root = new SimObject(0, "__ROOT__", this);
        }

        public get root():SimObject
        {
            return this._root;
        }

        public get isLoaded():boolean
        {
            return this._root.isLoaded;
        }

        /**
         * add object to scene
         * @param object object to add
         */
        public addObject(object:SimObject):void
        {
            this._root.addChild(object);
        }

        /**
         * get an object from screen by name
         * @param name name of object to search for
         */
        public getObjectByName(name:string):SimObject
        {
            return this._root.getObjectByName(name);
        }

        /**
         * recursively load scene graph
         */
        public load():void
        {
            this._root.load();
        }

        /**
         * recursively update all objects in scene graph
         * @param time delta time
         */
        public update(time:number):void
        {
            this._root.update(time);
        }

        /**
         * recursively render all objects in screne graph
         * @param shader shader to use for all objects
         */
        public render(shader:Shader):void
        {
            this._root.render(shader);
        }
    }
}