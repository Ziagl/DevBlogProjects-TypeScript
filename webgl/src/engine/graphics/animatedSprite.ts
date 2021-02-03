///<reference path="sprite.ts"/>

namespace webglEngine
{
    class UVInfo
    {
        public min:Vector2;
        public max:Vector2;

        constructor(min:Vector2, max:Vector2)
        {
            this.min = min;
            this.max = max;
        }
    }

    /**
     * represents a 2-dimensional animated sprite which is drawn on the screen.
     */
    export class AnimatedSprite extends Sprite implements IMessageHandler
    {
        private _frameHeight:number;
        private _frameWidth:number;
        private _frameCount:number;
        private _frameSequence:number[];

        // TODO: make this configurable
        private _frameTime:number = 333;
        private _frameUVs:UVInfo[] = [];

        private _currentFrame:number = 0;
        private _currentTime:number = 0;
        private _assetLoaded:boolean = false;
        private _assetWidth:number = 2;
        private _assetHeight:number = 2;

        /**
         * creates a new sprite
         * @param name the name of this sprite
         * @param materialName the name of the material to use with this sprite
         * @param width the width of this sprite
         * @param height the height of this sprite
         */
        constructor(name:string, materialName:string, width:number = 100, height:number = 100, frameWidth:number = 10, frameHeight:number = 10, frameCount:number = 1, frameSequence:number[] = [])
        {
            super(name,materialName, width, height);

            this._frameWidth = frameWidth;
            this._frameHeight = frameHeight;
            this._frameCount = frameCount;
            this._frameSequence = frameSequence;

            Message.subscribe( MESSAGE_ASSET_LOADER_ASSET_LOADED+this._material.diffuseTextureName, this);
        }

        /**
         * The message handler for this component
         * @param message the message to be handled
         */
        onMessage(message:Message): void 
        {
            if(message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED+this._material.diffuseTextureName)
            {
                this._assetLoaded = true;
                let asset = message.context as ImageAsset;
                this._assetHeight = asset.height;
                this._assetWidth = asset.width;
                this.calculateUVs();
            }
        }

        public destroy():void
        {
            super.destroy();
        }

        /**
         * performs loading routines on this sprite
         */
        public load():void
        {
            super.load();
        }

        /**
         * updates this sprite
         * @param time the delte time in milliseconds since the last update call
         */
        public update(time:number):void
        {
            if(!this._assetLoaded)
            {
                return;
            }

            this._currentTime += time;
            if(this._currentTime > this._frameTime)
            {
                this._currentFrame++;
                this._currentTime = 0;

                if(this._currentFrame >= this._frameSequence.length)
                {
                    this._currentFrame = 0;
                }

                let frameUVs = this._frameSequence[this._currentFrame];
                this._vertices[0].texCoords = new Vector2(this._frameUVs[frameUVs].min.x, this._frameUVs[frameUVs].max.y);
                this._vertices[1].texCoords.copyFrom(this._frameUVs[frameUVs].max);
                this._vertices[2].texCoords.copyFrom(this._frameUVs[frameUVs].min);
                this._vertices[3].texCoords.copyFrom(this._frameUVs[frameUVs].min);
                this._vertices[4].texCoords.copyFrom(this._frameUVs[frameUVs].max);
                this._vertices[5].texCoords = new Vector2(this._frameUVs[frameUVs].max.x, this._frameUVs[frameUVs].min.y);

                this._buffer.clearData();
                for(let v of this._vertices)
                {
                    this._buffer.pushBackData(v.toArray());
                }
                this._buffer.upload();
                this._buffer.unbind();
            }

            super.update(time);
        }

        private calculateUVs():void
        {
            let totalWidth:number = 0;
            let yValue:number = 0;
            for(let i=0; i<this._frameCount;++i)
            {
                totalWidth += i * this._frameWidth;
                if(totalWidth > this._assetWidth)
                {
                    yValue++;
                    totalWidth = 0;
                }

                let u = (i * this._frameWidth)  / this._assetWidth;
                let v = (yValue * this._frameHeight) / this._assetHeight;
                let min:Vector2 = new Vector2(u,v);

                let uMax = ((i * this._frameWidth) + this._frameWidth) / this._assetWidth;
                let vMax = ((yValue * this._frameHeight) + this._frameHeight)/ this._assetHeight;
                let max:Vector2 = new Vector2(uMax,vMax);

                this._frameUVs.push(new UVInfo(min,max));
            }
        }
    }
}