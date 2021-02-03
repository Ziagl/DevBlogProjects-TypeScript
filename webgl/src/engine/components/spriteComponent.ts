///<reference path="componentManager.ts"/>
///<reference path="baseComponent.ts"/>

namespace webglEngine
{
    export class SpriteComponentData implements IComponentData
    {
        public name:string;
        public materialName:string;

        public setFromJson(json:any):void
        {
            if(json.name !== undefined)
            {
                this.name = String(json.name);
            }
            if(json.materialName !== undefined)
            {
                this.materialName = String(json.materialName);
            }
        }
    }

    export class SpriteComponentBuilder implements IComponentBuilder
    {
        public get type():string
        {
            return "sprite";
        }

        public buildFromJson(json:any):IComponent
        {
            let data = new SpriteComponentData();
            data.setFromJson(json);
            return new SpriteComponent(data);
        }
    }

    export class SpriteComponent extends BaseComponent
    {
        private _sprite:Sprite;

        constructor(data:SpriteComponentData)
        {
            super(data);

            this._sprite = new Sprite(data.name, data.materialName);
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

    ComponentManager.registerBuilder(new SpriteComponentBuilder());
}