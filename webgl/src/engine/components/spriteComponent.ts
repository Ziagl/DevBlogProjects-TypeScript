namespace webglEngine
{
    export class SpriteComponent extends BaseComponent
    {
        private _sprite:Sprite;

        constructor(name:string, materialName:string)
        {
            super(name);

            this._sprite = new Sprite(name, materialName);
        }

        public load():void
        {
            this._sprite.load();
        }

        public render(shader:Shader):void
        {
            this._sprite.draw(shader, this._owner.worldMatrix);
            super.render(shader);
        }
    }
}