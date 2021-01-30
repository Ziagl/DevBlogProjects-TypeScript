namespace webglEngine
{
    export abstract class BaseComponent
    {
        protected _owner:SimObject;
        public name:string;

        constructor(name:string)
        {
            this.name = name;
        }

        public get owner():SimObject
        {
            return this._owner;
        }

        public setOwner(owner:SimObject):void
        {
            this._owner = owner;
        }

        public load():void
        {

        }

        public update(time:number):void
        {

        }

        public render(shader:Shader):void
        {

        }
    }
}